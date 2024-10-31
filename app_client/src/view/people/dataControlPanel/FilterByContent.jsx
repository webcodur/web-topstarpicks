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
import { contentNameAtom } from 'store/atom';
import { useContentNames } from 'hooks/useContentNames';
import { styled } from '@mui/material/styles';
import { contentIcons } from './icons/contentIcons';

const CustomAlert = styled(Alert)(({ theme }) => ({
	'&.MuiAlert-filledInfo': {
		backgroundColor: '#0d47a1',
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

const FilterByContent = memo(() => {
	const [contentType, setContentType] = useAtom(contentNameAtom);
	const contentNames = useContentNames();
	const [openSnackbar, setOpenSnackbar] = useState(false);

	const handleCategoryChange = (event) => {
		const noContentCategories = ['게임', '음악', '웹툰', '애니', '맛집'];
		if (noContentCategories.includes(event.target.value)) {
			setOpenSnackbar(true);
			return;
		}
		setContentType(event.target.value);
	};

	const handleCloseSnackbar = (_, reason) => {
		if (reason === 'clickaway') {
			return;
		}
		setOpenSnackbar(false);
	};

	if (!contentNames) return null;

	return (
		<>
			<FormControl>
				<InputLabel id="content-select-label">컨텐츠 필터</InputLabel>
				<Select
					labelId="content-select-label"
					id="content-select"
					label="컨텐츠 선택"
					value={contentType}
					onChange={handleCategoryChange}
					size="small">
					{contentNames.map((ele) => {
						const iconConfig = contentIcons.find(
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

export default FilterByContent; 