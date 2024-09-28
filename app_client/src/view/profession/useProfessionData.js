import { useState, useEffect } from 'react';
import { fetchCelebrities } from 'api/celebrityApi';

const useProfessionData = (profession, contentType) => {
	const [professionData, setProfessionData] = useState(null);

	useEffect(() => {
		const loadCelebrities = async () => {
			try {
				const fixProfession = profession === '전체' ? 'all' : profession;
				const data = await fetchCelebrities(fixProfession);

				if (contentType !== '전체') {
					const filteredData = data.filter(
						(celeb) =>
							celeb.recommended_content_types &&
							celeb.recommended_content_types.includes(contentType)
					);
					setProfessionData(filteredData);
				} else {
					setProfessionData(data);
				}
			} catch (error) {
				console.error('Failed to load celebrity data:', error);
			}
		};

		loadCelebrities();
	}, [profession, contentType]);

	return professionData;
};

export default useProfessionData;
