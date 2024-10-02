import { useEffect, useState } from 'react';
import { fetchContentNumbers } from 'api/recommendationApi';

export const useContentNumbers = () => {
	const [contentTypeNumbers, setContentTypeNumbers] = useState(null);

	useEffect(() => {
		const fetchFunc = async () => {
			try {
				const contentNumbers = await fetchContentNumbers();
				setContentTypeNumbers(contentNumbers);
			} catch (error) {
				console.error('Error fetching contentNumbers:', error);
			}
		};
		fetchFunc();
	}, [setContentTypeNumbers]);

	return contentTypeNumbers;
};
