import React from 'react';
import { Typography, Box } from '@mui/material';

const ScoreSummary = ({ totalScore, grade }) => {
	return (
		<Box
			sx={{
				display: 'flex',
				flexDirection: 'column',
				alignItems: 'center',
				mt: 2,
			}}>
			<Typography variant="h6" sx={{ mt: 2 }}>
				총점: {totalScore}/100, {grade}등급
			</Typography>
		</Box>
	);
};

export default ScoreSummary;
