// api/celebrityApi.js

const BASE_URL = 'http://localhost:4000/api';

export const fetchCelebrities = async (profession = 'all') => {
	const url =
		profession === 'all'
			? `${BASE_URL}/celebrities`
			: `${BASE_URL}/celebrities?profession=${encodeURIComponent(profession)}`;

	try {
		const response = await fetch(url);
		if (!response.ok) {
			throw new Error('Network response was not ok');
		}
		const result = await response.json();
		return result.data;
	} catch (error) {
		console.error('Failed to fetch celebrity data:', error);
		throw error;
	}
};

export const fetchPersonInfo = async (celebName) => {
	const response = await fetch(
		`${BASE_URL}/celebrities/name?name=${encodeURIComponent(celebName)}`
	);
	if (!response.ok) {
		const errorText = await response.text();
		throw new Error(
			`인물 정보를 가져오는데 실패했습니다. 상태: ${response.status}, 응답: ${errorText}`
		);
	}
	const data = await response.json();
	if (data.data.length === 0) {
		throw new Error('인물을 찾을 수 없습니다.');
	}
	return data.data[0];
};
