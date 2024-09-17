// api/recommendationApi.js

const BASE_URL = 'http://localhost:4000/api';

export const fetchRecommendations = async (celebName, contentType) => {
	const response = await fetch(
		`${BASE_URL}/recommendations?celebrity_name=${encodeURIComponent(
			celebName
		)}&content_type=${encodeURIComponent(contentType)}`
	);
	if (!response.ok) {
		const errorText = await response.text();
		throw new Error(
			`추천 정보를 가져오는데 실패했습니다. 상태: ${response.status}, 응답: ${errorText}`
		);
	}
	const data = await response.json();
	return data.data;
};

// 컨텐츠 타입별 개수 조회
export const fetchContentTypeNumber = async () => {
	const response = await fetch(`${BASE_URL}/recommendations/number`);
	if (!response.ok) {
		const errorText = await response.text();
		throw new Error(
			`컨텐츠 타입별 개수정보를 가져오는데 실패했습니다. 상태: ${response.status}, 응답: ${errorText}`
		);
	}
	const data = await response.json();
	return data.data;
};
