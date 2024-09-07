import React, { useMemo } from 'react';
import { ListItemIcon } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import { useItems_jobs } from './type_celeb';

import { useAuth } from 'hooks/useAuth';
import { useTranslation } from 'react-i18next';
import { StyledList, StyledListItemButton } from './DrawerStyles';

const Drawer = () => {
	const { isLoggedIn } = useAuth();
	const { t } = useTranslation();
	const navigate = useNavigate();

	const jobs = useItems_jobs(isLoggedIn);

	const menuList = useMemo(
		() => (
			<StyledList>
				{jobs.map(({ text, to, icon }) => (
					<StyledListItemButton
						key={text}
						onClick={() => {
							navigate(`/${to}`);
						}}>
						<ListItemIcon>{icon}</ListItemIcon>
						<span className="menu-text">{t(text)}</span>
					</StyledListItemButton>
				))}
			</StyledList>
		),
		[t, jobs, navigate]
	);

	return menuList;
};

export default Drawer;
