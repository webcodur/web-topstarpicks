import React from 'react';
import HomeIcon from '@mui/icons-material/Home';
import InfoIcon from '@mui/icons-material/Info';
import ArticleIcon from '@mui/icons-material/Article';
import ScienceIcon from '@mui/icons-material/Science';

export const getMenuItems = (isLoggedIn) => [
	{ text: '홈', path: '/', icon: <HomeIcon /> },
	{ text: '소개', path: '/about', icon: <InfoIcon /> },
	{ text: '게시글 (CACHE)', path: '/articles', icon: <ArticleIcon /> },
	{ text: '게시글 (REACT-QUERY)', path: '/articles2', icon: <ArticleIcon /> },
	{ text: 'Test', path: '/dummy', icon: <ScienceIcon /> },
];
