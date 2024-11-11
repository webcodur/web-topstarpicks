import { styled } from '@mui/material/styles';
import { Box, AccordionSummary } from '@mui/material';

export const StyledBox = styled(Box)(({ theme }) => ({
	display: 'flex',
	alignContent: 'center',
	flexDirection: 'column',
	gap: '15px',

	width: '100%',
	'& .actions': {
		color: theme.palette.text.secondary,
	},
	'& .textPrimary': {
		color: theme.palette.text.primary,
	},
}));

export const StyledAccordionSummary = styled(AccordionSummary)(({ theme }) => ({
	backgroundColor: theme.palette.primary.main,
	color: theme.palette.primary.contrastText,
	'&:hover': {
		backgroundColor: theme.palette.primary.dark,
	},
	'& .MuiAccordionSummary-expandIconWrapper': {
		color: theme.palette.primary.contrastText,
	},
}));
