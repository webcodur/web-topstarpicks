import { axiosInstance, createApiCall } from './apiUtils';

export const fetchProfessions = async () => {
	try {
		const response = await axiosInstance.get('/profession');
		console.log('Profession API Response:', response);
		return response;
	} catch (error) {
		console.error('Profession API Error:', error);
		throw error;
	}
};

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
