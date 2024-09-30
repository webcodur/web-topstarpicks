import { useEffect } from 'react';
import { useAtom } from 'jotai';
import { contentNameAtom } from 'store/atom';
import { fetchContent } from 'api/content';

export const useContent = () => {
	const [contentName, setContentName] = useAtom(contentNameAtom);

	useEffect(() => {
		const fetchFunc = async () => {
			try {
				const contentInfo = await fetchContent();

				// content Info => content name

				setContentName(contentInfo);
			} catch (error) {
				console.error('Error fetching contentInfo:', error);
			}
		};
		fetchFunc();
	}, [setContentName]);

	return { contentName };
};
