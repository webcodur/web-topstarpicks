const cors = require('cors');
const db = require('./database');
const express = require('express');
const SQL = require('sql-template-strings');
const app = express();
const port = 4000;

app.use(
	cors({
		origin: 'http://localhost:3000',
		methods: ['GET', 'POST', 'PUT', 'DELETE'],
		allowedHeaders: ['Content-Type', 'Authorization'],
	})
);

app.use(express.json());

app.listen(port, () => {
	console.log(`서버가 포트 ${port}에서 시작되었습니다.`);
});

// 인물명으로 단일 인물 정보 조회
app.get('/api/celebrities/name', (req, res) => {
	const { name } = req.query;

	if (!name) {
		res.status(400).json({ error: '인물 이름을 제공해야 합니다.' });
		return;
	}

	const sql = SQL`
    SELECT 
      cel.id, cel.name, cel.profession, cel.gender, cel.nationality, cel.birth_date, cel.biography, cel.img_link,
      GROUP_CONCAT(DISTINCT con.type) AS recommended_content_types
    FROM 
      celebrities cel
    LEFT JOIN 
      recommendations rec ON cel.id = rec.celebrity_id
    LEFT JOIN 
      content con ON rec.content_id = con.id
    WHERE 
      cel.name = ${name}
    GROUP BY 
      cel.id
  `;

	db.all(sql.text, sql.values, (err, rows) => {
		if (err) {
			res.status(400).json({ error: err.message });
			return;
		}
		res.json({ message: 'success', data: rows });
	});
});

// 유명인사 직군별 데이터 조회
app.get('/api/celebrities', (req, res) => {
	const { profession } = req.query;
	let sql = SQL`
    SELECT 
      cel.id, cel.name, cel.profession, cel.gender, cel.nationality, cel.birth_date, cel.biography, cel.img_link,
      GROUP_CONCAT(DISTINCT con.type) AS recommended_content_types
    FROM 
      celebrities cel
    LEFT JOIN 
      recommendations rec ON cel.id = rec.celebrity_id
    LEFT JOIN 
      content con ON rec.content_id = con.id
  `;

	if (profession) {
		sql = sql.append(SQL` WHERE cel.profession = ${profession}`);
	}

	sql = sql.append(SQL`
    GROUP BY 
      cel.id
    ORDER BY 
      cel.name
  `);

	db.all(sql.text, sql.values, (err, rows) => {
		if (err) {
			res.status(400).json({ error: err.message });
			return;
		}
		res.json({ message: 'success', data: rows });
	});
});

// 유명인사 직군별 인원수
app.get('/api/celebrities/profession-numbers', (req, res) => {
	const sql = SQL`
    SELECT profession, COUNT(*) AS profession_count
    FROM celebrities
    GROUP BY profession;
  `;

	db.all(sql.text, sql.values, (err, rows) => {
		if (err) {
			res.status(400).json({ error: err.message });
			return;
		}
		res.json({ message: 'success', data: rows });
	});
});

// 특정 인물의 특정 타입 컨텐츠 추천 목록 조회
app.get('/api/recommendations', (req, res) => {
	const { celebrity_name, content_type } = req.query;

	if (!celebrity_name || !content_type) {
		res
			.status(400)
			.json({ error: '인물 이름과 컨텐츠 타입을 모두 제공해야 합니다.' });
		return;
	}

	const sql = SQL`
    SELECT 
      r.title, r.creator, r.release_date, r.recommendation_text as reason, r.affiliate_link, r.img_link, r.mediaDescription
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
app.get('/api/recommendations/number', (req, res) => {
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

// GET: 모든 Celebrity 조회 (Admin 용)
app.get('/api/celebrities/all', (req, res) => {
	const sql = SQL`
    SELECT * FROM celebrities
    ORDER BY name
  `;

	db.all(sql.text, sql.values, (err, rows) => {
		if (err) {
			res.status(400).json({ error: err.message });
			return;
		}
		res.json({ message: 'success', data: rows });
	});
});

// POST: 새 Celebrity 추가 (Admin 용)
app.post('/api/celebrities', (req, res) => {
	const {
		name,
		profession,
		gender,
		nationality,
		birth_date,
		biography,
		img_link,
	} = req.body;

	const sql = SQL`
    INSERT INTO celebrities (name, profession, gender, nationality, birth_date, biography, img_link)
    VALUES (${name}, ${profession}, ${gender}, ${nationality}, ${birth_date}, ${biography}, ${img_link})
  `;

	db.run(sql.text, sql.values, function (err) {
		if (err) {
			res.status(400).json({ error: err.message });
			return;
		}
		res.json({ message: 'success', data: { id: this.lastID } });
	});
});

// PUT: Celebrity 정보 수정 (Admin 용)
app.put('/api/celebrities/:id', (req, res) => {
	const {
		name,
		profession,
		gender,
		nationality,
		birth_date,
		biography,
		img_link,
	} = req.body;

	const sql = SQL`
    UPDATE celebrities 
    SET name = ${name}, 
        profession = ${profession}, 
        gender = ${gender}, 
        nationality = ${nationality}, 
        birth_date = ${birth_date}, 
        biography = ${biography}, 
        img_link = ${img_link}
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

// DELETE: Celebrity 삭제 (Admin 용)
app.delete('/api/celebrities/:id', (req, res) => {
	const sql = SQL`DELETE FROM celebrities WHERE id = ${req.params.id}`;

	db.run(sql.text, sql.values, function (err) {
		if (err) {
			res.status(400).json({ error: err.message });
			return;
		}
		res.json({ message: 'success', data: { changes: this.changes } });
	});
});

// 에러 핸들링 미들웨어
app.use((err, req, res, next) => {
	console.error('서버 오류:', err.stack);
	res.status(500).send('서버 내부 오류가 발생했습니다.');
});
