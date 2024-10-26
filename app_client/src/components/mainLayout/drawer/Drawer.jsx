import React, { useCallback } from 'react';
import { ListItemIcon } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { StyledList, StyledListItemButton } from './DrawerStyles';

import navigationIcons_contents from './navigationIcons_contents';
import navigationIcons_service from './navigationIcons_service';

import { useAtom } from 'jotai';
import { menuInfoAtom } from 'store/atom';

const Drawer = React.memo(({ closeMenu }) => {
	const [, setMenuInfo] = useAtom(menuInfoAtom);

	const navigate = useNavigate();
	const handleNavigate = useCallback(
		(to, text) => {
			if (text) setMenuInfo(text);
			navigate(`${to}`);
			closeMenu();
		},
		[navigate, closeMenu, setMenuInfo]
	);

	return (
		<>
			{/* 서비스 메뉴 */}
			<StyledList>
				{navigationIcons_contents.map(({ text, to, icon }) => (
					<StyledListItemButton
						key={`${text}-${to}`}
						onClick={() => handleNavigate(to, text)}>
						<ListItemIcon>{icon}</ListItemIcon>
						<span className="menu-text">{text}</span>
					</StyledListItemButton>
				))}
			</StyledList>

			{/* 안내 메뉴 */}
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
