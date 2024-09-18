import { styled } from '@mui/material/styles';
import { Box } from '@mui/material';

export const StyledBox = styled(Box)(({ theme }) => ({
	height: 400,
	width: '100%',
	'& .actions': {
		color: theme.palette.text.secondary,
	},
	'& .textPrimary': {
		color: theme.palette.text.primary,
	},
}));
