import React from 'react';
import { Box, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { ArrowUpward, ArrowDownward } from '@mui/icons-material';

const SortControls = ({
	sortCriteria,
	setSortCriteria,
	sortOrder,
	setSortOrder,
}) => {
	const handleSortChange = (event) => {
		setSortCriteria(event.target.value);
	};

	const handleSortOrderChange = () => {
		setSortOrder((prevOrder) => (prevOrder === 'asc' ? 'desc' : 'asc'));
	};

	return (
		<Box sx={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
			<FormControl>
				<InputLabel id="sort-select-label">정렬</InputLabel>
				<Select
					labelId="sort-select-label"
					id="sort-select"
					value={sortCriteria}
					label="정렬 기준"
					onChange={handleSortChange}
					size="small">
					<MenuItem value="name">이름</MenuItem>
					<MenuItem value="nationality">국적</MenuItem>
					<MenuItem value="rank">랭크</MenuItem>
					<MenuItem value="age">나이/시대</MenuItem>
				</Select>
			</FormControl>
			<div
				onClick={handleSortOrderChange}
				style={{
					cursor: 'pointer',
					border: '1px solid lightgray',
					borderRadius: '10px',
					marginTop: '3px',
					lineHeight: '20px',
					padding: '3px',
				}}>
				{sortOrder === 'asc' ? <ArrowUpward /> : <ArrowDownward />}
			</div>
		</Box>
	);
};

export default SortControls;
