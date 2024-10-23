import React from 'react';
import {
	Box,
	FormControl,
	InputLabel,
	Select,
	MenuItem,
	ListItemIcon,
} from '@mui/material';
import { ArrowUpward, ArrowDownward } from '@mui/icons-material';
import { sortIcons } from './icons/sortIcons';

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
			sx={{
				display: 'flex',
				alignItems: 'center',
				gap: '8px',
				'& .MuiFormControl-root': {
					minWidth: '115px',
				},
			}}>
			<FormControl>
				<InputLabel id="sort-select-label">정렬</InputLabel>
				<Select
					labelId="sort-select-label"
					id="sort-select"
					value={sortCriteria}
					label="정렬 기준"
					onChange={handleSortChange}
					size="small">
					{sortIcons.map(({ value, label, icon: IconComponent }) => (
						<MenuItem value={value} key={value}>
							<ListItemIcon>
								<IconComponent fontSize="small" />
							</ListItemIcon>
							{label}
						</MenuItem>
					))}
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
