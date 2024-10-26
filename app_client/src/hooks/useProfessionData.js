import { useState, useEffect } from 'react';
import { fetchCelebrities } from 'api/celebrityApi';

const useProfessionData = (profession, contentName, menuInfo) => {
	const [professionData, setProfessionData] = useState(null);

	useEffect(() => {
		const loadCelebrities = async () => {
			try {
				const fixProfession = profession === '전체' ? 'all' : profession;
				const data = await fetchCelebrities(fixProfession);

				if (menuInfo === '인물도감') {
					setProfessionData(data);
				}

				if (menuInfo === '추천정보') {
					const filteredData = data.filter(
						(celeb) =>
							celeb.recommended_content_names &&
							celeb.recommended_content_names.includes(contentName)
					);
					setProfessionData(filteredData);
				}
			} catch (error) {
				console.error('Failed to load celebrity data:', error);
			}
		};

		loadCelebrities();
	}, [profession, contentName, menuInfo]);

	return professionData;
};

export default useProfessionData;
