import React from 'react';
import {
	Box,
	FormControl,
	InputLabel,
	Select,
	MenuItem,
	ListItemIcon,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import professionIcons from './professionIcons';
import useCelebNumbers from 'hooks/useCelebNumbers';

const ProfessionFilter = ({ currentProfession }) => {
	const navigate = useNavigate();
	const [celebNumbers, celebTotals] = useCelebNumbers();

	const getNumberByProfession = (professionName) => {
		if (professionName === '전체') return celebTotals;
		const profession = celebNumbers?.find(
			(item) => item.name === professionName
		);
		return profession ? profession.profession_count : 0;
	};

	const handleProfessionChange = (event) => {
		const selectedProfession = event.target.value;
		navigate(`/${selectedProfession}`);
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
				value={currentProfession || '전체'}
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

export default ProfessionFilter;
