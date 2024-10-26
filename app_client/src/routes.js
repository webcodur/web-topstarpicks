// import { Navigate } from 'react-router-dom';
import People from 'view/people/People';
// import Login from 'pages/Login';
import Content from 'pages/Content';
import Admin from 'pages/Admin';
import About from 'pages/About';
import Guide from 'pages/Guide';
// import Gallery from 'pages/Gallery';
import Games from 'pages/Games';

export const routes = [
	// 메인 페이지
	{
		path: '/',
		element: <People />,
	},
	// 상세 페이지: 컨텐츠 페이지
	{ path: '/:personName/:contentName', element: <Content /> },
	// { path: '/:gallery', element: <People /> },
	{ path: '/games', element: <Games /> },

	// 서비스 페이지
	// { path: '/login', element: <Login /> },
	{ path: '/about', element: <About /> },
	{ path: '/guide', element: <Guide /> },

	// 관리자 페이지
	{
		path: '/admin',
		element: <Admin />,
	},
];
