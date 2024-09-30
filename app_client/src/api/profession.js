import { axiosInstance, createApiCall } from './apiUtils';

export const fetchProfession = createApiCall(
	() => axiosInstance.get('/profession', {}),
	'profession 정보를 가져오는데 실패했습니다:'
);
