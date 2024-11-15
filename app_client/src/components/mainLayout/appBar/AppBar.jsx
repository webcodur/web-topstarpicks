import React, { memo, useState } from 'react';
import { motion } from 'framer-motion';
import { IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import SettingsIcon from '@mui/icons-material/Settings';
import BuildIcon from '@mui/icons-material/Build';
import { useTranslation } from 'react-i18next';
import SettingsModal from './SettingsModal';
import AdminLoginModal from './AdminLoginModal';
import { Link } from 'react-router-dom';
import {
	StyledAppBar,
	StyledToolbar,
	MenuButtonContainer,
	LogoImage,
	IconButtonContainer,
	MenuIconButton,
} from './AppBarStyles';

/**
 * 애플리케이션의 상단 네비게이션 바 컴포넌트
 *
 * @component
 * @param {Object} props
 * @param {Function} props.toggleSidebar - 사이드바 토글 함수
 *
 * @returns {React.ReactElement} 렌더링된 AppBar 컴포넌트
 */
const AppBar = memo(({ toggleSidebar }) => {
	const [openSettings, setOpenSettings] = useState(false);
	const [openAdminLogin, setOpenAdminLogin] = useState(false);
	const { t } = useTranslation();

	const handleOpenSettings = () => setOpenSettings(true);
	const handleCloseSettings = () => setOpenSettings(false);

	const handleOpenAdminLogin = () => setOpenAdminLogin(true);
	const handleCloseAdminLogin = () => setOpenAdminLogin(false);

	return (
		<StyledAppBar
			as={motion.div}
			variant="square"
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			transition={{ duration: 0.5 }}>
			<StyledToolbar>
				<MenuButtonContainer>
					<MenuIconButton
						edge="start"
						color="inherit"
						aria-label="menu"
						onClick={toggleSidebar}>
						<MenuIcon />
					</MenuIconButton>
				</MenuButtonContainer>

				<Link to="/" style={{ textDecoration: 'none' }}>
					<LogoImage component="img" src="/logo.png" alt={t('app_name')} />
				</Link>

				<IconButtonContainer>
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
				</IconButtonContainer>

				<SettingsModal open={openSettings} onClose={handleCloseSettings} />
				<AdminLoginModal
					open={openAdminLogin}
					onClose={handleCloseAdminLogin}
				/>
			</StyledToolbar>
		</StyledAppBar>
	);
});

export default AppBar;
