import { useEffect, useState } from 'react';
import { fetchAllCelebrities } from 'api/celebrityApi';

export const useCelebrities = () => {
	const [celebrities, setCelebrities] = useState(null);

	useEffect(() => {
		const fetchFunc = async () => {
			try {
				const celebritiesInfo = await fetchAllCelebrities();
				setCelebrities(celebritiesInfo);
			} catch (error) {
				console.error('전체 셀럽 정보를 가져오는 도중 오류 발생:', error);
			}
		};
		fetchFunc();
	}, []);

	return celebrities;
};
