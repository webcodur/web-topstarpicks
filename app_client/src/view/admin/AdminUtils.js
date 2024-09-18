export const LOCAL_STORAGE_KEY = 'rowsData';

export const getInitialRows = () => {
	const storedRows = localStorage.getItem(LOCAL_STORAGE_KEY);
	try {
		return storedRows
			? JSON.parse(storedRows)
			: [
					{ id: 1, name: '홍길동', age: 20, occupation: '학생' },
					{ id: 2, name: '김철수', age: 30, occupation: '회사원' },
			  ];
	} catch (error) {
		console.error('Error parsing stored rows:', error);
		return [
			{ id: 1, name: '홍길동', age: 20, occupation: '학생' },
			{ id: 2, name: '김철수', age: 30, occupation: '회사원' },
		];
	}
};
