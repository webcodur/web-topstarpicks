const express = require('express');
const influenceService = require('../services/influence');
const { getAvailableModels } = require('../services/openai');

const router = express.Router();

// OPENAI API CHECK
router.get('/', async (req, res) => {
	try {
		const models = await getAvailableModels();
		res.json({ message: 'success', data: models });
	} catch (error) {
		console.error('API 체크 중 오류 발생:', error);
		res.status(500).json({ error: 'Internal Server Error' });
	}
});

// 영향력 평가
router.post('/assess-influence', async (req, res) => {
	try {
		const { name } = req.body;
		if (!name) return res.status(400).json({ error: '인물 이름 필요.' });

		const result = await influenceService.assessAndSaveInfluence(name);
		res.json({ message: 'success', data: result });
	} catch (error) {
		console.error('Error:', error);
		res.status(500).json({ error: error.message || 'Internal server error' });
	}
});

module.exports = router;
