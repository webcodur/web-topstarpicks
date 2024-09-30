const express = require('express');
const router = express.Router();
const db = require('../database');
const SQL = require('sql-template-strings');

// 유명인사 직군 종류
router.get('/', (req, res) => {
	const sql = SQL` SELECT * FROM profession `;
	db.all(sql.text, sql.values, (err, rows) => {
		if (err) {
			res.status(400).json({ error: err.message });
			return;
		}
		res.json({ message: 'success', data: rows });
	});
});

module.exports = router;
