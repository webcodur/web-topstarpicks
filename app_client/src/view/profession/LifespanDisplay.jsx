import React from 'react';
import { Typography } from '@mui/material';
import { calculateAge } from 'utils/date';
import { CalendarToday } from '@mui/icons-material';
import { PersonInfo } from './ProfessionStyles';

const LifespanDisplay = ({ birthDate, dateOfDeath }) => {
	if (!birthDate && !dateOfDeath) {
		return (
			<PersonInfo>
				<CalendarToday fontSize="small" />
				??? ~ ???
			</PersonInfo>
		);
	}

	if (birthDate && !dateOfDeath) {
		return (
			<PersonInfo>
				<CalendarToday fontSize="small" />
				{calculateAge(birthDate)}세
			</PersonInfo>
		);
	}

	const birthYear = birthDate ? new Date(birthDate).getFullYear() : '???';
	const deathYear = dateOfDeath ? new Date(dateOfDeath).getFullYear() : '???';

	return (
		<PersonInfo>
			<CalendarToday fontSize="small" />
			{birthYear} ~ {deathYear}
		</PersonInfo>
	);
};

export default LifespanDisplay;
