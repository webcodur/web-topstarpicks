import { useState } from 'react';

export const useEraBoundaries = () => {
	const [eraBoundaries, setEraBoundaries] = useState({
		ancient: 476,
		medieval: 1453,
		early_modern: 1789,
		modern: 1945,
	});

	return {
		eraBoundaries,
		setEraBoundaries,
	};
};
