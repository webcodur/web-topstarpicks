import React, { useCallback } from 'react';
import { ListItemIcon } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { StyledList, StyledListItemButton } from './DrawerStyles';
import navigationIcons_contents from './navigationIcons_contents';
import navigationIcons_service from './navigationIcons_service';

const Drawer = React.memo(({ isOpen, closeMenu }) => {
	const navigate = useNavigate();
	const handleNavigate = useCallback(
		(to) => {
			navigate(`/${to}`);
			closeMenu();
		},
		[navigate, closeMenu]
	);

	return (
		<>
			<StyledList>
				{navigationIcons_contents.map(({ text, to, icon }) => (
					<StyledListItemButton
						key={`${text}-${to}`}
						onClick={() => handleNavigate(to)}>
						<ListItemIcon>{icon}</ListItemIcon>
						<span className="menu-text">{text}</span>
					</StyledListItemButton>
				))}
			</StyledList>
			<StyledList>
				{navigationIcons_service.map(({ text, to, icon }) => (
					<StyledListItemButton
						key={`${text}-${to}`}
						onClick={() => handleNavigate(to)}>
						<ListItemIcon>{icon}</ListItemIcon>
						<span className="menu-text">{text}</span>
					</StyledListItemButton>
				))}
			</StyledList>
		</>
	);
});

Drawer.displayName = 'Drawer';

export default Drawer;
