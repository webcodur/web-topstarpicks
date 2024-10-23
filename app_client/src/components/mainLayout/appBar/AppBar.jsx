import React, { memo, useState } from 'react';
import { AppBar as MuiAppBar, Toolbar, IconButton, Box } from '@mui/material';
import { styled } from '@mui/material/styles'; // 이 부분이 변경되었습니다.
import MenuIcon from '@mui/icons-material/Menu';
import SettingsIcon from '@mui/icons-material/Settings';
import BuildIcon from '@mui/icons-material/Build';
import { useTranslation } from 'react-i18next';
import SettingsModal from './SettingsModal';
import AdminLoginModal from './AdminLoginModal';
import { useNavigate, Link } from 'react-router-dom';

const StyledAppBar = styled(MuiAppBar)(({ theme }) => ({
	background: `linear-gradient(to bottom, #1A2A4A, #2C3E60)`,

	position: 'sticky',
	top: 0,
	zIndex: theme.zIndex.appBar,
	overflow: 'hidden',
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
	'&::before': {
		background: 'radial-gradient(#FFD700 1px, transparent 1px)',
		backgroundSize: '50px 50px',
		opacity: 0.3,
	},
	'&::after': {
		background: 'radial-gradient(#FFD700 1px, transparent 1px)',
		backgroundSize: '30px 30px',
		backgroundPosition: '25px 25px',
		opacity: 0.2,
	},
	'& .MuiToolbar-root': {
		position: 'relative',
		zIndex: 2,
	},
	borderBottom: '2px solid gold',
}));

const AppBar = memo(({ toggleSidebar }) => {
	const navigate = useNavigate();
	const [openSettings, setOpenSettings] = useState(false);
	const [openAdminLogin, setOpenAdminLogin] = useState(false);
	const { t } = useTranslation();

	const handleOpenSettings = () => setOpenSettings(true);
	const handleCloseSettings = () => setOpenSettings(false);

	const handleOpenAdminLogin = () => setOpenAdminLogin(true);
	const handleCloseAdminLogin = () => setOpenAdminLogin(false);

	return (
		<StyledAppBar
			position="sticky"
			sx={{
				top: 0,
				zIndex: (theme) => theme.zIndex.appBar,
			}}>
			<Toolbar sx={{ justifyContent: 'space-between' }}>
				<Box sx={{ display: 'flex', alignItems: 'center' }}>
					<IconButton
						edge="start"
						color="inherit"
						aria-label="menu"
						onClick={toggleSidebar}
						sx={{ mr: 2 }}>
						<MenuIcon />
					</IconButton>
				</Box>

				<Link to="/" style={{ textDecoration: 'none' }}>
					<Box
						component="img"
						src="/logo.png"
						alt={t('app_name')}
						sx={{
							height: '40px',
							cursor: 'pointer',
							position: 'absolute',
							left: '50%',
							top: '50%',
							transform: 'translate(-50%, -50%)',
						}}
					/>
				</Link>

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
				</Box>

				<SettingsModal open={openSettings} onClose={handleCloseSettings} />

				<AdminLoginModal
					open={openAdminLogin}
					onClose={handleCloseAdminLogin}
				/>
			</Toolbar>
		</StyledAppBar>
	);
});

export default AppBar;
