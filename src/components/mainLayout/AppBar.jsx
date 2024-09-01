import React from 'react';
import { Toolbar, Typography, IconButton, Box } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { styles } from './MainLayoutStyles';

const AppBar = ({ toggleMenu, isMobile }) => {
	return (
		<styles.appBar>
			<Toolbar sx={{ justifyContent: 'space-between' }}>
				{isMobile && (
					<IconButton
						edge="start"
						color="inherit"
						aria-label="menu"
						onClick={toggleMenu}>
						<MenuIcon />
					</IconButton>
				)}
				<Typography variant="h6" component="div" sx={styles.appBarTypography}>
					<b>REACT BOLIERPLATE</b>
				</Typography>
				{isMobile && <Box sx={{ width: 48 }} />}
			</Toolbar>
		</styles.appBar>
	);
};

export default AppBar;
