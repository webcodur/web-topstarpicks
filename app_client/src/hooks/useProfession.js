import { useEffect } from 'react';
import { useAtom } from 'jotai';
import { professionNameAtom } from 'store/atom';
import { fetchProfession } from 'api/profession';

export const useProfession = () => {
	const [professionName, setProfessionName] = useAtom(professionNameAtom);

	useEffect(() => {
		const fetchFunc = () => async () => {
			try {
				const professionInfo = await fetchProfession();

				// profession Info => profession name

				setProfessionName(professionInfo);
			} catch (error) {
				console.error('Error fetching professionInfo:', error);
			}
		};
		fetchFunc();
	}, [setProfessionName]);

	return { professionName };
};
