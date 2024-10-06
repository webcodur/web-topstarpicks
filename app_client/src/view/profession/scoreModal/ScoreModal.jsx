import React from 'react';
import { Typography, Box, Grid } from '@mui/material';
import RadarChartComponent from './RadarChartComponent';
import BarChartComponent from './BarChartComponent';
import ScoreSummary from './ScoreSummary';
import { calculateGrade } from './scoreUtils';

const ScoreModal = ({ person }) => {
	const totalScore = person.total_score;
	const grade = calculateGrade(totalScore);

	return (
		<Box sx={{ width: '100%', maxWidth: 800, margin: 'auto' }}>
			<Typography
				variant="h6"
				component="h2"
				gutterBottom
				align="center"
				style={{ fontWeight: 'bold' }}>
				{person.name}의 영향력 지표
			</Typography>

			<Grid container spacing={2}>
				<Grid item xs={12}>
					<RadarChartComponent person={person} />
				</Grid>
				<Grid item xs={12}>
					<BarChartComponent transhistoricity={person.transhistoricity} />
				</Grid>
				<Grid item xs={12}>
					<ScoreSummary person={person} totalScore={totalScore} grade={grade} />
				</Grid>
			</Grid>
		</Box>
	);
};

export default ScoreModal;