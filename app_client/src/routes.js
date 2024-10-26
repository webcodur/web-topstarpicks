import { Navigate } from 'react-router-dom';
import Login from 'pages/Login';
import Profession from 'pages/Profession';
import Content from 'pages/Content';
import Admin from 'pages/Admin';
import About from 'pages/About';
import Guide from 'pages/Guide';
// import Gallery from 'pages/Gallery';
import Games from 'pages/Games';

export const routes = [
	// 메인 페이지
	{ path: '/', element: <Navigate to="/전체" /> },
	{
		path: '/:profession',
		element: <Profession />,
	},
	{ path: '/:profession/:personName/:contentName', element: <Content /> },

	// { path: '/:recommendation', element: <People /> },
	// { path: '/:gallery', element: <People /> },
	{ path: '/games', element: <Games /> },

	// 서비스 페이지
	{ path: '/login', element: <Login /> },
	{ path: '/about', element: <About /> },
	{ path: '/guide', element: <Guide /> },

	// 관리자 페이지
	{
		path: '/admin',
		element: <Admin />,
	},
];
