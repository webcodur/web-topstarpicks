// 필요한 모듈 불러오기
const express = require('express');
const OpenAI = require('openai');
const fs = require('fs').promises;
const path = require('path');
const db = require('../database');
const SQL = require('sql-template-strings');

// Express 라우터 생성
const router = express.Router();

// OpenAI API 클라이언트 초기화
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// 헬퍼 함수들

/**
 * 프롬프트 파일을 읽는 함수
 * @param {string} filename - 읽을 파일의 이름
 * @returns {Promise<string>} 파일의 내용
 */
async function readPromptFile(filename) {
	const filePath = path.join(__dirname, '..', 'prompts', filename);
	try {
		return await fs.readFile(filePath, 'utf-8');
	} catch (error) {
		console.error('프롬프트 파일 읽기 오류:', error);
		throw new Error('프롬프트 파일을 읽을 수 없습니다.');
	}
}

/**
 * 총점을 계산하고 등급을 결정하는 함수
 * @param {number[]} scores - 각 평가 항목의 점수 배열
 * @param {number} transhistoricity - 역사를 초월한 영향력 점수
 * @returns {{totalScore: number, rank: string}} 총점과 등급
 */
function calculateTotalScoreAndRank(scores, transhistoricity) {
	const totalScore = scores.reduce((a, b) => a + b, 0) + transhistoricity;
	const ranks = [
		{ min: 70, rank: 'S' },
		{ min: 60, rank: 'A' },
		{ min: 50, rank: 'B' },
		{ min: 40, rank: 'C' },
	];
	const rank = ranks.find((r) => totalScore >= r.min)?.rank || 'D';
	return { totalScore, rank };
}

/**
 * 평가 결과의 유효성을 검사하는 함수
 * @param {Object} result - 평가 결과 객체
 * @throws {Error} 유효성 검사 실패 시 에러 발생
 */
function validateAssessmentResult(result) {
	const requiredFields = [
		'name',
		'scores',
		'explanations',
		'transhistoricity',
		'transhistoricity_explanation',
	];
	requiredFields.forEach((field) => {
		if (!(field in result)) {
			throw new Error(`필수 필드 '${field}'가 누락되었습니다.`);
		}
	});

	if (result.scores.length !== 6 || result.explanations.length !== 6) {
		throw new Error(
			'scores와 explanations는 각각 6개의 항목을 포함해야 합니다.'
		);
	}
}

// 라우트 핸들러
router.post('/assess-influence', async (req, res) => {
	try {
		// 요청 본문에서 인물 이름 추출
		const { name } = req.body;
		if (!name) {
			return res
				.status(400)
				.json({ error: '인물 이름이 제공되지 않았습니다.' });
		}

		// ID 조회
		const searchQuery = SQL`
          SELECT
            cel.id
          FROM
            celebrity_influence ci
          INNER JOIN
              celebrities as cel
          ON
            cel.id = ci.celebrity_id
          WHERE cel.name=${name}
        `;

		const idRow = await db.executeQuery(searchQuery);

		// 프롬프트 템플릿 읽기 및 인물 이름 삽입
		const promptTemplate = await readPromptFile('influenceAssessment.md');
		const prompt = promptTemplate.replace('[인물 이름]', name);

		// OpenAI API를 사용하여 채팅 완료 요청
		const chatCompletion = await openai.chat.completions.create({
			model: 'gpt-4',
			messages: [
				{
					role: 'system',
					content:
						'You are a highly knowledgeable AI assistant specialized in historical analysis and influence assessment. Provide accurate, factual information based on historical records and avoid speculation or unsupported claims. Always respond in valid JSON format.',
				},
				{ role: 'user', content: prompt },
			],
			temperature: 0,
			max_tokens: 1000,
		});

		// API 응답 파싱
		const result = JSON.parse(chatCompletion.choices[0].message.content);

		// 에러 처리
		if (result.error) {
			return res.status(400).json({ error: result.error });
		}

		// 결과 유효성 검사
		validateAssessmentResult(result);

		// 총점 계산 및 등급 결정
		const { totalScore, rank } = calculateTotalScoreAndRank(
			result.scores,
			result.transhistoricity
		);
		result.total_score = totalScore;
		result.rank = rank;

		// 영향력 지표 생성 또는 수정
		let query;
		if (idRow.length === 0) {
			// 새로운 레코드 삽입
			query = SQL`
            INSERT INTO celebrity_influence (
                celebrity_id, political, political_exp, strategic, strategic_exp,
                tech, tech_exp, social, social_exp, economic, economic_exp,
                cultural, cultural_exp, transhistoricity, transhistoricity_exp,
                total_score, rank
            ) VALUES (
                (SELECT id FROM celebrities WHERE name = ${name}),
                ${result.scores[0]}, ${result.explanations[0]},
                ${result.scores[1]}, ${result.explanations[1]},
                ${result.scores[2]}, ${result.explanations[2]},
                ${result.scores[3]}, ${result.explanations[3]},
                ${result.scores[4]}, ${result.explanations[4]},
                ${result.scores[5]}, ${result.explanations[5]},
                ${result.transhistoricity}, ${result.transhistoricity_explanation},
                ${result.total_score}, ${result.rank}
            )`;
		} else {
			// 기존 레코드 업데이트
			const celebrityId = idRow[0].id;
			query = SQL`
            UPDATE celebrity_influence
            SET
                political = ${result.scores[0]},
                political_exp = ${result.explanations[0]},
                strategic = ${result.scores[1]},
                strategic_exp = ${result.explanations[1]},
                tech = ${result.scores[2]},
                tech_exp = ${result.explanations[2]},
                social = ${result.scores[3]},
                social_exp = ${result.explanations[3]},
                economic = ${result.scores[4]},
                economic_exp = ${result.explanations[4]},
                cultural = ${result.scores[5]},
                cultural_exp = ${result.explanations[5]},
                transhistoricity = ${result.transhistoricity},
                transhistoricity_exp = ${result.transhistoricity_explanation},
                total_score = ${result.total_score},
                rank = ${result.rank}
            WHERE celebrity_id = ${celebrityId}`;
		}

		// 쿼리 실행
		await db.executeQuery(query);

		res.json({ message: 'success', data: result });
	} catch (error) {
		// 오류 처리 및 응답
		console.error('Error:', error);
		res.status(500).json({ error: error.message || 'Internal server error' });
	}
});

module.exports = router;
