import { styled } from '@mui/material/styles';
import { Box } from '@mui/material';

export const ServiceIconWrapper = styled(Box)(({ theme }) => ({
	position: 'relative',
	display: 'flex',
	flexDirection: 'column',
	alignItems: 'center',
	cursor: 'pointer',
	padding: '10px 15px',
	borderRadius: '12px',
	transition: 'all 0.3s ease',
	'&:hover': {
		backgroundColor: 'rgba(66, 165, 245, 0.08)',
	},
	'&:hover .service-info': {
		opacity: 1,
		transform: 'translateY(0)',
	},
}));

export const ServiceInfo = styled(Box)(({ theme }) => ({
	position: 'absolute',
	top: '100%',
	left: '50%',
	transform: 'translateX(-50%) translateY(10px)',
	backgroundColor: 'rgba(255, 255, 255, 0.98)',
	padding: theme.spacing(1.5),
	borderRadius: theme.spacing(1),
	boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
	opacity: 0,
	transition: 'all 0.3s ease',
	width: '180px',
	textAlign: 'center',
	zIndex: 10,
}));
