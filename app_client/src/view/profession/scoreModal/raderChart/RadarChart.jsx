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
import { getRadarChartStyles } from './radarChartStyle';

const RadarChartComponent = ({ person }) => {
	const theme = useTheme();
	const styles = getRadarChartStyles(theme);
	const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
	const [activeCategory, setActiveCategory] = useState(null);

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
		<Box sx={styles.container}>
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
							sx={styles.categoryBox}
							onMouseEnter={() => handleCategoryHover(category.type)}
							onMouseLeave={() => handleCategoryHover(null)}
							onClick={() => handleCategoryClick(category.type)}>
							<Box
								sx={{
									...styles.categoryFill,
									height: `${category.score * 10}%`,
								}}
							/>
							{React.cloneElement(category.icon, {
								color: activeCategory === category.type ? 'warning' : 'primary',
								style: styles.categoryIcon,
							})}
							<Typography
								variant="caption"
								sx={{
									...styles.categoryText,
									color:
										activeCategory === category.type
											? theme.palette.warning.main
											: theme.palette.text.primary,
								}}>
								{category.type}
							</Typography>
						</Box>
					</Tooltip>
				))}
			</Box>

			<Box sx={styles.chartContainer}>
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
						<Radar name="분야별 영향력" dataKey="score" style={styles.radar} />
					</RadarChart>
				</ResponsiveContainer>
			</Box>
		</Box>
	);
};

export default RadarChartComponent;
