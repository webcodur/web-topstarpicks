// api/apiUtils.js

import axios from 'axios';

export const axiosInstance = axios.create({
	baseURL: process.env.REACT_APP_API_BASE_URL,
	timeout: 30000, // 타임아웃 설정
});

export const handleApiError = (error) => {
	// 서버가 2xx 범위를 벗어나는 상태 코드로 응답
	if (error.response) {
		throw new Error(
			`API 요청 실패. 상태: ${error.response.status}, 응답: ${error.response.data}`
		);
	} // 요청이 이루어졌으나 응답을 받지 못함
	else if (error.request) {
		throw new Error('서버로부터 응답을 받지 못했습니다.');
	}
	// 요청 설정 중에 문제 발생
	else {
		throw new Error('요청 설정 중 오류가 발생했습니다: ' + error.message);
	}
};

export const createApiCall =
	(apiCall, errorMessage, funcParams = null) =>
	async (...args) => {
		if (funcParams) {
			console.log(`호출 API 정보: ${funcParams}`);
		}
		try {
			const response = await apiCall(...args);
			return response.data.data;
		} catch (error) {
			console.error(errorMessage, error);
			handleApiError(error);
		}
	};
