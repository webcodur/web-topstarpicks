const express = require('express');
const router = express.Router();
const db = require('../database');
const SQL = require('sql-template-strings');

// 인물명으로 단일 인물 정보 조회
router.get(
	'/name',
	db.asyncHandler(async (req, res) => {
		const { name } = req.query;

		if (!name) {
			return res.status(400).json({ error: '인물 이름을 제공해야 합니다.' });
		}

		const sql = SQL`
    SELECT 
      cel.id, cel.name, pro.name as profession, cel.gender, cel.nationality, cel.birth_date, cel.date_of_death, cel.biography, cel.img_link,
      GROUP_CONCAT(DISTINCT con.name) AS recommended_content_names
    FROM 
      celebrities cel
    LEFT JOIN 
      recommendations rec ON rec.celebrity_id = cel.id
    LEFT JOIN 
      profession pro ON pro.id = cel.profession_id
    LEFT JOIN 
      content con ON rec.content_id = con.id
    WHERE 
      cel.name = ${name}
    GROUP BY 
      cel.id
  `;

		const rows = await db.executeQuery(sql);
		res.json({ message: 'success', data: rows });
	})
);

// fetchCelebrities: 유명인사 직군별 데이터 조회
router.get(
	'/',
	db.asyncHandler(async (req, res) => {
		const { profession } = req.query;
		let sql = SQL`
    SELECT 
      cel.id, cel.name, cel.gender, cel.nationality, cel.birth_date, cel.date_of_death, cel.biography, cel.img_link, pro.name as profession,
      GROUP_CONCAT(DISTINCT con.name) AS recommended_content_names
    FROM 
      celebrities cel
    LEFT JOIN 
      recommendations rec ON cel.id = rec.celebrity_id
    LEFT JOIN 
      content con ON rec.content_id = con.id
    LEFT JOIN 
      profession pro ON pro.id = cel.profession_id
  `;

		if (profession) {
			sql = sql.append(SQL` WHERE pro.name = ${profession}`);
		}

		sql = sql.append(SQL`
    GROUP BY 
      cel.id
    ORDER BY 
      cel.name
  `);

		const rows = await db.executeQuery(sql);
		res.json({ message: 'success', data: rows });
	})
);

// 유명인사 직군별 인원수
router.get(
	'/profession-numbers',
	db.asyncHandler(async (req, res) => {
		const sql = SQL`
    SELECT 
      pro.id, pro.name, pro.eng_name, COUNT(*) AS profession_count
    FROM 
      celebrities cel    
    LEFT JOIN 
      profession pro ON pro.id = cel.profession_id
    GROUP BY 
      pro.id    
    ORDER BY 
      pro.name;
  `;

		const rows = await db.executeQuery(sql);
		res.json({ message: 'success', data: rows });
	})
);

// GET: 모든 Celebrity 조회 (Admin 용)
// fetchAllCelebrities
router.get(
	'/all',
	db.asyncHandler(async (req, res) => {
		const sql = SQL`
    SELECT * FROM celebrities
    ORDER BY name
  `;
		const rows = await db.executeQuery(sql);
		res.json({ message: 'success', data: rows });
	})
);

// POST: 새 Celebrity 추가 (Admin 용)
router.post(
	'/',
	db.asyncHandler(async (req, res) => {
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

		const result = await db.executeQuery(sql);
		res.json({ message: 'success', data: { id: result.lastID } });
	})
);

// PUT: Celebrity 정보 수정 (Admin 용)
router.put(
	'/:id',
	db.asyncHandler(async (req, res) => {
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

		const result = await db.executeQuery(sql);
		res.json({ message: 'success', data: { changes: result.changes } });
	})
);

// DELETE: Celebrity 삭제 (Admin 용)
router.delete(
	'/:id',
	db.asyncHandler(async (req, res) => {
		const sql = SQL`DELETE FROM celebrities WHERE id = ${req.params.id}`;

		const result = await db.executeQuery(sql);
		res.json({ message: 'success', data: { changes: result.changes } });
	})
);

// 유명인사 영향력 평가지표 받아보기
router.get('/influenceIndex/:testName', (req, res) => {
	const { testName } = req.params;
	// 해당 이름의 인물을 받아서 예수와 비교하여 영향력 지표 생성하기
	// 구글 트랜드 이용할 것.

	// 옵션사항
	// - 대상: 전 세계
	// - 기간: 지난 5년
	// - 카테고리: 모든 카테고리
	// - 집계: 웹 검색
	res.json({ message: 'success', data: { testName, influenceIndex: 1 } });
});

module.exports = router;
