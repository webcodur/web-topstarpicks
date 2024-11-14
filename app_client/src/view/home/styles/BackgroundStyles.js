import { styled } from '@mui/material/styles';
import { Box } from '@mui/material';

export const GradientBackground = styled(Box)(({ theme }) => ({
	background: `linear-gradient(135deg, #e3e8ef 0%, #d1d8e6 100%)`,
	position: 'relative',
	minHeight: '100vh',
	width: '100%',
	zIndex: 0,
	'&::before': {
		content: '""',
		position: 'absolute',
		top: 0,
		left: 0,
		right: 0,
		bottom: 0,
		background: `
            radial-gradient(circle at 100% 0%, rgba(33, 150, 243, 0.08) 0%, transparent 25%),
            radial-gradient(circle at 0% 100%, rgba(33, 203, 243, 0.08) 0%, transparent 25%)
        `,
		opacity: 1,
		zIndex: -1,
	},
	'&::after': {
		content: '""',
		position: 'absolute',
		top: 0,
		left: 0,
		right: 0,
		bottom: 0,
		background: `
            repeating-linear-gradient(
                45deg,
                rgba(255, 255, 255, 0.1) 0px,
                rgba(255, 255, 255, 0.1) 1px,
                transparent 1px,
                transparent 3px
            )
        `,
		opacity: 0.5,
		zIndex: -1,
	},
}));
