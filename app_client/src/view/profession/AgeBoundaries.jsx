// AgeBoundaries.jsx
import React from 'react';
import { Box, TextField } from '@mui/material';

const AgeBoundaries = ({ eraBoundaries, setEraBoundaries }) => {
	const handleEraBoundaryChange = (era) => (event) => {
		setEraBoundaries((prev) => ({
			...prev,
			[era]: parseInt(event.target.value),
		}));
	};

	return (
		<Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 4 }}>
			<TextField
				label="고대/중세 경계"
				type="number"
				value={eraBoundaries.ancient}
				onChange={handleEraBoundaryChange('ancient')}
				sx={{ width: '30%' }}
			/>
			<TextField
				label="중세/근대 경계"
				type="number"
				value={eraBoundaries.medieval}
				onChange={handleEraBoundaryChange('medieval')}
				sx={{ width: '30%' }}
			/>
			<TextField
				label="근대/현대 경계"
				type="number"
				value={eraBoundaries.modern}
				onChange={handleEraBoundaryChange('modern')}
				sx={{ width: '30%' }}
			/>
		</Box>
	);
};

export default AgeBoundaries;
