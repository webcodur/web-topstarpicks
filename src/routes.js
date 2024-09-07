import React from 'react';
import Home from 'pages/Home';
import Login from 'pages/Login';
import Recommend from 'pages/Recommend';
import ContentPage from 'pages/ContentPage';

export const routes = [
	{ path: '/', element: <Home /> },
	{ path: '/login', element: <Login /> },
	{ path: '/:jobCategory', element: <Recommend /> },
	{ path: '/:jobCategory/:personName/:contentType', element: <ContentPage /> },
];
