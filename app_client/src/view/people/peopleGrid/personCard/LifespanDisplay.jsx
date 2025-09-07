import React from 'react';
import { calculateAge, formatYear } from 'utils/date';
import { Calendar } from 'lucide-react';
import { useAtom } from 'jotai';
import { darkModeAtom } from '../../../../store/atom';

const LifespanDisplay = ({ BIRTH, DEATH }) => {
	const [darkMode] = useAtom(darkModeAtom);

	// 생년월일과 사망일 모두 없는 경우
	if (!BIRTH && !DEATH) {
		return (
			<div className={`mb-1 flex items-center ${
				darkMode ? 'text-gray-300' : 'text-gray-800'
			}`}>
				<Calendar className="w-4 h-4 mr-2.5" />
				??? ~ ???
			</div>
		);
	}

	// 생년월일만 있고 사망일이 없는 경우 (현재 생존 중인 경우)
	if (BIRTH && !DEATH) {
		const age = calculateAge(BIRTH);
		return (
			<div className={`mb-1 flex items-center ${
				darkMode ? 'text-gray-300' : 'text-gray-800'
			}`}>
				<Calendar className="w-4 h-4 mr-2.5" />
				{age !== null ? `${age}세` : '알 수 없음'}
			</div>
		);
	}

	// 생년월일이나 사망일 중 하나라도 있는 경우
	const birthYear = BIRTH ? formatYear(BIRTH) : '???';
	const deathYear = DEATH ? formatYear(DEATH) : '???';

	return (
		<div className={`mb-1 flex items-center ${
			darkMode ? 'text-gray-300' : 'text-gray-800'
		}`}>
			<Calendar className="w-4 h-4 mr-2.5" />
			{birthYear} - {deathYear}
		</div>
	);
};

export default LifespanDisplay;
