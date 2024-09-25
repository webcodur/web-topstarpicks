const express = require('express');
const router = express.Router();
const db = require('./database');
const SQL = require('sql-template-strings');

// 인물명으로 단일 인물 정보 조회
router.get('/name', (req, res) => {
	const { name } = req.query;

	if (!name) {
		res.status(400).json({ error: '인물 이름을 제공해야 합니다.' });
		return;
	}

	const sql = SQL`
    SELECT 
      cel.id, cel.name, cel.profession, cel.gender, cel.nationality, cel.birth_date, cel.date_of_death, cel.biography, cel.img_link,
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
router.get('/', (req, res) => {
	const { profession } = req.query;
	let sql = SQL`
    SELECT 
      cel.id, cel.name, cel.profession, cel.gender, cel.nationality, cel.birth_date, cel.date_of_death, cel.biography, cel.img_link, 
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
router.get('/profession-numbers', (req, res) => {
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

// GET: 모든 Celebrity 조회 (Admin 용)
router.get('/all', (req, res) => {
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
router.post('/', (req, res) => {
	const {
		name,
		profession,
		gender,
		nationality,
		birth_date,
		date_of_death,
		biography,
		img_link,
	} = req.body;

	const sql = SQL`
    INSERT INTO celebrities (name, profession, gender, nationality, birth_date, date_of_death, biography, img_link)
    VALUES (${name}, ${profession}, ${gender}, ${nationality}, ${birth_date}, ${date_of_death}, ${biography}, ${img_link})
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
router.put('/:id', (req, res) => {
	const {
		name,
		profession,
		gender,
		nationality,
		birth_date,
		date_of_death,
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
        date_of_death = ${date_of_death}, 
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
router.delete('/:id', (req, res) => {
	const sql = SQL`DELETE FROM celebrities WHERE id = ${req.params.id}`;

	db.run(sql.text, sql.values, function (err) {
		if (err) {
			res.status(400).json({ error: err.message });
			return;
		}
		res.json({ message: 'success', data: { changes: this.changes } });
	});
});

module.exports = router;
