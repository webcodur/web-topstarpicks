import { useState } from 'react';

export const useSortState = () => {
	const [sortCriteria, setSortCriteria] = useState('influence');
	const [sortOrder, setSortOrder] = useState('desc');

	return {
		sortCriteria,
		setSortCriteria,
		sortOrder,
		setSortOrder,
	};
};
