import React from 'react';
import { Typography, Box, Grid } from '@mui/material';
import RadarChart from './RadarChart';
import BarChart from './BarChart';
import ScoreSummary from './ScoreSummary';
import { calculateGrade } from './scoreUtils';

const ScoreModal = ({ person }) => {
	if (!person) return null;
	const totalScore = person.total_score;
	const grade = calculateGrade(totalScore);

	return (
		<Box sx={{ width: '100%', maxWidth: 400, margin: 'auto' }}>
			<Typography
				variant="h6"
				component="h2"
				gutterBottom
				align="center"
				style={{ fontWeight: 'bold' }}>
				{person.name}의 영향력 스펙트럼
			</Typography>

			<Grid container spacing={2}>
				<Grid item xs={12}>
					<RadarChart person={person} />
				</Grid>
				<Grid item xs={12}>
					<BarChart transhistoricity={person.transhistoricity} />
				</Grid>
				<Grid item xs={12}>
					{totalScore && (
						<ScoreSummary
							person={person}
							totalScore={totalScore}
							grade={grade}
						/>
					)}
				</Grid>
			</Grid>
		</Box>
	);
};

export default ScoreModal;
