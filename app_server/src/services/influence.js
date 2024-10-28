const SQL = require('sql-template-strings');
const db = require('../database');
const openai = require('./openai');
const assessment = require('./assessment');

/**
 * 인물의 ID를 조회하는 함수
 * @param {string} name - 인물 이름
 * @returns {Promise<number|null>} 인물 ID 또는 null
 */
async function findCelebrityId(name) {
	const searchQuery = SQL`
        SELECT cel.id
        FROM celebrity_influence ci
        INNER JOIN celebrities as cel ON cel.id = ci.celebrity_id
        WHERE cel.name=${name}
    `;
	const idRow = await db.executeQuery(searchQuery);
	return idRow.length > 0 ? idRow[0].id : null;
}

/**
 * 영향력 평가를 수행하고 결과를 저장하는 함수
 * @param {string} name - 평가할 인물 이름
 * @returns {Promise<Object>} 평가 결과
 */
async function assessAndSaveInfluence(name, otherDesc) {
	const prompt1 = await openai.readPromptFile('influenceAssessment.txt');
	const prompt2 = prompt1.replace('[인물 이름]', name);
	const prompt3 = prompt2.replace('[추가적인 설명]', otherDesc);

	const systemMessage =
		'You are a highly knowledgeable AI assistant specialized in historical analysis and influence assessment. Provide accurate, factual information based on historical records and avoid speculation or unsupported claims. Always respond in valid JSON format.';

	const aiResponse = await openai.getChatCompletion(prompt3, systemMessage);
	if (aiResponse.error) throw new Error(aiResponse.error);

	const result = assessment.processResult(aiResponse);
	const celebrityId = await findCelebrityId(name);
	let query;

	if (celebrityId === null) {
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

	await db.executeQuery(query);
	return result;
}

module.exports = {
	assessAndSaveInfluence,
};
