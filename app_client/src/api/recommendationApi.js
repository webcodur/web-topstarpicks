import { axiosInstance, createApiCall } from './apiUtils';

export const fetchRecommendations = createApiCall(
	(celebName, contentName) =>
		axiosInstance.get('/recommendations', {
			params: { celebrity_name: celebName, content_name: contentName },
		}),
	'추천 정보를 가져오는데 실패했습니다:'
);

export const fetchContentTypeNumber = createApiCall(
	() => axiosInstance.get('/recommendations/number'),
	'컨텐츠 타입별 개수정보를 가져오는데 실패했습니다:'
);

// Admin 관련 API 호출 추가
export const fetchAllRecommendations = createApiCall(
	() => axiosInstance.get('/recommendations/all'),
	'모든 추천 정보를 가져오는데 실패했습니다:'
);

export const createRecommendation = createApiCall(
	(recommendationData) =>
		axiosInstance.post('/recommendations', recommendationData),
	'추천 정보 생성에 실패했습니다:'
);

export const updateRecommendation = createApiCall(
	(id, recommendationData) =>
		axiosInstance.put(`/recommendations/${id}`, recommendationData),
	'추천 정보 수정에 실패했습니다:'
);

export const deleteRecommendation = createApiCall(
	(id) => axiosInstance.delete(`/recommendations/${id}`),
	'추천 정보 삭제에 실패했습니다:'
);
