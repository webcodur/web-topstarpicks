import React from 'react';
import { Box, Typography, useTheme } from '@mui/material';
import {
	BarChart,
	Bar,
	XAxis,
	YAxis,
	CartesianGrid,
	ResponsiveContainer,
	LabelList,
} from 'recharts';
import { prepareBarData } from './barDataUtils';

const BarChartComponent = ({ transhistoricity, exp }) => {
	const theme = useTheme();
	const barData = prepareBarData(transhistoricity);
	const chartStyles = {
		container: {
			border: `1px solid ${theme.palette.divider}`,
			borderRadius: theme.shape.borderRadius,
			padding: theme.spacing(2),
			backgroundColor: theme.palette.background.paper,
			boxShadow: theme.shadows[3],
		},
		title: {
			fontWeight: 'bold',
			marginBottom: theme.spacing(2),
			textAlign: 'center',
		},
		contentWrapper: {
			display: 'flex',
			gap: '25px',
		},
		chartContainer: {
			width: '50%',
			height: '300px',
			display: 'flex',
			flexDirection: 'column',
		},
		descriptionContainer: {
			width: '40%',
			display: 'flex',
			alignItems: 'center',
		},
		bar: {
			fill: theme.palette.primary.main,
		},
		axisLabel: {
			fontSize: 12,
			fill: theme.palette.text.secondary,
		},
		chartMargin: {
			top: 20,
			right: 20,
			left: 10,
			bottom: 5,
		},
	};

	return (
		<Box sx={chartStyles.container}>
			<Box sx={chartStyles.contentWrapper}>
				<Box sx={chartStyles.chartContainer}>
					<Typography variant="body2">
						<b>통시성:</b> 시대를 넘어 세상에 영향을 준 정도
					</Typography>
					<ResponsiveContainer width="100%" height="100%">
						<BarChart
							data={barData}
							margin={chartStyles.chartMargin}
							layout="horizontal">
							<CartesianGrid
								strokeDasharray="3 3"
								stroke={theme.palette.divider}
							/>
							<XAxis
								dataKey="name"
								tick={chartStyles.axisLabel}
								axisLine={{ stroke: theme.palette.text.secondary }}
								tickLine={{ stroke: theme.palette.text.secondary }}
							/>
							<YAxis
								type="number"
								domain={[0, 40]}
								ticks={[0, 10, 20, 30, 40]}
								tick={chartStyles.axisLabel}
								axisLine={{ stroke: theme.palette.text.secondary }}
								tickLine={{ stroke: theme.palette.text.secondary }}
							/>
							<Bar
								dataKey="score"
								name="통시성"
								{...chartStyles.bar}
								barSize={40}>
								<LabelList
									dataKey="score"
									position="insideRight"
									fill={theme.palette.background.paper}
									fontSize={12}
								/>
							</Bar>
						</BarChart>
					</ResponsiveContainer>
				</Box>
				<Box sx={chartStyles.descriptionContainer}>
					<Box sx={{ display: 'flex', flexDirection: 'column' }}>
						<Typography variant="body2">{exp}</Typography>
					</Box>
				</Box>
			</Box>
		</Box>
	);
};

export default BarChartComponent;
