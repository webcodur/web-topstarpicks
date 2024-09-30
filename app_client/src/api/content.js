import { axiosInstance, createApiCall } from './apiUtils';

export const fetchContent = createApiCall(
	() => axiosInstance.get('/content', {}),
	'content 정보를 가져오는데 실패했습니다:'
);
