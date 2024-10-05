import { Navigate } from 'react-router-dom';
import Login from 'pages/Login';
import Profession from 'pages/Profession';
import Content from 'pages/Content';
import Admin from 'pages/Admin';
import Labs from 'pages/Labs';

export const routes = [
	{ path: '/', element: <Navigate to="/전체" /> },

	{ path: '/login', element: <Login /> },

	{ path: '/labs', element: <Labs /> },
	{
		path: '/admin',
		element: <Admin />,
	},
	{
		path: '/:profession',
		element: <Profession />,
	},

	{ path: '/:profession/:personName/:contentName', element: <Content /> },
];
