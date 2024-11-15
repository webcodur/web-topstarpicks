import React from 'react';
import {
	Dialog,
	DialogTitle,
	DialogContent,
	Grid,
	Button,
	Typography,
	Box,
	DialogActions,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import GridViewIcon from '@mui/icons-material/GridView';
import ViewListIcon from '@mui/icons-material/ViewList';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const StyledButton = styled(Button)(({ theme, active }) => ({
	width: '100%',
	height: '120px',
	display: 'flex',
	flexDirection: 'column',
	gap: theme.spacing(1),
	padding: theme.spacing(2),
	opacity: active ? 1 : 0.5,
	'& .MuiSvgIcon-root': {
		fontSize: '2.5rem',
	},
	...(active && {
		border: '2px solid',
		borderColor: theme.palette.primary.main,
		backgroundColor: theme.palette.action.selected,
		'& .MuiTypography-root': {
			color: theme.palette.primary.main,
			fontWeight: 'bold',
		},
		'& .MuiSvgIcon-root': {
			color: theme.palette.primary.main,
		},
	}),
}));

const ViewTypeModal = ({
	open,
	onClose,
	currentViewType,
	onViewTypeChange,
}) => {
	const handleViewTypeSelect = (viewType) => {
		onViewTypeChange(viewType);
		onClose();
	};

	return (
		<Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
			<DialogTitle>보기 방식 선택</DialogTitle>
			<DialogContent>
				<Grid container spacing={2} sx={{ mt: 1 }}>
					<Grid item xs={12} sm={4}>
						<StyledButton
							variant="outlined"
							active={currentViewType === 'grid'}
							onClick={() => handleViewTypeSelect('grid')}>
							<GridViewIcon />
							<Typography variant="subtitle1">초상화 그리드</Typography>
						</StyledButton>
					</Grid>
					<Grid item xs={12} sm={4}>
						<StyledButton variant="outlined" disabled>
							<AccountCircleIcon />
							<Typography variant="subtitle1">아이콘 보기</Typography>
							<Typography variant="caption" color="text.secondary">
								현재 사용할 수 없습니다
							</Typography>
						</StyledButton>
					</Grid>
					<Grid item xs={12} sm={4}>
						<StyledButton variant="outlined" disabled>
							<ViewListIcon />
							<Typography variant="subtitle1">리스트 보기</Typography>
							<Typography variant="caption" color="text.secondary">
								현재 사용할 수 없습니다
							</Typography>
						</StyledButton>
					</Grid>
				</Grid>
			</DialogContent>
			<DialogActions>
				<Button onClick={onClose} color="inherit">
					닫기
				</Button>
			</DialogActions>
		</Dialog>
	);
};

export default ViewTypeModal;
