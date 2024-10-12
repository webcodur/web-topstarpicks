import React, { useState, useCallback } from 'react';
import {
	Box,
	Tooltip,
	Typography,
	useTheme,
	useMediaQuery,
} from '@mui/material';
import {
	Radar,
	RadarChart,
	PolarGrid,
	PolarAngleAxis,
	PolarRadiusAxis,
	ResponsiveContainer,
} from 'recharts';

import { categories } from './categoryData';

const ImprovedRadarChartComponent = ({ person }) => {
	const theme = useTheme();
	const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
	const [activeCategory, setActiveCategory] = useState(null);

	const chartStyles = {
		container: {
			border: `1px solid ${theme.palette.divider}`,
			borderRadius: theme.shape.borderRadius,
			margin: theme.spacing(1),
			padding: theme.spacing(2),
			backgroundColor: theme.palette.background.paper,
		},
		radar: {
			stroke: theme.palette.primary.main,
			fill: theme.palette.primary.main,
			fillOpacity: 0.4,
		},
	};

	const handleCategoryHover = useCallback(
		(category) => {
			if (!isMobile) {
				setActiveCategory(category);
			}
		},
		[isMobile]
	);

	const handleCategoryClick = useCallback(
		(category) => {
			if (isMobile) {
				setActiveCategory((prev) => (prev === category ? null : category));
			}
		},
		[isMobile]
	);

	return (
		<Box sx={chartStyles.container}>
			<Box
				sx={{
					display: 'flex',
					flexWrap: 'wrap',
					justifyContent: 'center',
					gap: 1,
				}}>
				{categories(person).map((category, index) => (
					<Tooltip
						key={index}
						title={
							<Typography>
								{category.type}: {category.score}점, {category.exp}
							</Typography>
						}
						arrow>
						<Box
							sx={{
								position: 'relative',
								display: 'flex',
								flexDirection: 'column',
								alignItems: 'center',
								justifyContent: 'center',
								border: `2px solid ${theme.palette.divider}`,
								borderRadius: theme.shape.borderRadius,
								cursor: 'pointer',
								overflow: 'hidden',
								width: '70px',
								height: '70px',
								transition: 'all 0.3s ease',
								'&:hover': {
									borderColor: theme.palette.primary.main,
									boxShadow: `0 0 8px ${theme.palette.primary.main}`,
								},
							}}
							onMouseEnter={() => handleCategoryHover(category.type)}
							onMouseLeave={() => handleCategoryHover(null)}
							onClick={() => handleCategoryClick(category.type)}>
							<Box
								sx={{
									position: 'absolute',
									bottom: 0,
									left: 0,
									width: '100%',
									height: `${category.score * 10}%`,
									backgroundColor: theme.palette.primary.light,
									opacity: 0.2,
									transition: 'height 0.3s ease',
								}}
							/>
							{React.cloneElement(category.icon, {
								color: activeCategory === category.type ? 'warning' : 'primary',
								style: {
									position: 'relative',
									zIndex: 1,
									fontSize: '2rem',
									marginBottom: theme.spacing(0.5),
								},
							})}
							<Typography
								variant="caption"
								sx={{
									textAlign: 'center',
									color:
										activeCategory === category.type
											? theme.palette.warning.main
											: theme.palette.text.primary,
									zIndex: 1,
									fontWeight: 'bold',
								}}>
								{category.type}
							</Typography>
						</Box>
					</Tooltip>
				))}
			</Box>

			<Box sx={{ width: '100%', height: 400 }}>
				<ResponsiveContainer>
					<RadarChart data={categories(person)} outerRadius="65%">
						<PolarGrid stroke={theme.palette.divider} />
						<PolarAngleAxis
							dataKey="type"
							tick={{ fill: theme.palette.text.primary, fontSize: 12 }}
						/>
						<PolarRadiusAxis
							domain={[0, 10]}
							tick={{ fill: theme.palette.text.secondary }}
						/>
						<Radar
							name="분야별 영향력"
							dataKey="score"
							{...chartStyles.radar}
						/>
					</RadarChart>
				</ResponsiveContainer>
			</Box>
		</Box>
	);
};

export default ImprovedRadarChartComponent;
