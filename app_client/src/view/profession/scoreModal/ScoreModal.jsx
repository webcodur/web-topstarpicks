import React from 'react';
import { Modal, Tooltip, IconButton } from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
import RadarChart from './raderChart/RadarChart';
import BarChart from './barChart/BarChart';
import ScoreSummary from './ScoreSummary';
import { calculateGrade } from './scoreUtils';
import { ModalContent, FlexCenter, Title } from './ScoreModalStyles';

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
			<ModalContent>
				<FlexCenter>
					<Title id="score-modal-title" variant="h6" align="center">
						{person.name}의 영향력 점수
					</Title>
					<Tooltip
						title="영향력 스펙트럼은 chatGPT를 통해 인물별 영향력 지표를 시각화한 것입니다."
						arrow>
						<IconButton size="small">
							<InfoIcon />
						</IconButton>
					</Tooltip>
				</FlexCenter>

				<RadarChart person={person} />

				<div style={{ display: 'flex' }}>
					<BarChart transhistoricity={person.transhistoricity} />

					{totalScore && (
						<ScoreSummary
							person={person}
							totalScore={totalScore}
							grade={grade}
						/>
					)}
				</div>
			</ModalContent>
		</Modal>
	);
};

export default ScoreModal;
