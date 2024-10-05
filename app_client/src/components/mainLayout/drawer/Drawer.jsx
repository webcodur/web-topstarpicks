import React, { useMemo, useCallback } from 'react';
import { ListItemIcon } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { StyledList, StyledListItemButton } from './DrawerStyles';
import useCelebNumbers from 'hooks/useCelebNumbers';
import professionIcons from './professionIcons';

const Drawer = React.memo(() => {
	const { t } = useTranslation();
	const navigate = useNavigate();
	const [celebNumbers, celebTotals] = useCelebNumbers();

	const getNumberByProfession = useMemo(() => {
		return (professionName) => {
			if (professionName === '전체') return celebTotals;
			const profession = celebNumbers.find(
				(item) => item.name === professionName
			);
			return profession ? profession.profession_count : 0;
		};
	}, [celebNumbers, celebTotals]);

	const handleNavigate = useCallback(
		(to) => {
			navigate(`/${to}`);
		},
		[navigate]
	);

	if (!celebNumbers || !celebTotals) {
		return <div>Loading...</div>; // 또는 에러 처리
	}

	return (
		<StyledList>
			{professionIcons.map(({ text, to, icon }) => (
				<StyledListItemButton
					key={`${text}-${to}`}
					onClick={() => handleNavigate(to)}>
					<ListItemIcon>{icon}</ListItemIcon>
					<span className="menu-text">
						{t(text)} ({getNumberByProfession(text)})
					</span>
				</StyledListItemButton>
			))}
		</StyledList>
	);
});

Drawer.displayName = 'Drawer';

export default Drawer;
