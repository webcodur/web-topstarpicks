import { axiosInstance, createApiCall } from './apiUtils';

export const assessInfluence = createApiCall(
	(name) => axiosInstance.post('/ai/assess-influence', { name }),
	'인물 영향력 평가에 실패했습니다:',
	'assessInfluence'
);
