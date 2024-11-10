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
	const [celebNumbers, celebTotals] = useCelebNumbers(); // [celeb Count by Profession, 총원]
	const [profession, setProfession] = useAtom(professionNameAtom);

	// 직군별 인원 수 반환
	const getNumberByProfession = (professionName) => {
		if (professionName === '전체') return celebTotals;
		const profession = celebNumbers?.find(
			(item) => item.name === professionName
		);
		return profession ? profession.profession_count : 0;
	};

	// 직군 선택 시 상태 변경
	const handleProfessionChange = (event) => {
		setProfession(event.target.value);
	};

	// 직군 데이터가 로드되지 않았을 경우 null 반환
	if (!celebNumbers || !celebTotals) {
		return null;
	}

	// 직군 필터 컴포넌트 반환
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
