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

const RadarChartComponent = ({ person }) => {
	const radarData = [
		{
			subject: `정치·외교 (${person.political})`,
			score: person.political || 0,
			fullMark: 10,
		},
		{
			subject: `전략·안보 (${person.strategic})`,
			score: person.strategic || 0,
			fullMark: 10,
		},
		{
			subject: `기술·과학 (${person.tech})`,
			score: person.tech || 0,
			fullMark: 10,
		},
		{
			subject: `사회·윤리 (${person.social})`,
			score: person.social || 0,
			fullMark: 10,
		},
		{
			subject: `산업·경제 (${person.economic})`,
			score: person.economic || 0,
			fullMark: 10,
		},
		{
			subject: `문화·예술 (${person.cultural})`,
			score: person.cultural || 0,
			fullMark: 10,
		},
	];

	return (
		<Box sx={{ height: 300, width: '100%' }}>
			<ResponsiveContainer width="100%" height="100%">
				<RadarChart cx="50%" cy="50%" outerRadius="70%" data={radarData}>
					<PolarGrid />
					<PolarAngleAxis
						dataKey="subject"
						tick={{ fontSize: 15, fill: '#333' }}
					/>
					<PolarRadiusAxis angle={30} domain={[0, 10]} />
					<Radar
						name="영향력 육각형 (max 60)"
						dataKey="score"
						stroke="#FFA500"
						fill="#FFA500"
						fillOpacity={0.7}
					/>
					<Tooltip />
					<Legend />
				</RadarChart>
			</ResponsiveContainer>
		</Box>
	);
};

export default RadarChartComponent;
