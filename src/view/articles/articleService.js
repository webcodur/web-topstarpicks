import axios from 'axios';

const API_URL = 'https://66cfd3e9181d059277dc6666.mockapi.io/api';

const axiosConfig = {
	baseURL: API_URL,
	timeout: 5000,
	headers: {
		'Content-Type': 'application/json',
	},
};

const apiClient = axios.create(axiosConfig);

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

// 세션 스토리지 기반 캐시 구현
const CACHE_DURATION = 5 * 60 * 1000; // 캐시 유효 기간: 5분

const cacheManager = {
	set: (key, value) => {
		const item = {
			data: value,
			timestamp: Date.now(),
		};
		sessionStorage.setItem(key, JSON.stringify(item));
	},
	get: (key) => {
		const item = sessionStorage.getItem(key);
		if (!item) return null;

		const { data, timestamp } = JSON.parse(item);
		const age = Date.now() - timestamp;
		if (age > CACHE_DURATION) {
			sessionStorage.removeItem(key);
			return null;
		}

		return data;
	},
	clear: () => sessionStorage.clear(),
	delete: (key) => sessionStorage.removeItem(key),
};

export const articleService = {
	getAll: async (page = 1, limit = 5) => {
		const cacheKey = `articles_${page}_${limit}`;

		const cachedData = cacheManager.get(cacheKey);
		if (cachedData) {
			console.log('캐시된 데이터 사용:', cacheKey);
			return cachedData;
		}

		try {
			const response = await apiClient.get('/articles', {
				params: { page, limit, sortBy: 'createdAt', order: 'desc' },
			});

			cacheManager.set(cacheKey, response.data);

			return response.data;
		} catch (error) {
			console.error('게시글 목록 조회 오류:', error);
			throw error;
		}
	},

	getById: async (id) => {
		const cacheKey = `article_${id}`;

		const cachedData = cacheManager.get(cacheKey);
		if (cachedData) {
			console.log('캐시된 게시글 데이터 사용:', cacheKey);
			return cachedData;
		}

		try {
			const response = await apiClient.get(`/articles/${id}`);
			cacheManager.set(cacheKey, response.data);
			return response.data;
		} catch (error) {
			console.error(`ID ${id}인 게시글 조회 오류:`, error);
			throw error;
		}
	},

	create: async (article) => {
		try {
			const response = await apiClient.post('/articles', article);
			cacheManager.clear(); // 캐시 초기화
			return response.data;
		} catch (error) {
			console.error('게시글 작성 오류:', error);
			throw error;
		}
	},

	update: async (id, article) => {
		try {
			const response = await apiClient.put(`/articles/${id}`, article);
			cacheManager.clear(); // 캐시 초기화
			return response.data;
		} catch (error) {
			console.error(`ID ${id}인 게시글 수정 오류:`, error);
			throw error;
		}
	},

	delete: async (id) => {
		try {
			await apiClient.delete(`/articles/${id}`);
			cacheManager.clear(); // 캐시 초기화
		} catch (error) {
			console.error(`ID ${id}인 게시글 삭제 오류:`, error);
			throw error;
		}
	},

	// 캐시 수동 갱신 함수
	refreshCache: async (id) => {
		try {
			const response = await apiClient.get(`/articles/${id}`);
			cacheManager.set(`article_${id}`, response.data);
			console.log(`ID ${id} 게시글 캐시 갱신 완료`);
		} catch (error) {
			console.error(`ID ${id} 게시글 캐시 갱신 실패:`, error);
		}
	},
};

export default articleService;
