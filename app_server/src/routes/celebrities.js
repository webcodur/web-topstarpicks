const express = require('express');
const router = express.Router();
const db = require('../database');
const SQL = require('sql-template-strings');
const {
	getCelebrityInfo,
	getCelebrityInfoByGPT,
} = require('../services/openai');

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
      cel.id, cel.name, cel.postname, cel.prename,
      pro.name as profession, cel.gender, cel.nationality, cel.birth_date, cel.death_date, cel.biography, cel.img_link, cel.vid_link, cel.is_real, cel.is_fictional,
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
      cel.id, cel.name, cel.prename, cel.postname,
      cel.gender, cel.nationality, cel.birth_date, cel.death_date, 
      cel.biography, cel.img_link, cel.vid_link, pro.name as profession,
      cel.is_real, cel.is_fictional,
      GROUP_CONCAT(DISTINCT con.name) AS recommended_content_names,

      inf.political,
      inf.strategic,
      inf.tech,
      inf.social,
      inf.economic,
      inf.cultural,
      inf.transhistoricity,
      inf.total_score,
      inf.political_exp,
      inf.strategic_exp,
      inf.tech_exp,
      inf.social_exp,
      inf.economic_exp,
      inf.cultural_exp,
      inf.transhistoricity_exp,
      inf.rank
    FROM 
      celebrities cel
    LEFT JOIN 
      recommendations rec ON cel.id = rec.celebrity_id
    LEFT JOIN 
      content con ON rec.content_id = con.id
    LEFT JOIN 
      profession pro ON pro.id = cel.profession_id
    LEFT JOIN
      celebrity_influence inf ON cel.id = inf.celebrity_id
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
      SELECT 
        cel.id, 
        cel.name as name, 
        cel.prename, 
        cel.postname, 
        cel.gender,
        cel.nationality,
        cel.birth_date,
        cel.biography,
        cel.img_link,
        cel.vid_link,
        cel.death_date,
        pro.id as profession_id,
        pro.name as profession_kor,
        pro.eng_name as profession_eng
      FROM celebrities cel
      INNER JOIN profession pro
      ON pro.id = cel.profession_id
    `;

		const rows = await db.executeQuery(sql);
		res.json({ message: 'success', data: rows });
	})
);

// POST: 새 Celebrity 추가 (Admin 용) createCelebrity - todo: is값 추가 필요
router.post(
	'/',
	db.asyncHandler(async (req, res) => {
		try {
			const {
				name,
				prename,
				postname,
				profession_id,
				gender,
				nationality,
				birth_date,
				death_date,
				biography,
				img_link,
				vid_link,
				book_story,
				quotes,
				is_real,
				is_fictional,
			} = req.body;

			const sql = SQL`
        INSERT INTO celebrities (
          name, prename, postname, profession_id, gender, nationality, 
          birth_date, death_date, biography, img_link, vid_link,
          book_story, quotes, is_real, is_fictional
        )
        VALUES (
          ${name}, ${prename}, ${postname}, ${profession_id}, ${gender}, ${nationality}, 
          ${birth_date}, ${death_date}, ${biography}, ${img_link}, ${vid_link},
          ${book_story}, ${quotes}, ${is_real}, ${is_fictional}
        )
      `;

			const result = await db.executeQuery(sql);
			res.json({ message: 'success', data: { id: result.lastID } });
		} catch (error) {
			console.error('Error creating celebrity:', error);
			res
				.status(500)
				.json({ message: 'Error creating celebrity', error: error.message });
		}
	})
);

// PUT: Celebrity 정보 수정 (Admin 용) updateCelebrity - todo: is값 추가 필요
router.put(
	'/:id',
	db.asyncHandler(async (req, res) => {
		const {
			name,
			prename,
			postname,
			profession_id,
			gender,
			nationality,
			birth_date,
			death_date,
			biography,
			img_link,
			book_story,
			quotes,
			is_real,
			is_fictional,
		} = req.body;

		const sql = SQL`
    UPDATE celebrities 
    SET name = ${name}, 
        prename = ${prename}, 
        postname = ${postname}, 
        profession_id = ${profession_id}, 
        gender = ${gender}, 
        nationality = ${nationality}, 
        birth_date = ${birth_date}, 
        death_date = ${death_date}, 
        biography = ${biography}, 
        img_link = ${img_link},
        book_story = ${book_story},
        quotes = ${quotes},
        is_real = ${is_real},
        is_fictional = ${is_fictional}
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

// 이름으로 유명인사 검색 (부분 일치)
router.get(
	'/search',
	db.asyncHandler(async (req, res) => {
		const { query } = req.query;

		if (!query) {
			return res.status(400).json({ error: '검색어를 입력해주세요.' });
		}

		console.log('Search query:', query);

		const sql = SQL`
      SELECT 
        cel.id, 
        cel.name,
        cel.prename,
        cel.postname,
        pro.name as profession_kor
      FROM celebrities cel
      LEFT JOIN profession pro ON pro.id = cel.profession_id
      WHERE cel.name LIKE ${`%${query}%`}
      OR cel.prename LIKE ${`%${query}%`}
      OR cel.postname LIKE ${`%${query}%`}
      ORDER BY cel.name
      LIMIT 10
    `;

		const rows = await db.executeQuery(sql);
		console.log('Search results:', rows);
		res.json({ message: 'success', data: rows });
	})
);

// ID로 유명인사 정보 조회
router.get(
	'/detail/:id',
	db.asyncHandler(async (req, res) => {
		const { id } = req.params;
		console.log('Fetching celebrity details for ID:', id);

		const sql = SQL`
      SELECT 
        cel.id, cel.name, cel.postname, cel.prename,
        pro.name as profession, cel.gender, cel.nationality, 
        cel.birth_date, cel.death_date, cel.biography, 
        cel.img_link, cel.vid_link, cel.book_story, cel.quotes,
        cel.is_real, cel.is_fictional,
        pro.id as profession_id
      FROM 
        celebrities cel
      LEFT JOIN 
        profession pro ON pro.id = cel.profession_id
      WHERE 
        cel.id = ${id}
    `;

		const rows = await db.executeQuery(sql);
		console.log('Query results:', rows);

		if (rows.length === 0) {
			return res.status(404).json({ message: 'Celebrity not found' });
		}
		res.json({ message: 'success', data: rows[0] });
	})
);

router.post('/gpt-info', async (req, res) => {
	try {
		const { name, description } = req.body;
		if (!name) {
			return res.status(400).json({ error: '인물 이름은 필수입니다.' });
		}

		const celebrityInfo = await getCelebrityInfoByGPT(name, description);
		console.log('Server - Raw GPT Response:', celebrityInfo);

		const validatedResponse = {
			name: celebrityInfo.name || '',
			profession_kor: celebrityInfo.profession_kor || '',
			gender: celebrityInfo.gender || '',
			nationality: celebrityInfo.nationality || '',
			birth_date: celebrityInfo.birth_date || '',
			death_date: celebrityInfo.death_date || '',
			biography: celebrityInfo.biography || '',
			is_real: celebrityInfo.is_real || false,
			is_fictional: celebrityInfo.is_fictional || false,
		};

		console.log('Server - Validated Response:', validatedResponse);
		res.json({ message: 'success', data: validatedResponse });
	} catch (error) {
		console.error('Error in /gpt-info:', error);
		res.status(500).json({ error: 'GPT 정보 조회 중 오류가 발생했습니다.' });
	}
});

module.exports = router;
