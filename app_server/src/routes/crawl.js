const express = require('express');
const router = express.Router();
const { crawlBooks } = require('../services/crawler');

router.get('/', async (req, res) => {
	const { name, url } = req.query;

	console.log('셀럽명', name);

	try {
		const books = await crawlBooks(url);

		console.log('크롤링 결과:');
		books.forEach((book, index) => {
			console.log(`\n책 ${index + 1}:`, JSON.stringify(book, null, 2));
		});

		res.json({
			message: '크롤링이 성공적으로 완료되었습니다',
			booksCount: books.length,
			books: books,
		});
	} catch (error) {
		console.error('크롤링 오류:', error);
		res.status(500).json({
			message: '크롤링 과정 중 오류가 발생했습니다',
			error: error.message,
		});
	}
});

module.exports = router;
