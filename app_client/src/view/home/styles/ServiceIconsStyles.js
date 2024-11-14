import styled from '@emotion/styled';
import { Box, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

export const ServiceIconWrapper = styled(Box)(({ theme }) => ({
	position: 'relative',
	display: 'flex',
	flexDirection: 'column',
	alignItems: 'center',
	justifyContent: 'center',
	cursor: 'pointer',
	width: '56px',
	height: '56px',
	borderRadius: '50%',
	transition: 'all 0.3s ease',
	background: 'rgba(255, 255, 255, 0.7)',
	backdropFilter: 'blur(8px)',
	'&:hover': {
		background: 'rgba(255, 255, 255, 0.9)',
		transform: 'scale(1.05)',
		boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
	},
}));

export const IconBox = styled('div')({
	color: '#1976d2',
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center',
});

export const StyledIcon = {
	fontSize: { xs: 20, md: 24 },
	filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.1))',
};

export const ServiceInfo = styled(Box)(({ theme }) => ({
	position: 'absolute',
	bottom: '-24px',
	left: '50%',
	transform: 'translateX(-50%)',
	background: 'rgba(33, 150, 243, 0.95)',
	padding: theme.spacing(0.5),
	borderRadius: theme.spacing(0.5),
	opacity: 0,
	transition: 'all 0.3s ease',
	width: '80px',
	textAlign: 'center',
	zIndex: 1000,
	backdropFilter: 'blur(8px)',
	'.ServiceIconWrapper:hover &': {
		opacity: 1,
	},
}));

export const ServiceText = styled(Typography)({
	fontSize: { xs: '0.65rem', md: '0.7rem' },
	fontWeight: 600,
	color: '#ffffff',
	fontFamily: "'Noto Sans KR', sans-serif",
	letterSpacing: '0.02em',
});

export const IconsContainer = styled(Box)({
	display: 'flex',
	justifyContent: 'center',
	flexWrap: 'wrap',
	width: '100%',
	maxWidth: '340px',
	marginTop: '16px',
});

export const StyledLink = styled(Link)({
	textDecoration: 'none',
});

export const IconWrapperSx = {
	minWidth: { xs: '45px', md: '56px' },
	minHeight: { xs: '45px', md: '56px' },
};

export const ContainerSx = {
	gap: { xs: 0.5, md: 1 },
};
