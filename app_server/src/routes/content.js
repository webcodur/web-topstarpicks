const express = require('express');
const router = express.Router();
const db = require('../database');
const SQL = require('sql-template-strings');

// 활용 가능한 컨텐츠 종류
router.get(
	'/',
	db.asyncHandler(async (req, res) => {
		const sql = SQL`SELECT * FROM content`;
		const rows = await db.executeQuery(sql);
		res.json({ message: 'success', data: rows });
	})
);

module.exports = router;
