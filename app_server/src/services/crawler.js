const cheerio = require('cheerio');
const axios = require('axios');

async function crawlBooks(url) {
	try {
		const response = await axios.get(url);
		const $ = cheerio.load(response.data);

		const books = [];

		$('ul').each((index, ul) => {
			const $ul = $(ul);
			const $lis = $ul.find('> li');

			if ($lis.length > 0 && $lis.first().find('h3').length > 0) {
				$lis.each((i, li) => {
					const $li = $(li);
					const book = {};

					book.title = $li.find('h3').first().text().trim();
					book.creator = $li.find('h5').first().text().trim();

					const $img = $li.find('img').first();
					book.img_link = $img.attr('src');

					const $sourceLink = $li.find('a:contains("Source")').first();
					book.recommendation_source = $sourceLink.attr('href');

					let $recommendationText = $sourceLink
						.parent()
						.contents()
						.filter(function () {
							return this.nodeType === 3 && this.nodeValue.trim() !== '';
						});
					if ($recommendationText.length === 0) {
						$recommendationText = $sourceLink.parent().next('p');
					}
					book.recommendation_text = $recommendationText
						.text()
						.trim()
						.replace(/^[""]/, '')
						.replace(/["""]$/, '')
						.trim();

					Object.keys(book).forEach((key) => {
						if (!book[key]) delete book[key];
					});

					if (Object.keys(book).length > 0) {
						books.push(book);
					}
				});

				return false;
			}
		});

		return books;
	} catch (error) {
		console.error('크롤링 오류:', error);
		throw error;
	}
}

module.exports = { crawlBooks };
