import React from 'react';
import { calculateAge, formatYear } from 'utils/date';
import { CalendarToday } from '@mui/icons-material';
import { PersonInfo } from './ProfessionStyles';

const LifespanDisplay = ({ BIRTH, DEATH }) => {
	// 생년월일과 사망일 모두 없는 경우
	if (!BIRTH && !DEATH) {
		return (
			<PersonInfo>
				<CalendarToday fontSize="small" />
				생애: ??? ~ ???
			</PersonInfo>
		);
	}

	// 생년월일만 있고 사망일이 없는 경우 (현재 생존 중인 경우)
	if (BIRTH && !DEATH) {
		const age = calculateAge(BIRTH);
		return (
			<PersonInfo>
				<CalendarToday fontSize="small" />
				나이: {age !== null ? `${age}세` : '알 수 없음'}
			</PersonInfo>
		);
	}

	// 생년월일이나 사망일 중 하나라도 있는 경우
	const birthYear = BIRTH ? formatYear(BIRTH) : '???';
	const deathYear = DEATH ? formatYear(DEATH) : '???';

	return (
		<PersonInfo>
			<CalendarToday fontSize="small" />
			생애: {birthYear} - {deathYear}
		</PersonInfo>
	);
};

export default LifespanDisplay;
