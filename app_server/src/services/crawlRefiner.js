const SQL = require('sql-template-strings');
const db = require('../database');
const openai = require('./openai');

/**
 * 지정된 시간(ms) 동안 실행을 지연시키는 함수
 * @param {number} ms - 지연 시간 (밀리초)
 * @returns {Promise}
 */
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

/**
 * 크롤링 결과를 개선하고 결과를 반환하는 함수
 * @param {Array} books - 크롤링된 책 정보 배열
 * @param {number} batchSize - 한 번에 처리할 책의 수 (기본값: 50)
 * @param {number} rateLimit - 분당 최대 요청 수 (기본값: 50)
 * @returns {Promise<Array>} 개선된 결과 배열
 */
async function refineBookData(books, batchSize = 50, rateLimit = 50) {
	const systemMsg = '당신은 도서 목록의 정보를 개선하는 AI 입니다.';
	const promptForm = await openai.readPromptFile('improveCrawlResult.txt');

	let result = [];
	const delayBetweenRequests = 60000 / rateLimit; // 요청 사이의 지연 시간 (ms)
	const minTimeBetweenBatches = 60000; // 배치 간 최소 대기 시간 (1분)

	for (let i = 0; i < books.length; i += batchSize) {
		const batch = books.slice(i, i + batchSize);
		console.log(
			`Processing batch ${i / batchSize + 1} of ${Math.ceil(
				books.length / batchSize
			)}`
		);

		const batchStartTime = Date.now();

		for (const book of batch) {
			try {
				const prompt = promptForm + '\n\n' + JSON.stringify(book);
				const aiResponse = await openai.getChatCompletion(prompt, systemMsg);
				result.push(aiResponse);

				// API 요청 제한을 준수하기 위한 지연
				await delay(delayBetweenRequests);
			} catch (error) {
				console.error(`Error processing book: ${book.title}`, error);
				// 에러가 발생해도 계속 진행
			}
		}

		const batchEndTime = Date.now();
		const batchProcessingTime = batchEndTime - batchStartTime;

		// 다음 배치 처리 전 대기 시간 계산
		if (i + batchSize < books.length) {
			const remainingTime = minTimeBetweenBatches - batchProcessingTime;
			if (remainingTime > 0) {
				console.log(
					`Waiting for ${
						remainingTime / 1000
					} seconds before processing the next batch...`
				);
				await delay(remainingTime);
			} else {
				console.log('Moving to the next batch immediately...');
			}
		}
	}

	return result;
}

module.exports = {
	refineBookData,
};
