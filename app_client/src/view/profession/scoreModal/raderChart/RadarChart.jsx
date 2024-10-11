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
				<RadarChart cx="50%" cy="50%" outerRadius="70%" data={radarData}>
					<PolarGrid gridType="polygon" />
					<PolarAngleAxis dataKey="subject" tick={radarChartStyles.tick} />
					<PolarRadiusAxis
						angle={30}
						domain={[0, 10]}
						tick={radarChartStyles.tick}
					/>
					<Radar
						name="영향력 육각형 (max 60)"
						dataKey="score"
						{...radarChartStyles.radar}
					/>
					<Tooltip
						contentStyle={{
							backgroundColor: 'rgba(255, 255, 255, 0.8)',
							borderRadius: '5px',
						}}
					/>
					<Legend wrapperStyle={{ fontSize: '16px' }} />
				</RadarChart>
			</ResponsiveContainer>
		</Box>
	);
};

export default RadarChartComponent;
