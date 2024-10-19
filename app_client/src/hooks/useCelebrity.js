import { useEffect, useState } from 'react';
import { fetchPersonInfo } from 'api/celebrityApi';

export const useCelebrity = (name) => {
	const [celebrity, setCelebrity] = useState(null);

	useEffect(() => {
		const fetchFunc = async () => {
			if (name === '' || name === null) return;
			const celebInfo = await fetchPersonInfo(name);
			setCelebrity(celebInfo);
		};

		fetchFunc();
	}, [name]);

	return celebrity;
};
