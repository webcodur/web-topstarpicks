import React, { memo, useState } from 'react';
import {
	Select,
	MenuItem,
	InputLabel,
	FormControl,
	Snackbar,
	Alert,
	ListItemIcon,
} from '@mui/material';
import { useAtom } from 'jotai';
import { timesNameAtom } from 'store/atom';
import { styled } from '@mui/material/styles';
import { History, AllInclusive, Today } from '@mui/icons-material';

// Alert 컴포넌트 커스터마이징
const CustomAlert = styled(Alert)(({ theme }) => ({
	'&.MuiAlert-filledInfo': {
		backgroundColor: '#0d47a1', // 파랑
	},
	'& .MuiAlert-icon': {
		color: 'inherit',
	},
	'& .MuiAlert-action': {
		'& .MuiIconButton-root': {
			color: 'inherit',
		},
	},
}));

// 시대 카테고리별 아이콘 설정
const timesIcons = [
	{ name: '전체인물', icon: AllInclusive },
	{ name: '역사인물', icon: History },
	{ name: '현대인물', icon: Today },
];

const CategorySelect = memo(() => {
	const [timesType, setTimesType] = useAtom(timesNameAtom);
	const [openSnackbar, setOpenSnackbar] = useState(false);
	const timesCategories = [
		{ name: '전체인물' },
		{ name: '역사인물' },
		{ name: '현대인물' },
	];

	const handleCategoryChange = (event) => {
		setTimesType(event.target.value);
	};

	const handleCloseSnackbar = (_, reason) => {
		if (reason === 'clickaway') {
			return;
		}
		setOpenSnackbar(false);
	};

	return (
		<>
			<FormControl>
				<InputLabel id="content-select-label">시대 필터</InputLabel>
				<Select
					labelId="content-select-label"
					id="content-select"
					label="컨텐츠 선택"
					value={timesType}
					onChange={handleCategoryChange}
					size="small">
					{timesCategories.map((ele) => {
						const iconConfig = timesIcons.find(
							(icon) => icon.name === ele.name
						);
						const IconComponent = iconConfig ? iconConfig.icon : null;

						return (
							<MenuItem value={ele.name} key={ele.name}>
								{IconComponent && (
									<ListItemIcon>
										<IconComponent fontSize="small" />
									</ListItemIcon>
								)}
								{ele.name}
							</MenuItem>
						);
					})}
				</Select>
			</FormControl>

			<Snackbar
				open={openSnackbar}
				autoHideDuration={3000}
				onClose={handleCloseSnackbar}
				anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}>
				<CustomAlert
					onClose={handleCloseSnackbar}
					severity="info"
					variant="filled"
					sx={{
						width: '100%',
						boxShadow: '0 3px 6px rgba(0,0,0,0.16)',
					}}>
					해당 컨텐츠가 없습니다.
				</CustomAlert>
			</Snackbar>
		</>
	);
});

export default CategorySelect;
