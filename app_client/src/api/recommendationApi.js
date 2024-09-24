// api/recommendationApi.js

import { axiosInstance, createApiCall } from './apiUtils';

export const fetchRecommendations = createApiCall(
	(celebName, contentType) =>
		axiosInstance.get('/recommendations', {
			params: { celebrity_name: celebName, content_type: contentType },
		}),
	'추천 정보를 가져오는데 실패했습니다:'
);

export const fetchContentTypeNumber = createApiCall(
	() => axiosInstance.get('/recommendations/number'),
	'컨텐츠 타입별 개수정보를 가져오는데 실패했습니다:'
);
