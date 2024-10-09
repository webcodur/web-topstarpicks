const express = require('express');
const influenceService = require('../services/influence');

const router = express.Router();

router.post('/assess-influence', async (req, res) => {
	try {
		const { name } = req.body;
		if (!name) {
			return res
				.status(400)
				.json({ error: '인물 이름이 제공되지 않았습니다.' });
		}

		const result = await influenceService.assessAndSaveInfluence(name);
		res.json({ message: 'success', data: result });
	} catch (error) {
		console.error('Error:', error);
		res.status(500).json({ error: error.message || 'Internal server error' });
	}
});

module.exports = router;
