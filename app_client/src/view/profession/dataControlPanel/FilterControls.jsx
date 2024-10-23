import React from 'react';
import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';

const FilterContainer = styled(Box)({
	display: 'flex',
	gap: '16px',
	justifyContent: 'center',
	alignItems: 'center',
	padding: '20px',
	'& .MuiFormControl-root': {
		minWidth: '160px',
	},
	'& .MuiInputLabel-root': {
		zIndex: 0,
	},
	'& .MuiSelect-select': {
		padding: '8px 14px',
		height: '20px',
		lineHeight: '20px',
		display: 'flex',
		alignItems: 'center',
	},
	'& .MuiCardContent-root': {
		padding: '8px 14px',
		height: '36px',
		display: 'flex',
		alignItems: 'center',
		backgroundColor: 'whitesmoke',
		border: '1px solid lightgray',
		borderRadius: '4px',
		cursor: 'pointer',
		'&:hover': {
			backgroundColor: '#e0e0e0',
		},
	},
});

const FilterControls = ({ children }) => {
	return <FilterContainer>{children}</FilterContainer>;
};

export default FilterControls;
