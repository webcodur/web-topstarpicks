import React from 'react';
import { calculateAge } from 'utils/date';
import { CalendarToday } from '@mui/icons-material';
import { PersonInfo } from './ProfessionStyles';

const LifespanDisplay = ({ birthDate, dateOfDeath }) => {
	// 생년월일과 사망일 모두 없는 경우
	// 알 수 없는 생애 기간을 표시
	if (!birthDate && !dateOfDeath) {
		return (
			<PersonInfo>
				<CalendarToday fontSize="small" />
				생애: ??? ~ ???
			</PersonInfo>
		);
	}

	// 생년월일만 있고 사망일이 없는 경우 (현재 생존 중인 경우)
	// 현재 나이를 계산하여 표시
	if (birthDate && !dateOfDeath) {
		return (
			<PersonInfo>
				<CalendarToday fontSize="small" />
				나이: {calculateAge(birthDate)}세
			</PersonInfo>
		);
	}

	// 생년월일이나 사망일 중 하나라도 있는 경우
	// 알려진 정보를 기반으로 생애 기간을 표시
	const birthYear = birthDate ? new Date(birthDate).getFullYear() : '???';
	const deathYear = dateOfDeath ? new Date(dateOfDeath).getFullYear() : '???';

	return (
		<PersonInfo>
			<CalendarToday fontSize="small" />
			생애: {birthYear} ~ {deathYear}
		</PersonInfo>
	);
};

export default LifespanDisplay;
