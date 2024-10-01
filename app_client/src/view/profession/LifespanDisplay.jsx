import React from 'react';
import { Typography } from '@mui/material';
import { calculateAge } from 'utils/date';

const LifespanDisplay = ({ birthDate, dateOfDeath }) => {
	if (!birthDate && !dateOfDeath) {
		return <Typography variant="body2">??? ~ ???</Typography>;
	}

	if (birthDate && !dateOfDeath) {
		return <Typography variant="body2">{calculateAge(birthDate)}세</Typography>;
	}

	const birthYear = birthDate ? new Date(birthDate).getFullYear() : '???';
	const deathYear = dateOfDeath ? new Date(dateOfDeath).getFullYear() : '???';

	return (
		<Typography variant="body2">
			{birthYear} ~ {deathYear}
		</Typography>
	);
};

export default LifespanDisplay;
