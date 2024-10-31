import React from 'react';
import {
	FormControl,
	InputLabel,
	Select,
	MenuItem,
	ListItemIcon,
} from '@mui/material';

import professionIcons from './icons/professionIcons';
import useCelebNumbers from 'hooks/useCelebNumbers';

import { useAtom } from 'jotai';
import { professionNameAtom } from 'store/atom';

const FilterByProfession = () => {
	const [celebNumbers, celebTotals] = useCelebNumbers();
	const [profession, setProfession] = useAtom(professionNameAtom);

	const getNumberByProfession = (professionName) => {
		if (professionName === '전체') return celebTotals;
		const profession = celebNumbers?.find(
			(item) => item.name === professionName
		);
		return profession ? profession.profession_count : 0;
	};

	const handleProfessionChange = (event) => {
		setProfession(event.target.value);
	};

	if (!celebNumbers || !celebTotals) {
		return null;
	}

	return (
		<FormControl>
			<InputLabel id="profession-select-label">직군 필터</InputLabel>
			<Select
				labelId="profession-select-label"
				id="profession-select"
				value={profession || '전체'}
				label="직군 선택"
				onChange={handleProfessionChange}
				size="small"
				sx={{
					'& .MuiSelect-select': {
						display: 'flex',
						alignItems: 'center',
					},
				}}>
				{professionIcons.map(({ key, text, icon }) => (
					<MenuItem
						key={key}
						value={text}
						sx={{
							display: 'flex',
							alignItems: 'center',
						}}>
						<ListItemIcon
							sx={{
								minWidth: 40,
								display: 'flex',
								alignItems: 'center',
							}}>
							{icon}
						</ListItemIcon>
						<span>
							{text} ({getNumberByProfession(text)})
						</span>
					</MenuItem>
				))}
			</Select>
		</FormControl>
	);
};

export default FilterByProfession;
