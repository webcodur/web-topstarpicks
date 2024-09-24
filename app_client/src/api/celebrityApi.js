// api/celebrityApi.js

import { axiosInstance, createApiCall } from './apiUtils';

export const fetchCelebrities = createApiCall(
	(profession = 'all') =>
		axiosInstance.get('/celebrities', {
			params: profession !== 'all' ? { profession } : {},
		}),
	'인물 정보를 가져오는데 실패했습니다:'
);

export const fetchPersonInfo = createApiCall(
	(celebName) =>
		axiosInstance.get('/celebrities/name', {
			params: { name: celebName },
		}),
	'인물 정보를 가져오는데 실패했습니다:'
);
