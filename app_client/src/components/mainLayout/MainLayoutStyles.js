import { styled } from '@mui/material/styles';
import { Box } from '@mui/material';

export const DRAWER_WIDTH = 240;

export const RootContainer = styled(Box)(({ theme }) => ({
	display: 'flex',
	flexDirection: 'column',
	minHeight: '100vh',
	backgroundColor: theme.palette.background.default,
}));

export const ContentWrapper = styled(Box, {
	shouldForwardProp: (prop) => prop !== 'hasAppBar',
})(({ theme, hasAppBar }) => ({
	display: 'flex',
	width: '100%',
	minHeight: hasAppBar ? 'calc(100vh - 64px)' : '100vh',
	marginTop: hasAppBar ? '64px' : '0',
	position: 'relative',
	overflow: 'visible',
	maxWidth: '100vw',
}));

export const MainContent = styled(Box)(({ theme }) => ({
	flexGrow: 1,
	overflow: 'visible',
	backgroundColor: theme.palette.background.paper,
	width: '100%',
	maxWidth: '100%',
}));

export const StyledDrawer = styled(Box)(({ theme, open }) => ({
	position: 'fixed',
	top: 0,
	left: 0,
	bottom: 0,
	paddingTop: '64px',
	zIndex: theme.zIndex.drawer,
	flexShrink: 0,
	whiteSpace: 'nowrap',
	boxSizing: 'border-box',
	overflowX: 'hidden',
	overflowY: 'auto',
	backgroundColor:
		theme.palette.mode === 'light'
			? theme.palette.grey[100]
			: theme.palette.grey[900],
	borderRight: `1px solid ${theme.palette.divider}`,
	width: DRAWER_WIDTH,
	transform: open ? 'translateX(0)' : `translateX(-${DRAWER_WIDTH}px)`,
	transition: theme.transitions.create('transform', {
		easing: theme.transitions.easing.sharp,
		duration: theme.transitions.duration.enteringScreen,
	}),
}));
