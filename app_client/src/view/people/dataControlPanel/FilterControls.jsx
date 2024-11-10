import React from 'react';
import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useAtom } from 'jotai';
import { menuInfoAtom, professionNameAtom } from 'store/atom';

// 필터 컴포넌트들 import
import FilterByProfession from './FilterByProfession';
// import FilterByPersonType from './FilterByPersonType';
import FilterByContent from './FilterByContent';
import FilterByEra from './FilterByEra';
import SortControls from './SortControls';

const FilterContainer = styled(Box)(({ theme }) => ({
	display: 'flex',
	flexDirection: 'row',
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
	[theme.breakpoints.down('md')]: {
		flexDirection: 'column',
	},
}));

const FilterControls = ({
	sortCriteria,
	setSortCriteria,
	sortOrder,
	setSortOrder,
}) => {
	const [menuInfo] = useAtom(menuInfoAtom);
	const [profession] = useAtom(professionNameAtom);

	return (
		<>
			<FilterContainer>
				<FilterByProfession currentProfession={profession} />
				{/* {menuInfo === '인물도감' && <FilterByPersonType />} */}
				{menuInfo === '추천정보' && <FilterByContent />}
				<FilterByEra />
				<SortControls
					sortCriteria={sortCriteria}
					setSortCriteria={setSortCriteria}
					sortOrder={sortOrder}
					setSortOrder={setSortOrder}
				/>
			</FilterContainer>
		</>
	);
};

export default FilterControls;
