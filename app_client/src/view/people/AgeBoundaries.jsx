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
				label="고대/중세 경계 (서로마 제국 멸망)"
				type="number"
				value={eraBoundaries.ancient}
				onChange={handleEraBoundaryChange('ancient')}
				sx={{ width: '20%' }}
			/>
			<TextField
				label="중세/근대 경계 (동로마 제국 멸망)"
				type="number"
				value={eraBoundaries.medieval}
				onChange={handleEraBoundaryChange('medieval')}
				sx={{ width: '20%' }}
			/>
			<TextField
				label="근대/현대 경계 (프랑스 대혁명)"
				type="number"
				value={eraBoundaries.early_modern}
				onChange={handleEraBoundaryChange('early_modern')}
				sx={{ width: '20%' }}
			/>
			<TextField
				label="현재 (2차 세계대전)"
				type="number"
				value={eraBoundaries.modern}
				onChange={handleEraBoundaryChange('modern')}
				sx={{ width: '20%' }}
			/>
		</Box>
	);
};

export default AgeBoundaries;
