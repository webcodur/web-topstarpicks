import { useState, useEffect } from 'react';
import { fetchCelebrities } from 'api/celebrityApi';
import { useAtom } from 'jotai';
import { menuInfoAtom, profDataLoadedAtom } from 'store/atom';

const useProfessionData = (profession, contentName, timesName, menuInfo) => {
	const [professionData, setProfessionData] = useState(null);
	const [profDataLoaded, setProfDataLoaded] = useAtom(profDataLoadedAtom);

	useEffect(() => {
		const fetchData = async () => {
			setProfDataLoaded(false);
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
				setProfDataLoaded(false);
			}
		};

		fetchData();
	}, [profession, contentName, timesName, menuInfo, setProfDataLoaded]);

	return { professionData };
};

export default useProfessionData;
