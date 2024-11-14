import { styled } from '@mui/material/styles';
import { Typography } from '@mui/material';

export const GradientText = styled(Typography)(({ theme }) => ({
	background: 'linear-gradient(45deg, #FFD700 30%, #FFA500 90%)',
	WebkitBackgroundClip: 'text',
	WebkitTextFillColor: 'transparent',
	backgroundClip: 'text',
	textFillColor: 'transparent',
	position: 'relative',
}));

export const SubtitleText = styled(Typography)(({ theme }) => ({
	color: '#FFE55C',
	position: 'relative',
	textShadow: '0 1px 2px rgba(0,0,0,0.2)',
}));

export const TitleStyles = {
	color: '#FFD700',
	fontWeight: 700,
	textShadow: '0px 2px 4px rgba(0, 0, 0, 0.2)',
};

export const SubtitleStyles = {
	fontSize: '1.2rem',
	color: '#FFF7CC',
	marginTop: '0.5rem',
	fontWeight: 500,
	opacity: 0.95,
};
