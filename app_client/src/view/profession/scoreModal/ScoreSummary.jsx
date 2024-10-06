import React from 'react';
import { Typography, Box, Grid } from '@mui/material';

const ScoreSummary = ({ person, totalScore, grade }) => {
	const categories = [
		{ key: 'political', label: '정치외교' },
		{ key: 'strategic', label: '전략안보' },
		{ key: 'tech', label: '기술과학' },
		{ key: 'social', label: '사회윤리' },
		{ key: 'economic', label: '산업경제' },
		{ key: 'cultural', label: '문화예술' },
		{ key: 'transhistoricity', label: '통시성' },
	];

	return (
		<Box
			sx={{
				display: 'flex',
				flexDirection: 'column',
				alignItems: 'center',
				mt: 2,
			}}>
			<Typography variant="h6" gutterBottom>
				개별 항목 점수 (각 10점 만점)
			</Typography>
			<Grid container spacing={2} justifyContent="center">
				{categories.map(({ key, label }) => (
					<Grid item xs={6} sm={4} key={key}>
						<Typography variant="body1">
							{label}: {person[key] || 0}
						</Typography>
					</Grid>
				))}
			</Grid>
			<Typography variant="h6" sx={{ mt: 2 }}>
				총점: {totalScore}/100, 등급: {grade}
			</Typography>
		</Box>
	);
};

export default ScoreSummary;
