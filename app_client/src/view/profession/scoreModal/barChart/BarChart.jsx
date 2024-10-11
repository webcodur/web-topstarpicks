import React from 'react';
import { Box } from '@mui/material';
import {
	BarChart,
	Bar,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
	Legend,
	ResponsiveContainer,
} from 'recharts';
import { prepareBarData } from './barDataUtils';
import { barChartStyles } from './barChartStyles';

const BarChartComponent = ({ transhistoricity }) => {
	const barData = prepareBarData(transhistoricity);

	return (
		<Box sx={barChartStyles.container}>
			<ResponsiveContainer width="100%" height="100%">
				<BarChart
					data={barData}
					margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
					<CartesianGrid strokeDasharray="3 3" />
					<XAxis dataKey="name" tick={barChartStyles.axisLabel} />
					<YAxis
						type="number"
						domain={[0, 40]}
						ticks={[0, 10, 20, 30, 40]}
						tick={barChartStyles.axisLabel}
					/>
					<Tooltip
						contentStyle={{
							backgroundColor: 'rgba(255, 255, 255, 0.8)',
							borderRadius: '5px',
						}}
					/>
					<Legend wrapperStyle={{ fontSize: '16px' }} />
					<Bar dataKey="score" name="통시성 (max 40)" {...barChartStyles.bar} />
				</BarChart>
			</ResponsiveContainer>
		</Box>
	);
};

export default BarChartComponent;
