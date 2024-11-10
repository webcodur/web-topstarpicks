// import { Navigate } from 'react-router-dom';
import People from 'view/people/People';
import Content from 'pages/Content';
import Home from 'pages/Home';
import Admin from 'pages/Admin';
import About from 'pages/About';
import Guide from 'pages/Guide';
import Games from 'view/games/Games';
import GameManual from 'view/games/pages/GameManual';
import GameSettings from 'view/games/pages/GameSettings';
import GamePlay from 'view/games/pages/GamePlay';

export const routes = [
	// 메인 페이지
	{
		path: '/',
		element: <Home />,
	},
	{
		path: '/people',
		element: <People />,
	},
	{
		path: '/people/history',
		element: <People />,
	},
	{
		path: '/people/legend',
		element: <People />,
	},
	{
		path: '/people/myth',
		element: <People />,
	},

	// 상세 페이지: 컨텐츠 페이지
	{ path: '/:personName/:contentName', element: <Content /> },

	// 게임 관련 라우트
	{ path: '/games', element: <Games /> },
	{ path: '/games/play', element: <GamePlay /> },
	{ path: '/games/manual', element: <GameManual /> },
	{ path: '/games/settings', element: <GameSettings /> },

	// 서비스 페이지
	{ path: '/about', element: <About /> },
	{ path: '/guide', element: <Guide /> },

	// 관리자 페이지
	{
		path: '/admin',
		element: <Admin />,
	},
];
