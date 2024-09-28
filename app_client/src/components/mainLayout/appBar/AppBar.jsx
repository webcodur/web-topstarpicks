import React, { memo, useState } from 'react';
import { AppBar as MuiAppBar, Toolbar, IconButton, Box } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SettingsIcon from '@mui/icons-material/Settings';
import BuildIcon from '@mui/icons-material/Build';
import { useAuth } from 'hooks/useAuth';
import { useTranslation } from 'react-i18next';
import CategorySelect from './CategorySelect';
import SettingsModal from './SettingsModal';
import AdminLoginModal from './AdminLoginModal';
import { useNavigate } from 'react-router-dom';

// AppBar 컴포넌트: 애플리케이션의 상단 바를 구성하는 메인 컴포넌트
const AppBar = memo(({ toggleSidebar }) => {
	const navigate = useNavigate();
	const { navigateToProfileOrLogin } = useAuth();
	const [openSettings, setOpenSettings] = useState(false);
	const [openAdminLogin, setOpenAdminLogin] = useState(false);
	const { t } = useTranslation();

	// 설정 모달 열기/닫기 핸들러
	const handleOpenSettings = () => setOpenSettings(true);
	const handleCloseSettings = () => setOpenSettings(false);

	// 홈으로 이동하는 핸들러
	const handleNavigateHome = () => navigate('/');

	// 관리자 로그인 모달 열기/닫기 핸들러
	const handleOpenAdminLogin = () => setOpenAdminLogin(true);
	const handleCloseAdminLogin = () => setOpenAdminLogin(false);

	return (
		<MuiAppBar position="static">
			<Toolbar sx={{ justifyContent: 'space-between' }}>
				{/* 왼쪽 영역: 메뉴 아이콘과 카테고리 선택 */}
				<Box sx={{ display: 'flex', alignItems: 'center' }}>
					<IconButton
						edge="start"
						color="inherit"
						aria-label="menu"
						onClick={toggleSidebar}
						sx={{ mr: 2 }}>
						<MenuIcon />
					</IconButton>
					<CategorySelect />
				</Box>

				{/* 중앙 영역: 로고 */}
				<Box
					component="img"
					src="/logo.png" // public 폴더의 logo.png를 직접 참조
					alt={t('app_name')}
					onClick={handleNavigateHome}
					sx={{
						height: '40px', // 로고의 높이를 조절합니다
						cursor: 'pointer',
						position: 'absolute',
						left: '50%',
						transform: 'translateX(-50%)',
					}}
				/>

				{/* 오른쪽 영역: 설정, 관리자, 프로필 아이콘 */}
				<Box sx={{ display: 'flex', alignItems: 'center' }}>
					<IconButton
						color="inherit"
						aria-label="settings"
						onClick={handleOpenSettings}>
						<SettingsIcon />
					</IconButton>

					<IconButton
						color="inherit"
						aria-label="admin"
						onClick={handleOpenAdminLogin}>
						<BuildIcon />
					</IconButton>

					<IconButton
						color="inherit"
						aria-label="profile"
						onClick={navigateToProfileOrLogin}>
						<AccountCircleIcon />
					</IconButton>
				</Box>

				{/* 설정 모달 */}
				<SettingsModal open={openSettings} onClose={handleCloseSettings} />

				{/* 관리자 로그인 모달 */}
				<AdminLoginModal
					open={openAdminLogin}
					onClose={handleCloseAdminLogin}
				/>
			</Toolbar>
		</MuiAppBar>
	);
});

export default AppBar;
