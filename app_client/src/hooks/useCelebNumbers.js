import { useState, useEffect } from 'react';
import { fetchCelebrityNumbers } from 'api/celebrityApi';

const useCelebNumbers = () => {
	const [celebNumbers, setCelebNumbers] = useState(null);
	const [celebTotals, setCelebTotals] = useState(null);

	useEffect(() => {
		const func = async () => {
			try {
				const jobs = await fetchCelebrityNumbers();
				setCelebNumbers(jobs);

				let totalCount = jobs.reduce(
					(acc, job) => acc + job.profession_count,
					0
				);

				setCelebTotals(totalCount);
			} catch (error) {
				console.error('유명인사 직군별 숫자 로드 실패:', error);
			}
		};
		func();
	}, []);

	return [celebNumbers, celebTotals];
};

export default useCelebNumbers;
