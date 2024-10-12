import React from 'react';
import { Box, Tooltip, Typography } from '@mui/material';
import {
	Radar,
	RadarChart,
	PolarGrid,
	PolarAngleAxis,
	PolarRadiusAxis,
	ResponsiveContainer,
	Tooltip as RechartsTooltip,
	Legend,
} from 'recharts';
import { prepareRadarData } from './radarDataUtils';
import { radarChartStyles } from './radarChartStyles';
import PublicIcon from '@mui/icons-material/Public';
import SecurityIcon from '@mui/icons-material/Security';
import ScienceIcon from '@mui/icons-material/Science';
import PeopleIcon from '@mui/icons-material/People';
import BusinessIcon from '@mui/icons-material/Business';
import PaletteIcon from '@mui/icons-material/Palette';

const RadarChartComponent = ({ person }) => {
	const radarData = prepareRadarData(person);

	const categories1 = [
		{ name: '문화·예술', value: person.cultural_exp, icon: <PaletteIcon /> },
		{ name: '정치·외교', value: person.political_exp, icon: <PublicIcon /> },
		{ name: '전략·안보', value: person.strategic_exp, icon: <SecurityIcon /> },
	];

	const categories2 = [
		{ name: '산업·경제', value: person.economic_exp, icon: <BusinessIcon /> },
		{ name: '사회·윤리', value: person.social_exp, icon: <PeopleIcon /> },
		{ name: '기술·과학', value: person.tech_exp, icon: <ScienceIcon /> },
	];

	return (
		<Box sx={radarChartStyles.container}>
			<Box
				sx={{
					display: 'flex',
					flexDirection: 'row',
					alignItems: 'center',
					justifyContent: 'center',
					gap: '15px',
				}}>
				{categories1.map((category, index) => (
					<Tooltip
						key={index}
						title={<Typography fontSize="1rem">{category.value}</Typography>}
						arrow>
						<Box
							sx={{
								display: 'flex',
								flexDirection: 'column',
								alignItems: 'center',
								justifyContent: 'center',
								border: '1px solid #ddd',
								borderRadius: '8px',
								padding: '6px',
								boxSizing: 'border-box',
							}}>
							{React.cloneElement(category.icon, { fontSize: 'small' })}
							<Typography
								variant="body2"
								sx={{ mt: 0.5, textAlign: 'center', fontSize: '0.75rem' }}>
								{category.name}
							</Typography>
						</Box>
					</Tooltip>
				))}
			</Box>

			<Box sx={{ width: '100%', height: 300 }}>
				<ResponsiveContainer width="100%" height="100%">
					<RadarChart cx="50%" cy="50%" outerRadius="50%" data={radarData}>
						<PolarGrid gridType="polygon" />
						<PolarAngleAxis dataKey="subject" tick={radarChartStyles.tick} />
						<PolarRadiusAxis
							angle={30}
							domain={[0, 10]}
							tick={radarChartStyles.tick}
						/>
						<Radar
							name="분야별 영향력"
							dataKey="score"
							{...radarChartStyles.radar}
						/>
						<RechartsTooltip
							contentStyle={{
								backgroundColor: 'rgba(255, 255, 255, 0.8)',
								borderRadius: '5px',
							}}
						/>
						<Legend wrapperStyle={{ fontSize: '16px' }} />
					</RadarChart>
				</ResponsiveContainer>
			</Box>

			<Box
				sx={{
					display: 'flex',
					flexDirection: 'row',
					alignItems: 'center',
					justifyContent: 'center',
					gap: '15px',
				}}>
				{categories2.map((category, index) => (
					<Tooltip
						key={index}
						title={<Typography fontSize="1rem">{category.value}</Typography>}
						arrow>
						<Box
							sx={{
								display: 'flex',
								flexDirection: 'column',
								alignItems: 'center',
								justifyContent: 'center',
								border: '1px solid #ddd',
								borderRadius: '8px',
								padding: '6px',
								boxSizing: 'border-box',
							}}>
							{React.cloneElement(category.icon, { fontSize: 'small' })}
							<Typography
								variant="body2"
								sx={{ mt: 0.5, textAlign: 'center', fontSize: '0.75rem' }}>
								{category.name}
							</Typography>
						</Box>
					</Tooltip>
				))}
			</Box>
		</Box>
	);
};

export default RadarChartComponent;
