const OpenAI = require('openai');
const fs = require('fs').promises;
const path = require('path');
const axios = require('axios');

// OpenAI API 클라이언트 초기화
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

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
 * OpenAI API를 사용하여 채팅 완료 요청을 보내는 함수
 * @param {string} prompt - 사용자 프롬프트
 * @param {string} systemMessage - 시스템 메시지
 * @returns {Promise<Object>} 채팅 완료 결과
 */
async function getChatCompletion(prompt, systemMessage) {
	return openai.chat.completions.create({
		model: 'gpt-4',
		messages: [
			{ role: 'system', content: systemMessage },
			{ role: 'user', content: prompt },
		],
		temperature: 0,
		max_tokens: 1000,
	});
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

module.exports = {
	readPromptFile,
	getChatCompletion,
	getAvailableModels,
};
