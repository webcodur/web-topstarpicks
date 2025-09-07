import React from 'react';
import { useAtom } from 'jotai';
import { darkModeAtom } from '../../../../store/atom';

const TotalScoreComponent = ({ person }) => {
	const [darkMode] = useAtom(darkModeAtom);

	return (
		<div className={`flex flex-col items-center p-6 border rounded-lg ${
			darkMode ? 'border-gray-700 bg-gray-800' : 'border-gray-200 bg-white'
		}`}>
			<div className="flex items-baseline mb-6">
				<h3 className={`font-bold mr-4 text-lg ${
					darkMode ? 'text-gray-200' : 'text-gray-800'
				}`}>
					{person.total_score}점:
				</h3>
				<span className="font-['Permanent_Marker'] text-4xl mr-1">
					{person.grade}
				</span>
			</div>
			<div className={`text-center rounded-lg p-4 ${
				darkMode ? 'bg-gray-700' : 'bg-gray-50'
			}`}>
				<h6 className={`font-bold mb-2 ${
					darkMode ? 'text-gray-200' : 'text-gray-800'
				}`}>
					등급 기준
				</h6>
				<p className={`text-sm ${
					darkMode ? 'text-gray-300' : 'text-gray-600'
				}`}>
					70점 이상: Stellar 랭크
					<br />
					60점 이상: Authority 랭크
					<br />
					50점 이상: Beacon 랭크
					<br />
					40점 이상: Certified 랭크
					<br />
					30점 이상: Dignity 랭크
				</p>
			</div>
		</div>
	);
};

export default TotalScoreComponent;
