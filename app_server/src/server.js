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
      r.title, r.creator, r.release_date, r.recommendation_text as reason, r.affiliate_link, r.img_link
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

// 에러 핸들링 미들웨어
app.use((err, req, res, next) => {
	console.error('서버 오류:', err.stack);
	res.status(500).send('서버 내부 오류가 발생했습니다.');
});
