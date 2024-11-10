import { useState, useEffect } from 'react';
import { fetchCelebrities } from 'api/celebrityApi';
import { useAtom } from 'jotai';
import { menuInfoAtom } from 'store/atom';

const useProfessionData = (profession, contentName, timesName) => {
	const [professionData, setProfessionData] = useState(null);
	const [profDataLoaded, setProfDataLoaded] = useState(false);
	const [menuInfo] = useAtom(menuInfoAtom);

	useEffect(() => {
		const loadCelebrities = async () => {
			try {
				const data = await fetchCelebrities({
					profession,
					timesName,
					menuInfo,
					contentName,
				});
				setProfessionData(data);
				setProfDataLoaded(true);
			} catch (error) {
				console.error('Failed to load celebrity data:', error);
			}
		};

		loadCelebrities();
	}, [profession, contentName, timesName, menuInfo]);

	return { profDataLoaded, professionData };
};

export default useProfessionData;
