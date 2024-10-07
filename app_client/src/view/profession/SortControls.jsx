// SortControls.jsx
import React from 'react';
import { Box, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { ArrowUpward, ArrowDownward } from '@mui/icons-material';
import { StyledButton } from './ProfessionStyles';

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
		<Box
			align="center"
			sx={{
				display: 'flex',
				alignItems: 'center',
				mb: 4,
				justifyContent: 'center',
			}}>
			{/* 정렬 기능 선택 */}
			<FormControl sx={{ minWidth: 200, mr: 2 }}>
				<InputLabel id="sort-select-label">정렬 기준</InputLabel>
				<Select
					labelId="sort-select-label"
					id="sort-select"
					value={sortCriteria}
					label="정렬 기준"
					onChange={handleSortChange}>
					<MenuItem value="">
						<em>없음</em>
					</MenuItem>
					<MenuItem value="nationality">국적</MenuItem>
					<MenuItem value="rank">랭크</MenuItem>
					<MenuItem value="age">나이/시대</MenuItem>
				</Select>
			</FormControl>

			{/* 정렬 기능 선택 */}
			{sortCriteria && (
				<StyledButton onClick={handleSortOrderChange}>
					{sortOrder === 'asc' ? <ArrowUpward /> : <ArrowDownward />}
				</StyledButton>
			)}
		</Box>
	);
};

export default SortControls;
