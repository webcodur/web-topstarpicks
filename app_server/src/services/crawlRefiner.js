const SQL = require('sql-template-strings');
const db = require('../database');
const openai = require('./openai');

/**
 * 크롤링 결과를 개선하고 결과를 반환하는 함수
 * @param {string} name - 평가할 인물 이름
 * @param {Array} books - 크롤링된 책 정보 배열
 * @returns {Promise<Object>} 개선된 결과
 */
async function improveCrawlResult(name, books) {
	// 프롬프트 생성
	const promptTemplate = await openai.readPromptFile('improveCrawlResult.txt');

	const prompt =
		promptTemplate.replace('[인물 이름]', name) +
		'\n\n' +
		JSON.stringify(books);

	console.log('프롬프트 확인', prompt);

	// API 호출
	const systemMessage = '당신은 도서 목록의 정보를 개선하는 AI 입니다.';
	const chatCompletion = await openai.getChatCompletion(prompt, systemMessage);

	// 결과 리턴
	const rawResult = JSON.parse(chatCompletion.choices[0].message.content);

	if (rawResult.error) {
		throw new Error(rawResult.error);
	}

	return rawResult;
}

module.exports = {
	improveCrawlResult,
};
