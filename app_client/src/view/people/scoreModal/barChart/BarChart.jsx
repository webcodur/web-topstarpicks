import React from 'react';
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
import { useAtom } from 'jotai';
import { darkModeAtom } from '../../../../store/atom';

const BarChartComponent = ({ transhistoricity, exp }) => {
	const [darkMode] = useAtom(darkModeAtom);
	const barData = prepareBarData(transhistoricity);

	const chartMargin = {
		top: 20,
		right: 20,
		left: 10,
		bottom: 5,
	};

	return (
		<div className={`border rounded-lg p-4 shadow-lg ${darkMode ? 'border-gray-700 bg-gray-800' : 'border-gray-200 bg-white'}`}>
			<div className="flex gap-6">
				<div className="w-1/2 h-[300px] flex flex-col">
					<p className={`text-sm mb-4 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
						<strong>통시성:</strong> 시대를 넘어 세상에 영향을 준 정도
					</p>
					<ResponsiveContainer width="100%" height="100%">
						<BarChart
							data={barData}
							margin={chartMargin}
							layout="horizontal">
							<CartesianGrid
								strokeDasharray="3 3"
								stroke={darkMode ? '#374151' : '#e5e7eb'}
							/>
							<XAxis
								dataKey="name"
								tick={{ fontSize: 12, fill: darkMode ? '#9ca3af' : '#6b7280' }}
								axisLine={{ stroke: darkMode ? '#9ca3af' : '#6b7280' }}
								tickLine={{ stroke: darkMode ? '#9ca3af' : '#6b7280' }}
							/>
							<YAxis
								type="number"
								domain={[0, 40]}
								ticks={[0, 10, 20, 30, 40]}
								tick={{ fontSize: 12, fill: darkMode ? '#9ca3af' : '#6b7280' }}
								axisLine={{ stroke: darkMode ? '#9ca3af' : '#6b7280' }}
								tickLine={{ stroke: darkMode ? '#9ca3af' : '#6b7280' }}
							/>
							<Bar
								dataKey="score"
								name="통시성"
								fill="#3b82f6"
								barSize={40}>
								<LabelList
									dataKey="score"
									position="insideRight"
									fill={darkMode ? '#1f2937' : '#ffffff'}
									fontSize={12}
								/>
							</Bar>
						</BarChart>
					</ResponsiveContainer>
				</div>
				<div className="w-2/5 flex items-center">
					<div className="flex flex-col">
						<p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>{exp}</p>
					</div>
				</div>
			</div>
		</div>
	);
};

export default BarChartComponent;
