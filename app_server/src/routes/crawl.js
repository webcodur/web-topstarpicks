const express = require('express');
const router = express.Router();
const { crawlBooks } = require('../services/crawler');
const crawlRefiner = require('../services/crawlRefiner');

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

router.get('/', async (req, res) => {
	const { name, url } = req.query;

	if (!name || !url) {
		return res.status(400).json({
			success: false,
			message: '이름과 URL이 필요합니다.',
		});
	}

	try {
		// 책 정보 크롤링
		const books = await crawlBooks(url);
		const improvedBooks = await crawlRefiner.improveCrawlResult(name, books);

		console.log('improvedBooks', improvedBooks);

		// 셀럽 및 컨텐츠 아이디 설정
		const celeb_id = await findCelebrityId(name);
		const content_id = 1;

		// 처리 방식 결정

		// 1. 바로 db 넣기
		// 1-1 책 정보가 있을 때는 수정,
		// 1-2 책 정보가 없을 때는 생성
	} catch (error) {
		console.error('크롤링 또는 데이터 개선 오류:', error);
		res.status(500).json({
			success: false,
			message: '크롤링 또는 데이터 처리 과정 중 오류가 발생했습니다.',
			error: error.message,
		});
	}
});

module.exports = router;
