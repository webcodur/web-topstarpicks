import { styled } from '@mui/material/styles';
import { Box, Typography } from '@mui/material';

export const StatsContainer = styled(Box)(({ theme }) => ({
	display: 'flex',
	justifyContent: 'center',
	gap: theme.spacing(4),
	width: '100%',
	maxWidth: '340px',
	padding: theme.spacing(2),
}));

export const StatBox = styled(Box)({
	textAlign: 'center',
	padding: '4px',
});

export const StatNumber = styled(Typography)(({ theme }) => ({
	fontSize: {
		xs: '1.2rem',
		md: '1.6rem',
	},
	fontWeight: 'bold',
	marginBottom: theme.spacing(0.5),
	color: '#FFD700',
}));

export const StatLabel = styled(Typography)({
	fontSize: {
		xs: '0.7rem',
		md: '0.8rem',
	},
	color: '#FFE55C',
	fontWeight: 500,
});
