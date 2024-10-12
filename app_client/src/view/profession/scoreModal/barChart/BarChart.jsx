import React from 'react';
import { Box, Typography } from '@mui/material';
import {
	BarChart,
	Bar,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
	ResponsiveContainer,
} from 'recharts';
import { prepareBarData } from './barDataUtils';
import { barChartStyles } from './barChartStyles';

const BarChartComponent = ({ transhistoricity }) => {
	const barData = prepareBarData(transhistoricity);

	return (
		<Box sx={barChartStyles.container}>
			<Typography align="center" gutterBottom>
				통시성 점수 (max 40)
			</Typography>
			<ResponsiveContainer width="100%" height={250}>
				<BarChart
					data={barData}
					margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
					<CartesianGrid strokeDasharray="3 3" />
					<XAxis
						dataKey="name"
						tick={barChartStyles.axisLabel}
						interval={0}
						width={100}
					/>
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
					<Bar dataKey="score" name="통시성" {...barChartStyles.bar} />
				</BarChart>
			</ResponsiveContainer>
			<Typography variant="body2" align="center" sx={{ mt: 2 }}>
				총점: {transhistoricity}/100
			</Typography>
		</Box>
	);
};

export default BarChartComponent;
