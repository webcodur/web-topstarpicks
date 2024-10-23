import { useState, useEffect } from 'react';
import { fetchCelebrities } from 'api/celebrityApi';

const useProfessionData = (profession, contentName) => {
	const [professionData, setProfessionData] = useState(null);

	useEffect(() => {
		const loadCelebrities = async () => {
			try {
				const fixProfession = profession === '전체' ? 'all' : profession;
				const data = await fetchCelebrities(fixProfession);

				if (contentName !== '전체') {
					const filteredData = data.filter(
						(celeb) =>
							celeb.recommended_content_names &&
							celeb.recommended_content_names.includes(contentName)
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
	}, [profession, contentName]);

	return professionData;
};

export default useProfessionData;
