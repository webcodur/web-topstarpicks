const express = require('express');
const router = express.Router();
const { crawlBooks } = require('../services/crawler');
const crawlRefiner = require('../services/crawlRefiner');
const db = require('../database');
const SQL = require('sql-template-strings');

const trimProperties = (books) => {
	return books.map(({ img_link, recommendation_source, ...rest }) => {
		const trimmedRest = Object.fromEntries(
			Object.entries(rest).map(([key, value]) => [key.trim(), value])
		);
		return trimmedRest;
	});
};

const reduceQuotes = (books) => {
	return books.map((book) => {
		const text = book.recommendation_text;

		// 텍스트가 없을 경우 빈 문자열 처리
		if (!text) {
			return {
				...book,
				recommendation_text: '',
			};
		}

		const head = text.indexOf('"') + 1;
		const tail = text.lastIndexOf('"');

		// 따옴표가 없을 경우 원본 텍스트 반환
		if (head === 0 || tail === -1 || head >= tail) {
			return {
				...book,
				recommendation_text: text,
			};
		}
		const updatedText = text.slice(head, tail);
		return {
			...book,
			recommendation_text: updatedText,
		};
	});
};

const findCelebrityId = async (name) => {
	const searchQuery = SQL`
    SELECT cel.id
    FROM celebrities cel
    WHERE cel.name=${name}`;
	const idRow = await db.executeQuery(searchQuery);
	return idRow.length > 0 ? idRow[0].id : null;
};

const upsertBook = async (book, celebrityId, contentId) => {
	const checkExistingSql = SQL`
    SELECT id FROM recommendations
    WHERE title = ${book.title} AND celebrity_id = ${celebrityId} AND content_id = ${contentId}
  `;

	const existingBook = await db.executeQuery(checkExistingSql);

	// 책이 존재하면 업데이트
	if (existingBook.length > 0) {
		const updateSql = SQL`
      UPDATE recommendations
      SET creator = ${book.creator},
          release_date = ${book.release_date},
          recommendation_text = ${book.recommendation_text},
          recommendation_source = ${book.recommendation_source},
          img_link = ${book.img_link},
          mediaDescription = ${book.mediaDescription}
      WHERE id = ${existingBook[0].id}
    `;
		await db.executeQuery(updateSql);
		return existingBook[0].id;
	} // 책이 존재하지 않으면 새로 삽입
	else {
		const insertSql = SQL`
      INSERT INTO recommendations (
        celebrity_id, content_id, title, creator, release_date,
        recommendation_text, recommendation_source, img_link,
        mediaDescription
      ) VALUES (
        ${celebrityId}, ${contentId}, ${book.title}, ${book.creator}, ${book.release_date},
        ${book.recommendation_text}, ${book.recommendation_source}, ${book.img_link},
        ${book.mediaDescription}
      )
    `;
		const result = await db.executeQuery(insertSql);
		return result.lastID;
	}
};

router.get('/', async (req, res) => {
	const { name, url } = req.query;

	if (!name || !url) {
		return res.status(400).json({
			success: false,
			message: '이름과 URL이 필요합니다.',
		});
	}

	try {
		const content_id = 1;
		const celeb_id = await findCelebrityId(name);
		if (!celeb_id) throw new Error('Celebrity not found');

		// 책 정보 생성
		const crawled = await crawlBooks(url);
		const trimmed = trimProperties(crawled);
		const reduced = reduceQuotes(trimmed);
		const refined = await crawlRefiner.refineBookData(reduced);
		refined.forEach((ele, index) => {
			ele.img_link = crawled[index].img_link;
			ele.recommendation_source = crawled[index].recommendation_source;
		});

		// 각 책 upsert
		const results = await Promise.all(
			refined.map((book) => upsertBook(book, celeb_id, content_id))
		);

		res.json({
			success: true,
			message: '책 정보가 성공적으로 처리되었습니다.',
			affected_rows: results.length,
		});
	} catch (error) {
		console.error('크롤링 또는 데이터 처리 오류:', error);
		res.status(500).json({
			success: false,
			message: '크롤링 또는 데이터 처리 과정 중 오류가 발생했습니다.',
			error: error.message,
		});
	}
});

module.exports = router;
