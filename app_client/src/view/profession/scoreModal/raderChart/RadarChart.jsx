import React from 'react';
import { Box } from '@mui/material';
import {
	Radar,
	RadarChart,
	PolarGrid,
	PolarAngleAxis,
	PolarRadiusAxis,
	ResponsiveContainer,
	Tooltip,
	Legend,
} from 'recharts';
import { prepareRadarData } from './radarDataUtils';
import { radarChartStyles } from './radarChartStyles';

const RadarChartComponent = ({ person }) => {
	const radarData = prepareRadarData(person);

	return (
		<Box sx={radarChartStyles.container}>
			<ResponsiveContainer width="100%" height="100%">
				<RadarChart cx="50%" cy="50%" outerRadius="55%" data={radarData}>
					<PolarGrid />
					<PolarAngleAxis dataKey="subject" tick={radarChartStyles.tick} />
					<PolarRadiusAxis angle={30} domain={[0, 10]} />
					<Radar
						name="영향력 육각형 (max 60)"
						dataKey="score"
						{...radarChartStyles.radar}
					/>
					<Tooltip />
					<Legend />
				</RadarChart>
			</ResponsiveContainer>
		</Box>
	);
};

export default RadarChartComponent;
