import { styled } from '@mui/material/styles';
import { Box } from '@mui/material';

export const DRAWER_WIDTH = 300;
export const MOBILE_BREAKPOINT = '768px';

export const RootContainer = styled(Box)(({ theme }) => ({
	display: 'flex',
	flexDirection: 'column',
	minHeight: '100vh',
	backgroundColor: theme.palette.background.default,
}));

export const ContentWrapper = styled(Box)(({ theme }) => ({
	display: 'flex',
	flex: 1,
	position: 'relative',
	overflow: 'hidden',
}));

export const MainContent = styled(Box)(({ theme }) => ({
	flexGrow: 1,
	overflowY: 'auto',
	transition: theme.transitions.create('margin', {
		easing: theme.transitions.easing.sharp,
		duration: theme.transitions.duration.leavingScreen,
	}),
	padding: theme.spacing(3),
	backgroundColor: theme.palette.background.paper,
}));

export const StyledDrawer = styled(Box)(({ theme, open }) => ({
	position: 'fixed', // 변경: 'absolute'에서 'fixed'로
	top: 64, // AppBar의 높이. 실제 AppBar 높이에 맞게 조정하세요.
	left: 0,
	bottom: 0,
	zIndex: theme.zIndex.drawer,
	flexShrink: 0,
	whiteSpace: 'nowrap',
	boxSizing: 'border-box',
	overflowX: 'hidden',
	overflowY: 'auto', // 내용이 많을 경우 스크롤 가능하도록
	transition: theme.transitions.create('width', {
		easing: theme.transitions.easing.sharp,
		duration: theme.transitions.duration.enteringScreen,
	}),
	width: open ? DRAWER_WIDTH : 0,
	backgroundColor:
		theme.palette.mode === 'light'
			? theme.palette.grey[100]
			: theme.palette.grey[900],
	borderRight: `1px solid ${theme.palette.divider}`,
	[theme.breakpoints.down('md')]: {
		transform: open ? 'translateX(0)' : `translateX(-${DRAWER_WIDTH}px)`,
	},
}));
