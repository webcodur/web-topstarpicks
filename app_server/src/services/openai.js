const fs = require('fs').promises;
const path = require('path');
const axios = require('axios');

const OpenAI = require('openai');
const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

/**
 * 프롬프트 파일을 읽는 함수
 * @param {string} filename - 읽을 파일의 이름
 * @returns {Promise<string>} 파일의 내용
 */
async function readPromptFile(filename) {
	const filePath = path.join(__dirname, '..', 'prompts', filename);
	try {
		return await fs.readFile(filePath, 'utf-8');
	} catch (error) {
		console.error('프롬프트 파일 읽기 오류:', error);
		throw new Error('프롬프트 파일을 읽을 수 없습니다.');
	}
}

/**
 * OpenAI API를 사용하여 json 응답을 요청하고 받아내는 함수
 * @param {string} prompt - 사용자 프롬프트
 * @param {string} systemMessage - 시스템 메시지
 * @returns {Promise<Object>} 채팅 완료 결과
 */
async function getChatCompletion(prompt, systemMessage) {
	const response = await client.chat.completions.create({
		model: 'gpt-4o',
		messages: [
			{ role: 'system', content: systemMessage },
			{ role: 'user', content: prompt },
		],
		temperature: 0,
		max_tokens: 1000,
	});

	const rawResponse = response.choices[0].message.content;

	const jsonString = rawResponse
		.replace(/^aiResponse \(influence\),\s*/, '')
		.replace(/^`+json\s*/, '')
		.replace(/`+$/, '')
		.trim();

	const parsedResponse = JSON.parse(jsonString);

	return parsedResponse;
}

async function getAvailableModels() {
	try {
		const models = await openai.models.list();
		return models.data.map((model) => model.id);
	} catch (error) {
		console.error('사용 가능한 모델 조회 중 오류 발생:', error);
		throw new Error('모델 목록을 가져올 수 없습니다');
	}
}

async function getCelebrityInfoByGPT(name, description = '') {
	try {
		const promptTemplate = await readPromptFile('celebrityInfo.txt');

		const prompt = promptTemplate
			.replace('[인물 이름]', name)
			.replace('[추가 설명]', description);

		const systemMessage =
			'당신은 인물 정보 전문가입니다. 정확하고 객관적인 정보만을 제공하며, 항상 유효한 JSON 형식으로 응답합니다.';

		const parsedResponse = await getChatCompletion(prompt, systemMessage);
		return parsedResponse;
	} catch (error) {
		console.error('Error in getCelebrityInfoByGPT:', error);
		throw error;
	}
}

module.exports = {
	readPromptFile,
	getChatCompletion,
	getAvailableModels,
	getCelebrityInfoByGPT,
};
