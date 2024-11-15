import { styled } from '@mui/material/styles';
import { Box } from '@mui/material';

export const ContentWrapper = styled('div')(({ theme }) => ({
	width: '100%',
	minHeight: '100vh',
	background: 'linear-gradient(135deg, #6B73FF 0%, #000DFF 100%)',
	padding: theme.spacing(3),
	position: 'relative',
	display: 'flex',
	justifyContent: 'center',
	alignItems: 'center',
	'&::before': {
		content: '""',
		position: 'absolute',
		top: 0,
		left: 0,
		right: 0,
		bottom: 0,
		background: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
		pointerEvents: 'none',
	},
	'& > *': {
		maxWidth: '600px',
		width: '100%',
	},
}));

export const CenterContainer = styled(Box)({
	maxWidth: '1200px',
	width: '100%',
	margin: '0 auto',
	display: 'flex',
	flexDirection: 'column',
	alignItems: 'center',
	// backgroundColor: 'green',
});

export const GallerySection = styled(Box)({
	width: '100%',
	display: 'flex',
	justifyContent: 'center',
});

export const ContentSection = styled(Box)(({ theme }) => ({
	display: 'flex',
	width: '100%',
	flexDirection: 'column',
	alignItems: 'center',
}));
