import React from 'react';
import { useAtom } from 'jotai';
import { personTypeAtom } from 'store/atom';
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';

const FilterByPersonType = () => {
	const [personType, setPersonType] = useAtom(personTypeAtom);

	return (
		<FormControl sx={{ minWidth: 120 }}>
			<InputLabel>인물 유형</InputLabel>
			<Select
				value={personType}
				onChange={(e) => setPersonType(e.target.value)}
				label="인물 유형">
				<MenuItem value="all">전체</MenuItem>
				<MenuItem value="real">실존인물</MenuItem>
				<MenuItem value="fictional">가상인물</MenuItem>
			</Select>
		</FormControl>
	);
};

export default FilterByPersonType;
