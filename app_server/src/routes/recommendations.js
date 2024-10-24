const express = require('express');
const router = express.Router();
const db = require('../database');
const SQL = require('sql-template-strings');

// 특정 인물의 특정 타입 컨텐츠 추천 목록 조회
router.get(
	'/',
	db.asyncHandler(async (req, res) => {
		const { celebrity_name, content_name } = req.query;

		if (!celebrity_name || !content_name) {
			return res
				.status(400)
				.json({ error: '인물 이름과 컨텐츠 타입을 모두 제공해야 합니다.' });
		}

		const sql = SQL`
    SELECT 
      r.title, r.creator, r.release_date, r.recommendation_text as reason, r.affiliate_link, r.img_link, r.mediaDescription, r.recommendation_source
    FROM 
      recommendations r
    JOIN 
      celebrities c ON r.celebrity_id = c.id
    JOIN 
      content con ON r.content_id = con.id
    WHERE 
      c.name = ${celebrity_name}
      AND con.name = ${content_name}
    ORDER BY 
      r.release_date DESC
  `;

		const rows = await db.executeQuery(sql);
		res.json({ message: 'success', data: rows });
	})
);

// GET: 모든 추천 정보 조회 (관리자용)
router.get(
	'/all',
	db.asyncHandler(async (req, res) => {
		const sql = SQL`
    SELECT r.*, c.name as celebrity_name, con.name as content_name
    FROM recommendations r
    JOIN celebrities c ON r.celebrity_id = c.id
    JOIN content con ON r.content_id = con.id
    ORDER BY r.id
  `;

		const rows = await db.executeQuery(sql);
		res.json({ message: 'success', data: rows });
	})
);

// POST: 새 추천 정보 추가
router.post(
	'/',
	db.asyncHandler(async (req, res) => {
		const {
			celebrity_id,
			content_id,
			title,
			creator,
			release_date,
			recommendation_text,
			recommendation_source,
			img_link,
			affiliate_link,
			mediaDescription,
		} = req.body;

		const sql = SQL`
    INSERT INTO recommendations (celebrity_id, content_id, title, creator, release_date, recommendation_text, recommendation_source, img_link, affiliate_link, mediaDescription)
    VALUES (${celebrity_id}, ${content_id}, ${title}, ${creator}, ${release_date}, ${recommendation_text}, ${recommendation_source}, ${img_link}, ${affiliate_link}, ${mediaDescription})
  `;

		const result = await db.executeQuery(sql);
		res.json({ message: 'success', data: { id: result.lastID } });
	})
);

// PUT: 추천 정보 수정
router.put(
	'/:id',
	db.asyncHandler(async (req, res) => {
		const {
			celebrity_id,
			content_id,
			title,
			creator,
			release_date,
			recommendation_text,
			recommendation_source,
			img_link,
			affiliate_link,
			mediaDescription,
		} = req.body;

		const sql = SQL`
    UPDATE recommendations 
    SET celebrity_id = ${celebrity_id},
        content_id = ${content_id},
        title = ${title},
        creator = ${creator},
        release_date = ${release_date},
        recommendation_text = ${recommendation_text},
        recommendation_source = ${recommendation_source},
        img_link = ${img_link},
        affiliate_link = ${affiliate_link},
        mediaDescription = ${mediaDescription}
    WHERE id = ${req.params.id}
  `;

		const result = await db.executeQuery(sql);
		res.json({ message: 'success', data: { changes: result.changes } });
	})
);

// DELETE: 추천 정보 삭제
router.delete(
	'/:id',
	db.asyncHandler(async (req, res) => {
		const sql = SQL`DELETE FROM recommendations WHERE id = ${req.params.id}`;

		const result = await db.executeQuery(sql);
		res.json({ message: 'success', data: { changes: result.changes } });
	})
);

module.exports = router;
