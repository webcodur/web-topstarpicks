const express = require('express');
const router = express.Router();
const db = require('../database');
const SQL = require('sql-template-strings');

// 유명인사 직군 종류
router.get(
	'/',
	db.asyncHandler(async (req, res) => {
		const sql = SQL`SELECT * FROM profession`;
		const rows = await db.executeQuery(sql);
		res.json({ message: 'success', data: rows });
	})
);

module.exports = router;
