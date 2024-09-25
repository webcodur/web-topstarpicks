import { axiosInstance, createApiCall } from './apiUtils';

export const fetchCelebrities = createApiCall(
	(profession = 'all') =>
		axiosInstance.get('/celebrities', {
			params: profession !== 'all' ? { profession } : {},
		}),
	'전체 인물 정보를 가져오는데 실패했습니다:'
);

export const fetchPersonInfo = createApiCall(
	(celebName) =>
		axiosInstance.get('/celebrities/name', {
			params: { name: celebName },
		}),
	'개별 인물 정보를 가져오는데 실패했습니다:'
);

// Admin 관련 API 호출 추가
export const fetchAllCelebrities = createApiCall(
	() => axiosInstance.get('/celebrities/all'),
	'모든 유명인사 정보를 가져오는데 실패했습니다:'
);

export const createCelebrity = createApiCall(
	(celebrityData) => axiosInstance.post('/celebrities', celebrityData),
	'유명인사 정보 생성에 실패했습니다:'
);

export const updateCelebrity = createApiCall(
	(id, celebrityData) => axiosInstance.put(`/celebrities/${id}`, celebrityData),
	'유명인사 정보 수정에 실패했습니다:'
);

export const deleteCelebrity = createApiCall(
	(id) => axiosInstance.delete(`/celebrities/${id}`),
	'유명인사 정보 삭제에 실패했습니다:'
);
