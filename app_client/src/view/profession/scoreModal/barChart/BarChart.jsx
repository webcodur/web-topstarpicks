import React from 'react';
import { Box, Typography, useTheme, Tooltip } from '@mui/material';
import {
	BarChart,
	Bar,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip as RechartsTooltip,
	ResponsiveContainer,
	LabelList,
} from 'recharts';
import { prepareBarData, getTranshistoricityDescription } from './barDataUtils';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import InfoIcon from '@mui/icons-material/Info';

const ImprovedBarChartComponent = ({ transhistoricity }) => {
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
			display: 'flex',
			alignItems: 'center',
			justifyContent: 'center',
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
			right: 30,
			left: 20,
			bottom: 5,
		},
		tooltip: {
			backgroundColor: theme.palette.background.paper,
			border: `1px solid ${theme.palette.divider}`,
			borderRadius: theme.shape.borderRadius,
			boxShadow: theme.shadows[3],
		},
		score: {
			marginTop: theme.spacing(2),
			fontWeight: 'bold',
		},
	};

	const CustomTooltip = ({ active, payload }) => {
		if (active && payload && payload.length) {
			return (
				<Box sx={chartStyles.tooltip}>
					<Typography variant="body2">
						{getTranshistoricityDescription(payload[0].value)}
					</Typography>
				</Box>
			);
		}
		return null;
	};

	return (
		<Box sx={chartStyles.container}>
			<Box sx={chartStyles.title}>
				<Typography variant="h6" align="center">
					통시성 점수{' '}
				</Typography>
				<AccessTimeIcon sx={{ color: theme.palette.primary.main, ml: 1 }} />
				<Tooltip title="시대를 넘어서며 세상에 영향을 준 정도" arrow>
					<InfoIcon sx={{ color: theme.palette.primary.main, ml: 1 }} />
				</Tooltip>
			</Box>
			<ResponsiveContainer width="100%" height={300}>
				<BarChart data={barData} margin={chartStyles.chartMargin}>
					<CartesianGrid strokeDasharray="3 3" stroke={theme.palette.divider} />
					<XAxis dataKey="name" tick={chartStyles.axisLabel} />
					<YAxis
						type="number"
						domain={[0, 40]}
						ticks={[0, 10, 20, 30, 40]}
						tick={chartStyles.axisLabel}
					/>
					<RechartsTooltip content={<CustomTooltip />} />
					<Bar dataKey="score" name="통시성" {...chartStyles.bar}>
						<LabelList
							dataKey="score"
							position="top"
							fill={theme.palette.text.primary}
						/>
					</Bar>
				</BarChart>
			</ResponsiveContainer>
			<Typography variant="body2" align="center" sx={chartStyles.description}>
				{getTranshistoricityDescription(transhistoricity)}
			</Typography>
		</Box>
	);
};

export default ImprovedBarChartComponent;
