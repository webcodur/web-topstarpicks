// AppBarStyles.js
import styled from '@emotion/styled';
import { Paper, AppBar, Toolbar, Box, IconButton } from '@mui/material';

// 설정 모달의 컨테이너 스타일링
// 모달을 화면 중앙에 위치시키고 기본 스타일을 정의
export const SettingsModalContainer = styled(Paper)(({ theme }) => ({
	position: 'absolute',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	width: 400,
	padding: theme.spacing(4),
	borderRadius: theme.shape.borderRadius,
}));

// 설정 모달의 헤더 섹션 스타일링
// 제목과 닫기 버튼을 양쪽 끝에 배치
export const SettingsModalHeader = styled('div')(({ theme }) => ({
	display: 'flex',
	justifyContent: 'space-between',
	alignItems: 'center',
	marginBottom: theme.spacing(2),
}));

// 언어 선택 드롭다운의 래퍼 스타일링
export const LanguageSelectWrapper = styled('div')(({ theme }) => ({
	marginTop: theme.spacing(2),
}));

// 메인 AppBar 컴포넌트 스타일링
// 그라데이션 배경과 골드 파티클 효과를 포함
export const StyledAppBar = styled(Paper)(({ theme }) => ({
	position: 'fixed',
	top: 0,
	left: 0,
	right: 0,
	height: '64px',
	zIndex: theme.zIndex.drawer + 1,
	backgroundColor: theme.palette.primary.main,
	color: theme.palette.primary.contrastText,

	// 파티클 효과를 위한 공통 스타일
	'&::before, &::after': {
		content: '""',
		position: 'absolute',
		top: 0,
		left: 0,
		right: 0,
		bottom: 0,
		pointerEvents: 'none',
		zIndex: 1,
	},

	// 첫 번째 파티클 레이어
	'&::before': {
		background: 'radial-gradient(#FFD700 1px, transparent 1px)',
		backgroundSize: '50px 50px',
		opacity: 0.3,
	},

	// 두 번째 파티클 레이어 (오프셋 적용)
	'&::after': {
		background: 'radial-gradient(#FFD700 1px, transparent 1px)',
		backgroundSize: '30px 30px',
		backgroundPosition: '25px 25px',
		opacity: 0.2,
	},

	// 툴바가 파티클 위에 보이도록 z-index 설정
	'& .MuiToolbar-root': {
		position: 'relative',
		zIndex: 2,
	},
	borderBottom: '2px solid gold',
}));

// 툴바 컴포넌트 스타일링
// 내부 요소들을 양쪽 끝으로 정렬
export const StyledToolbar = styled(Toolbar)({
	justifyContent: 'space-between',
	height: '64px',
	minHeight: '64px !important',
});

// 메뉴 버튼 컨테이너 스타일링
export const MenuButtonContainer = styled(Box)({
	display: 'flex',
	alignItems: 'center',
});

// 로고 이미지 스타일링
// 툴바 중앙에 위치하도록 설정
export const LogoImage = styled(Box)({
	height: '40px',
	cursor: 'pointer',
	position: 'absolute',
	left: '50%',
	top: '50%',
	transform: 'translate(-50%, -50%)',
});

// 우측 아이콘 버튼들의 컨테이너 스타일링
export const IconButtonContainer = styled(Box)({
	display: 'flex',
	alignItems: 'center',
});

// 메뉴 아이콘 버튼 스타일링
export const MenuIconButton = styled(IconButton)(({ theme }) => ({
	marginRight: theme.spacing(2),
}));
