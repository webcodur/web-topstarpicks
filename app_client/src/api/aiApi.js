import { axiosInstance, createApiCall } from './apiUtils';

export const openaiModelCheck = async () => {
	const result = await axiosInstance.get('/ai', {});
	return result;
};

export const openaiChatTest = createApiCall(
	(testText) => axiosInstance.post('/ai/chat', { testText }),
	'chat test 실패:',
	'openaiChatTest'
);

// 영향력 평가
export const assessInfluence = createApiCall(
	(name, otherDesc) =>
		axiosInstance.post('/ai/assess-influence', { name, otherDesc }),
	'인물 영향력 평가에 실패했습니다:',
	'assessInfluence'
);
