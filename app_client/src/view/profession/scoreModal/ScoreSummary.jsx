import React from 'react';
import { Typography, Box } from '@mui/material';

const ScoreSummary = ({ person, totalScore, grade }) => {
	// const categoriesDetail = [
	// 	{ label: '정치·외교', key: 'political' },
	// 	{ label: '전략·안보', key: 'strategic' },
	// 	{ label: '기술·과학', key: 'tech' },
	// 	{ label: '사회·윤리', key: 'social' },
	// 	{ label: '산업·경제', key: 'economic' },
	// 	{ label: '문화·예술', key: 'cultural' },
	// ];

	return (
		<Box
			sx={{
				display: 'flex',
				flexDirection: 'column',
				alignItems: 'center',
				mt: 2,
			}}>
			<Typography variant="h6" sx={{ mt: 2 }}>
				총점: {totalScore}/100, 등급: {grade}
			</Typography>
		</Box>
	);
};

export default ScoreSummary;
