import Home from 'pages/Home';
import Login from 'pages/Login';
import Jobs from 'pages/jobs';
import Content from 'pages/Content';

export const routes = [
	{ path: '/', element: <Home /> },
	{ path: '/login', element: <Login /> },
	{ path: '/:jobs', element: <Jobs /> },
	{ path: '/:jobs/:personName/:contentType', element: <Content /> },
];
