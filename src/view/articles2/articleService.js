import axios from 'axios';

const API_URL = 'https://66cfd3e9181d059277dc6666.mockapi.io/api';

const apiClient = axios.create({
	baseURL: API_URL,
	timeout: 5000,
	headers: {
		'Content-Type': 'application/json',
	},
});

// 요청 인터셉터
apiClient.interceptors.request.use(
	(config) => {
		console.log('요청 시작:', config.url);
		const token = localStorage.getItem('authToken');
		if (token) {
			config.headers['Authorization'] = `Bearer ${token}`;
		}
		return config;
	},
	(error) => {
		console.error('요청 오류:', error);
		return Promise.reject(error);
	}
);

// 응답 인터셉터
apiClient.interceptors.response.use(
	(response) => {
		console.log('응답 완료:', response.config.url);
		return response;
	},
	(error) => {
		console.error('API 오류:', error);
		if (error.response && error.response.status === 401) {
			console.log('인증 실패. 로그아웃 처리가 필요합니다.');
			// 로그아웃 로직 구현
		}
		return Promise.reject(error);
	}
);

export const articleService = {
	getAll: async (page = 1, limit = 5) => {
		try {
			const response = await apiClient.get('/articles', {
				params: { page, limit, sortBy: 'createdAt', order: 'desc' },
			});
			return response.data;
		} catch (error) {
			console.error('게시글 목록 조회 오류:', error);
			throw error;
		}
	},

	getById: async (id) => {
		try {
			const response = await apiClient.get(`/articles/${id}`);
			return response.data;
		} catch (error) {
			console.error(`ID ${id}인 게시글 조회 오류:`, error);
			throw error;
		}
	},

	create: async (article) => {
		try {
			const response = await apiClient.post('/articles', article);
			return response.data;
		} catch (error) {
			console.error('게시글 작성 오류:', error);
			throw error;
		}
	},

	update: async ({ id, article }) => {
		try {
			const response = await apiClient.put(`/articles/${id}`, article);
			return response.data;
		} catch (error) {
			console.error(`ID ${id}인 게시글 수정 오류:`, error);
			throw error;
		}
	},

	delete: async (id) => {
		try {
			await apiClient.delete(`/articles/${id}`);
		} catch (error) {
			console.error(`ID ${id}인 게시글 삭제 오류:`, error);
			throw error;
		}
	},
};

export default articleService;
