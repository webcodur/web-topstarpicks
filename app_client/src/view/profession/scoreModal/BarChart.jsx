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

const BarChartComponent = ({ transhistoricity }) => {
	const barData = [{ name: '통시성', score: transhistoricity || 0 }];

	return (
		<Box
			sx={{
				height: 200,
				width: '100%',
				display: 'flex',
				justifyContent: 'center',
			}}>
			<ResponsiveContainer width="100%" height="100%">
				<BarChart
					data={barData}
					margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
					<CartesianGrid strokeDasharray="3 3" />
					<XAxis
						dataKey="name"
						type="category"
						tickLine={true}
						axisLine={true}
					/>
					<YAxis type="number" domain={[0, 40]} ticks={[0, 10, 20, 30, 40]} />
					<Tooltip />
					<Legend />
					<Bar
						dataKey="score"
						fill="#82ca9d"
						name="통시성 (max 40)"
						maxBarSize={30}
					/>
				</BarChart>
			</ResponsiveContainer>
		</Box>
	);
};

export default BarChartComponent;
