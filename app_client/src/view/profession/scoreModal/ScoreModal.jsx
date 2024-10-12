import React, { useState } from 'react';
import {
	Modal,
	Tooltip,
	IconButton,
	Tabs,
	Tab,
	Typography,
	useMediaQuery,
	useTheme,
} from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
import RadarChart from './raderChart/RadarChart';
import BarChart from './barChart/BarChart';
import TotalScoreComponent from './totlaScore/TotalScoreComponent';
import { calculateGrade } from './scoreUtils';
import {
	ModalContent,
	FlexCenter,
	Title,
	ContentWrapper,
	TabPanel,
} from './ScoreModalStyles';

const ScoreModal = ({ person, open, onClose }) => {
	const [tabValue, setTabValue] = useState(0);
	const theme = useTheme();
	const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

	const categoryScore =
		person?.political +
		person?.strategic +
		person?.tech +
		person?.social +
		person?.cultural +
		person?.economic;

	if (!person) return null;
	const totalScore = person.total_score;
	const grade = calculateGrade(totalScore);
	person.grade = grade; // Add grade to person object for TotalScoreComponent

	const handleTabChange = (event, newValue) => {
		setTabValue(newValue);
	};

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
						title={
							<Typography fontSize="1rem">
								영향력 스펙트럼은 chatGPT를 통해 인물별 영향력 지표를 시각화한
								것입니다.
							</Typography>
						}
						arrow>
						<IconButton size="small">
							<InfoIcon color="primary" />
						</IconButton>
					</Tooltip>
				</FlexCenter>

				<div
					style={{
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center',
						flexDirection: 'column',
					}}>
					<Tabs
						value={tabValue}
						onChange={handleTabChange}
						centered
						variant={isMobile ? 'fullWidth' : 'standard'}>
						<Tab label={`분야별: ${categoryScore}`} />
						<Tab label={`통시성: ${person.transhistoricity}`} />
						<Tab label={`총점: ${person.total_score}`} />
					</Tabs>
				</div>

				<ContentWrapper>
					{/* 레이더 차트 */}
					<TabPanel value={tabValue} index={0}>
						<RadarChart person={person} />
					</TabPanel>
					{/* 바 차트*/}
					<TabPanel value={tabValue} index={1}>
						<BarChart
							transhistoricity={person.transhistoricity}
							exp={person.transhistoricity_exp}
						/>
					</TabPanel>
					{/* 총점 */}
					<TabPanel value={tabValue} index={2}>
						<TotalScoreComponent person={person} />
					</TabPanel>
				</ContentWrapper>
			</ModalContent>
		</Modal>
	);
};

export default ScoreModal;
