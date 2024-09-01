import React from 'react';
import { Typography, IconButton, Box } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { styles } from './MainLayoutStyles';
import { useAuth } from 'hooks/useAuth';

const Navbar = ({ toggleSidebar }) => {
	const { navigateToProfileOrLogin } = useAuth();

	return (
		<styles.navbar>
			{/* 메뉴 아이콘 */}
			<IconButton
				edge="start"
				color="inherit"
				aria-label="menu"
				onClick={toggleSidebar}
				sx={{ mr: 2 }}>
				<MenuIcon />
			</IconButton>
			{/* 서비스 타이틀 */}
			<Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
				MYAPP
			</Typography>
			{/* 마이페이지 */}
			<Box>
				<IconButton
					color="inherit"
					aria-label="profile"
					onClick={navigateToProfileOrLogin}>
					<AccountCircleIcon />
				</IconButton>
			</Box>
		</styles.navbar>
	);
};

export default Navbar;
