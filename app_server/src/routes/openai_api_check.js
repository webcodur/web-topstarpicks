const express = require('express');
const router = express.Router();
const axios = require('axios');

async function getAvailableModels() {
	try {
		const response = await axios.get('https://api.openai.com/v1/models', {
			headers: {
				Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
			},
		});
		return response.data.data.map((model) => model.id);
	} catch (error) {
		console.error('사용 가능한 모델 조회 중 오류 발생:', error);
		return [];
	}
}

async function getRemainingTokens() {
	try {
		const response = await axios.get('https://api.openai.com/v1/usage', {
			headers: {
				Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
			},
		});
		console.log('사용량 데이터:', response.data);
		return '계획에 따라 사용량 데이터를 확인하여 남은 토큰을 계산하세요';
	} catch (error) {
		console.error('사용량 데이터 조회 중 오류 발생:', error);
		return '사용량 데이터를 가져올 수 없습니다';
	}
}

router.get('/', async (req, res) => {
	try {
		const models = await getAvailableModels();
		console.log('사용 가능한 모델:', models);

		const remainingTokens = await getRemainingTokens();
		console.log('남은 토큰:', remainingTokens);

		res.json({
			models: models,
			remainingTokens: remainingTokens,
		});
	} catch (error) {
		console.error('API 체크 중 오류 발생:', error);
		res.status(500).json({ error: 'Internal Server Error' });
	}
});

module.exports = router;
