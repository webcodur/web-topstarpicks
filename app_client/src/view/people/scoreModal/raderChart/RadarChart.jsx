import React, { useState, useCallback } from 'react';
import {
	Radar,
	RadarChart,
	PolarGrid,
	PolarAngleAxis,
	PolarRadiusAxis,
	ResponsiveContainer,
} from 'recharts';

import { categories } from './categoryData';
import { useAtom } from 'jotai';
import { darkModeAtom } from '../../../../store/atom';

const RadarChartComponent = ({ person }) => {
	const [darkMode] = useAtom(darkModeAtom);
	const [activeCategory, setActiveCategory] = useState(null);
	const [isMobile, setIsMobile] = useState(window.innerWidth < 640);

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

	React.useEffect(() => {
		const handleResize = () => {
			setIsMobile(window.innerWidth < 640);
		};
		window.addEventListener('resize', handleResize);
		return () => window.removeEventListener('resize', handleResize);
	}, []);

	return (
		<div className={`border rounded-lg p-4 pt-8 pb-0 ${darkMode ? 'border-gray-700 bg-gray-800' : 'border-gray-200 bg-white'}`}>
			<div className="flex flex-wrap justify-center gap-2">
				{categories(person).map((category, index) => (
					<div
						key={index}
						className={`
							relative flex flex-col items-center justify-center 
							border-2 rounded cursor-pointer overflow-hidden 
							w-[70px] h-[70px] transition-all duration-300 
							hover:border-blue-500 hover:shadow-lg hover:shadow-blue-500/20
							${activeCategory === category.type ? 'border-orange-500 shadow-lg shadow-orange-500/20' : 
							  darkMode ? 'border-gray-600' : 'border-gray-300'}
						`}
						title={`${category.type}: ${category.score}점, ${category.exp}`}
						onMouseEnter={() => handleCategoryHover(category.type)}
						onMouseLeave={() => handleCategoryHover(null)}
						onClick={() => handleCategoryClick(category.type)}>
						<div 
							className="absolute bottom-0 left-0 w-full bg-blue-200 opacity-20 transition-all duration-300"
							style={{ height: `${category.score * 10}%` }}
						/>
						{React.cloneElement(category.icon, {
							className: `relative z-10 mb-1 ${activeCategory === category.type ? 'text-orange-500' : 'text-blue-500'} w-8 h-8`,
						})}
						<span className={`text-xs text-center z-10 font-bold ${
							activeCategory === category.type ? 'text-orange-500' : 
							darkMode ? 'text-gray-200' : 'text-gray-800'
						}`}>
							{category.type}
						</span>
					</div>
				))}
			</div>

			<div className="w-full h-[300px]">
				<ResponsiveContainer>
					<RadarChart data={categories(person)} outerRadius="65%">
						<PolarGrid stroke={darkMode ? '#374151' : '#e5e7eb'} />
						<PolarAngleAxis
							dataKey="type"
							tick={{ fill: darkMode ? '#f3f4f6' : '#374151', fontSize: 12 }}
						/>
						<PolarRadiusAxis
							domain={[0, 10]}
							tick={{ fill: darkMode ? '#9ca3af' : '#6b7280' }}
						/>
						<Radar 
							name="분야별 영향력" 
							dataKey="score" 
							stroke="#3b82f6" 
							fill="#3b82f6" 
							fillOpacity={0.4}
						/>
					</RadarChart>
				</ResponsiveContainer>
			</div>
		</div>
	);
};

export default RadarChartComponent;
