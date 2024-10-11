import React from 'react';
import { Typography, Box, Grid, Modal } from '@mui/material';
import RadarChart from './raderChart/RadarChart';
import BarChart from './barChart/BarChart';
import ScoreSummary from './ScoreSummary';
import { calculateGrade } from './scoreUtils';

const ScoreModal = ({ person, open, onClose }) => {
	if (!person) return null;
	const totalScore = person.total_score;
	const grade = calculateGrade(totalScore);

	return (
		<Modal
			open={open}
			onClose={onClose}
			aria-labelledby="score-modal-title"
			aria-describedby="score-modal-description">
			<Box
				sx={{
					position: 'absolute',
					top: '50%',
					left: '50%',
					transform: 'translate(-50%, -50%)',
					width: '100%',
					maxWidth: 600, // Increased from 400
					bgcolor: 'background.paper',
					border: '2px solid #000',
					boxShadow: 24,
					p: 6, // Increased from 4
					borderRadius: '10px', // Added for smoother look
				}}>
				<Typography
					id="score-modal-title"
					variant="h4" // Changed from h5
					align="center"
					style={{ fontWeight: 'bold', marginBottom: '20px' }}>
					영향력 스펙트럼
				</Typography>

				<Typography
					variant="h5"
					align="center"
					style={{ fontWeight: 'bold', marginBottom: '30px' }}>
					- {person.name} -
				</Typography>

				<Grid container spacing={4}>
					{' '}
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
		</Modal>
	);
};

export default ScoreModal;
