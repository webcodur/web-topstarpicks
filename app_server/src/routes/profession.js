const express = require('express');
const router = express.Router();
const db = require('../database');
const SQL = require('sql-template-strings');

// GET: 모든 직군 조회
router.get(
	'/',
	db.asyncHandler(async (req, res) => {
		console.log('Profession GET request received');
		const sql = SQL`
			SELECT id, name, eng_name
			FROM profession
			ORDER BY name
		`;
		try {
			const rows = await db.executeQuery(sql);
			console.log('Profession query results:', rows);
			res.json({ message: 'success', data: rows });
		} catch (error) {
			console.error('Profession query error:', error);
			res.status(500).json({ message: 'error', error: error.message });
		}
	})
);

// POST: 새 직군 추가
router.post(
	'/',
	db.asyncHandler(async (req, res) => {
		const { name, eng_name } = req.body;
		const sql = SQL`
			INSERT INTO profession (name, eng_name)
			VALUES (${name}, ${eng_name})
		`;
		const result = await db.executeQuery(sql);
		res.json({ message: 'success', data: { id: result.lastID } });
	})
);

// PUT: 직군 정보 수정
router.put(
	'/:id',
	db.asyncHandler(async (req, res) => {
		const { name, eng_name } = req.body;
		const sql = SQL`
			UPDATE profession
			SET name = ${name},
				eng_name = ${eng_name}
			WHERE id = ${req.params.id}
		`;
		const result = await db.executeQuery(sql);
		res.json({ message: 'success', data: { changes: result.changes } });
	})
);

// DELETE: 직군 삭제
router.delete(
	'/:id',
	db.asyncHandler(async (req, res) => {
		const sql = SQL`DELETE FROM profession WHERE id = ${req.params.id}`;
		const result = await db.executeQuery(sql);
		res.json({ message: 'success', data: { changes: result.changes } });
	})
);

module.exports = router;
