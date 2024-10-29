import { lazy } from 'react';

export const adminSections = [
	{
		id: 'celeb',
		title: '셀럽 관리자',
		component: lazy(() => import('../manager/celeb/Celeb')),
	},
	{
		id: 'recommendation',
		title: '추천정보 관리자',
		component: lazy(() => import('../manager/recs/Recs')),
	},
	{
		id: 'newCeleb',
		title: '새 셀럽 추가',
		component: lazy(() => import('../manager/celeb/NewCelebForm')),
	},
	{
		id: 'newRecs',
		title: '새 추천정보 추가',
		component: lazy(() => import('../manager/recs/NewRecsForm')),
	},
	{
		id: 'crawling',
		title: '추천정보 크롤링',
		component: lazy(() => import('../Crawling')),
	},
	{
		id: 'influence',
		title: '영향력 지표 생성기',
		component: lazy(() => import('../manager/Influence')),
	},
	{
		id: 'openaiApiCheck',
		title: 'OpenAI API 확인',
		component: lazy(() => import('../manager/OpenaiApiCheck')),
	},
	{
		id: 'animater',
		title: 'animater 확인',
		component: lazy(() => import('components/ui/AnimationTest')),
	},
];
