import { styled } from '@mui/material/styles';
import { Box } from '@mui/material';

export const DRAWER_WIDTH = 240; // 사이드 드로어의 너비 (픽셀)
export const MOBILE_BREAKPOINT = '768px'; // 모바일 뷰 전환점

// 최상위 컨테이너 스타일링
// - 전체 레이아웃을 세로 방향으로 배치
// - 최소 높이를 뷰포트 높이로 설정
export const RootContainer = styled(Box)(({ theme }) => ({
	display: 'flex',
	flexDirection: 'column',
	minHeight: '100vh',
	backgroundColor: theme.palette.background.default,
}));

// 콘텐츠 래퍼 스타일링
// - 내부 콘텐츠를 가로 방향으로 배치
// - overflow 처리를 위한 relative 포지셔닝
export const ContentWrapper = styled(Box)(({ theme }) => ({
	display: 'flex',
	flex: 1,
	position: 'relative',
	overflow: 'hidden',
}));

// 메인 콘텐츠 영역 스타일링
// - 드로어 상태(open)에 따라 동적으로 변화하는 영역
export const MainContent = styled(Box)(({ theme, open }) => ({
	flexGrow: 1,
	overflowY: 'auto',
	// 부드러운 전환 효과 설정 (마진과 너비에 대해)
	transition: theme.transitions.create(['margin', 'width'], {
		easing: theme.transitions.easing.sharp,
		duration: theme.transitions.duration.leavingScreen,
	}),
	padding: theme.spacing(3),
	backgroundColor: theme.palette.background.paper,

	// 데스크톱 뷰 스타일 (md 브레이크포인트 이상)
	// - 드로어가 열리면 콘텐츠가 옆으로 밀림
	[theme.breakpoints.up('md')]: {
		marginLeft: open ? `${DRAWER_WIDTH}px` : 0,
		width: `calc(100% - ${open ? DRAWER_WIDTH : 0}px)`,
	},

	// 모바일 뷰 스타일 (md 브레이크포인트 미만)
	// - 드로어가 콘텐츠 위에 오버레이 됨
	[theme.breakpoints.down('md')]: {
		marginLeft: 0,
		width: '100%',
	},
}));

// 사이드 드로어 스타일링
export const StyledDrawer = styled(Box)(({ theme, open }) => ({
	position: 'fixed', // 고정 위치
	top: 64, // 상단 AppBar 높이만큼 여백
	left: 0,
	bottom: 0,
	zIndex: theme.zIndex.drawer, // 드로어의 z-index 설정
	flexShrink: 0,
	whiteSpace: 'nowrap',
	boxSizing: 'border-box',
	overflowX: 'hidden',
	overflowY: 'auto',
	// 라이트/다크 모드에 따른 배경색 설정
	backgroundColor:
		theme.palette.mode === 'light'
			? theme.palette.grey[100]
			: theme.palette.grey[900],
	borderRight: `1px solid ${theme.palette.divider}`,
	// 기본 전환 효과 설정
	transition: theme.transitions.create('transform', {
		easing: theme.transitions.easing.sharp,
		duration: theme.transitions.duration.enteringScreen,
	}),

	// 데스크톱 뷰에서의 드로어 동작
	// - 너비 기반 애니메이션으로 드로어가 펼쳐지고 접힘
	[theme.breakpoints.up('md')]: {
		width: open ? DRAWER_WIDTH : 0,
		transform: 'none',
		transition: theme.transitions.create('width', {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.enteringScreen,
		}),
	},

	// 모바일 뷰에서의 드로어 동작
	// - transform을 사용하여 드로어를 슬라이드
	[theme.breakpoints.down('md')]: {
		width: DRAWER_WIDTH,
		transform: open ? 'translateX(0)' : `translateX(-${DRAWER_WIDTH}px)`,
	},
}));
