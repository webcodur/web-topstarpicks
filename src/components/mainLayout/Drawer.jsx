import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { List, ListItem, ListItemIcon } from '@mui/material';
import { styles } from './MainLayoutStyles';
import { getMenuItems } from './MenuItems';
import { useAuth } from 'hooks/useAuth';

const Drawer = ({ isOpen, closeMenu }) => {
	const { isLoggedIn } = useAuth();

	const menuItems = useMemo(() => getMenuItems(isLoggedIn), [isLoggedIn]);

	const menuList = useMemo(
		() => (
			<List>
				{menuItems.map(({ text, path, icon }) => (
					<ListItem key={text} disablePadding>
						<styles.menuItemButton as={Link} to={path} onClick={closeMenu}>
							<ListItemIcon>{icon}</ListItemIcon>
							<span className="menu-text">{text}</span>
						</styles.menuItemButton>
					</ListItem>
				))}
			</List>
		),
		[closeMenu, menuItems]
	);

	return <styles.drawer isOpen={isOpen}>{menuList}</styles.drawer>;
};

export default Drawer;
