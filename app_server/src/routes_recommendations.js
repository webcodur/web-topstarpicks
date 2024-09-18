const express = require('express');
const router = express.Router();
const db = require('./database');
const SQL = require('sql-template-strings');

// 특정 인물의 특정 타입 컨텐츠 추천 목록 조회
router.get('/', (req, res) => {
	const { celebrity_name, content_type } = req.query;

	if (!celebrity_name || !content_type) {
		res
			.status(400)
			.json({ error: '인물 이름과 컨텐츠 타입을 모두 제공해야 합니다.' });
		return;
	}

	const sql = SQL`
    SELECT 
      r.title, r.creator, r.release_date, r.recommendation_text as reason, r.affiliate_link, r.img_link, r.mediaDescription, r.recommendation_source
    FROM 
      recommendations r
    JOIN 
      celebrities c ON r.celebrity_id = c.id
    JOIN 
      content ct ON r.content_id = ct.id
    WHERE 
      c.name = ${celebrity_name}
      AND ct.type = ${content_type}
    ORDER BY 
      r.release_date DESC
  `;

	db.all(sql.text, sql.values, (err, rows) => {
		if (err) {
			res.status(400).json({ error: err.message });
			return;
		}
		res.json({ message: 'success', data: rows });
	});
});

// 컨텐츠 타입별 개수 조회
router.get('/number', (req, res) => {
	const sql = SQL`
    SELECT con.type, COUNT(*) as count
    FROM recommendations as rec
    INNER JOIN content as con
    ON con.id = rec.content_id
    GROUP BY con.type

    UNION ALL

    SELECT '전체' as type, COUNT(*) as count
    FROM recommendations as rec
    INNER JOIN content as con
    ON con.id = rec.content_id;
  `;
	db.all(sql.text, sql.values, (err, rows) => {
		if (err) {
			res.status(400).json({ error: err.message });
			return;
		}
		res.json({ message: 'success', data: rows });
	});
});

// GET: 모든 추천 정보 조회 (관리자용)
router.get('/all', (req, res) => {
	const sql = SQL`
    SELECT r.*, c.name as celebrity_name, ct.type as content_type
    FROM recommendations r
    JOIN celebrities c ON r.celebrity_id = c.id
    JOIN content ct ON r.content_id = ct.id
    ORDER BY r.id
  `;

	db.all(sql.text, sql.values, (err, rows) => {
		if (err) {
			res.status(400).json({ error: err.message });
			return;
		}
		res.json({ message: 'success', data: rows });
	});
});

// POST: 새 추천 정보 추가
router.post('/', (req, res) => {
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

	db.run(sql.text, sql.values, function (err) {
		if (err) {
			res.status(400).json({ error: err.message });
			return;
		}
		res.json({ message: 'success', data: { id: this.lastID } });
	});
});

// PUT: 추천 정보 수정
router.put('/:id', (req, res) => {
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

	db.run(sql.text, sql.values, function (err) {
		if (err) {
			res.status(400).json({ error: err.message });
			return;
		}
		res.json({ message: 'success', data: { changes: this.changes } });
	});
});

// DELETE: 추천 정보 삭제
router.delete('/:id', (req, res) => {
	const sql = SQL`DELETE FROM recommendations WHERE id = ${req.params.id}`;

	db.run(sql.text, sql.values, function (err) {
		if (err) {
			res.status(400).json({ error: err.message });
			return;
		}
		res.json({ message: 'success', data: { changes: this.changes } });
	});
});

module.exports = router;
