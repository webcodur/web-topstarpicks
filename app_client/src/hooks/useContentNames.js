import { useEffect, useState } from 'react';
import { fetchContent } from 'api/content';

export const useContentNames = () => {
	const [contentNames, setContentNames] = useState(null);

	useEffect(() => {
		const fetchFunc = async () => {
			try {
				const contentInfo = await fetchContent();
				setContentNames([
					{ id: 999, name: '전체', eng_name: 'all' },
					...contentInfo,
				]);
			} catch (error) {
				console.error('Error fetching contentInfo:', error);
			}
		};
		fetchFunc();
	}, [setContentNames]);

	return contentNames;
};
