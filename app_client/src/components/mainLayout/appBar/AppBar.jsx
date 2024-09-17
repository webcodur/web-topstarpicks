import React, { memo, useState } from 'react';
import {
	AppBar as MuiAppBar,
	Toolbar,
	IconButton,
	Box,
	Button,
} from '@mui/material';
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

const AppBar = memo(({ toggleSidebar }) => {
	const navigate = useNavigate();
	const { navigateToProfileOrLogin } = useAuth();
	const [openSettings, setOpenSettings] = useState(false);
	const [openAdminLogin, setOpenAdminLogin] = useState(false);
	const { t } = useTranslation();

	const handleOpenSettings = () => setOpenSettings(true);
	const handleCloseSettings = () => setOpenSettings(false);
	const handleNavigateHome = () => navigate('/');
	const handleOpenAdminLogin = () => setOpenAdminLogin(true);
	const handleCloseAdminLogin = () => setOpenAdminLogin(false);

	return (
		<MuiAppBar position="static">
			<Toolbar>
				<IconButton
					edge="start"
					color="inherit"
					aria-label="menu"
					onClick={toggleSidebar}
					sx={{ mr: 2 }}>
					<MenuIcon />
				</IconButton>

				<Button
					variant="h6"
					component="div"
					sx={{ flexGrow: 1 }}
					onClick={handleNavigateHome}>
					{t('app_name')}
				</Button>

				<Box sx={{ display: 'flex', alignItems: 'center' }}>
					<CategorySelect />

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

				<SettingsModal open={openSettings} onClose={handleCloseSettings} />
				<AdminLoginModal
					open={openAdminLogin}
					onClose={handleCloseAdminLogin}
				/>
			</Toolbar>
		</MuiAppBar>
	);
});

export default AppBar;
