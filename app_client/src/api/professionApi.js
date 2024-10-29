import { axiosInstance, createApiCall } from './apiUtils';

export const fetchProfessions = createApiCall(
	() => axiosInstance.get('/profession'),
	'직군 정보를 가져오는데 실패했습니다:'
);

export const createProfession = createApiCall(
	(professionData) => axiosInstance.post('/profession', professionData),
	'직군 생성에 실패했습니다:'
);

export const updateProfession = createApiCall(
	(id, professionData) =>
		axiosInstance.put(`/profession/${id}`, professionData),
	'직군 수정에 실패했습니다:'
);

export const deleteProfession = createApiCall(
	(id) => axiosInstance.delete(`/profession/${id}`),
	'직군 삭제에 실패했습니다:'
);
