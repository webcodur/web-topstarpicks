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
		{ subject: '정치외교', score: person.political || 0, fullMark: 10 },
		{ subject: '전략안보', score: person.strategic || 0, fullMark: 10 },
		{ subject: '기술과학', score: person.tech || 0, fullMark: 10 },
		{ subject: '사회윤리', score: person.social || 0, fullMark: 10 },
		{ subject: '산업경제', score: person.economic || 0, fullMark: 10 },
		{ subject: '문화예술', score: person.cultural || 0, fullMark: 10 },
	];

	return (
		<Box sx={{ height: 300, width: '100%' }}>
			<ResponsiveContainer width="100%" height="100%">
				<RadarChart cx="50%" cy="50%" outerRadius="70%" data={radarData}>
					<PolarGrid />
					<PolarAngleAxis
						dataKey="subject"
						tick={{ fontSize: 12, fill: '#333' }}
					/>
					<PolarRadiusAxis angle={30} domain={[0, 10]} />
					<Radar
						name="점수"
						dataKey="score"
						stroke="#FFA500"
						fill="#FFA500"
						fillOpacity={0.6}
					/>
					<Tooltip />
					<Legend />
				</RadarChart>
			</ResponsiveContainer>
		</Box>
	);
};

export default RadarChartComponent;
