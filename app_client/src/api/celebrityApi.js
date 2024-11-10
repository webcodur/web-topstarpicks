import { axiosInstance, createApiCall } from './apiUtils';

// 유명인사 직군별 데이터 조회
export const fetchCelebrities = createApiCall((params) => {
	const { profession, timesName, menuInfo, contentName } = params;
	return axiosInstance.get('/celebrities', {
		params: {
			profession: profession === '전체' ? 'all' : profession,
			era: timesName,
			menuType: menuInfo,
			contentName: contentName || '',
		},
	});
}, 'Failed to fetch celebrities');

// 유명인사 인물별 개인정보
export const fetchPersonInfo = createApiCall(
	(celebName) =>
		axiosInstance.get('/celebrities/name', {
			params: { name: celebName },
		}),
	'특정 인물 정보를 가져오는데 실패했습니다:'
);

//
export const fetchCelebrityNumbers = createApiCall(
	() => axiosInstance.get('/celebrities/profession-numbers'),
	'직군별 인원 수 정보를 가져오는데 실패했습니다:'
);

// Admin 관련 API 호출 추가
export const fetchAllCelebrities = createApiCall(
	() => axiosInstance.get('/celebrities/all'),
	'모든 유명인사 정보를 가져오는데 실패했습니다:'
);

export const createCelebrity = createApiCall(
	(celebrityData) => axiosInstance.post('/celebrities', celebrityData),
	'유명인사 정보 생성에 실패했습니다:',
	'createCelebrity'
);

export const updateCelebrity = createApiCall(
	(id, celebrityData) => axiosInstance.put(`/celebrities/${id}`, celebrityData),
	'유명인사 정보 수정에 실패했습니다:'
);

export const deleteCelebrity = createApiCall(
	(id) => axiosInstance.delete(`/celebrities/${id}`),
	'유명인사 정보 삭제에 실패했습니다:'
);

export const fetchInfluenceIndex = createApiCall(
	(testName) => axiosInstance.get(`/celebrities/influenceIndex/${testName}`),
	'influenceIndex 정보를 가져오는데 실패했습니다:'
);

export const searchCelebrities = createApiCall(
	(query) => axiosInstance.get('/celebrities/search', { params: { query } }),
	'유명인사 검색에 실패했습니다:'
);

// ID로 유명인사 정보 조회 - URL 패턴 변경
export const fetchCelebrityById = createApiCall(
	(id) => axiosInstance.get(`/celebrities/detail/${id}`),
	'유명인사 정보를 가져오는데 실패했습니다:'
);

export const fetchCelebrityInfoByGPT = createApiCall(
	(name, description = '') =>
		axiosInstance.post('/celebrities/gpt-info', { name, description }),
	'GPT 정보 조회에 실패했습니다:'
);
