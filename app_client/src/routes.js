import { Navigate } from 'react-router-dom';
import Login from 'pages/Login';
import Profession from 'pages/Profession';
import Content from 'pages/Content';

export const routes = [
	{ path: '/', element: <Navigate to="/all" /> },
	{ path: '/login', element: <Login /> },
	{
		path: '/:profession',
		element: <Profession />,
	},
	{ path: '/:profession/:personName/:contentType', element: <Content /> },
];
