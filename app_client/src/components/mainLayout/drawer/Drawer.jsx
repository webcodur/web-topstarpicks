import React, { useState, useEffect } from 'react';
import { ListItemIcon } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import professionTypes from './professionTypes';
import { useTranslation } from 'react-i18next';
import { StyledList, StyledListItemButton } from './DrawerStyles';

const Drawer = () => {
	const { t } = useTranslation();
	const navigate = useNavigate();
	const [numbers, setNumbers] = useState(null);
	const [totalCount, setTotalCount] = useState(null);

	const fetchCelebritiesNumber = async () => {
		try {
			const response = await fetch(
				'http://localhost:4000/api/celebrities/profession-numbers'
			);
			if (!response.ok) throw new Error('네트워크 오류 발생');
			const res = await response.json();
			return res.data;
		} catch (error) {
			console.error('직군 별 숫자 파악 실패:', error);
		}
	};

	useEffect(() => {
		(async () => {
			const result = await fetchCelebritiesNumber();
			let totalCount = result.reduce(
				(acc, item) => acc + item.profession_count,
				0
			);
			setTotalCount(totalCount);
			setNumbers(result);
		})();
	}, []);

	const getNumberByProfession = (text) => {
		if (text === '전체') return totalCount;
		const profession = numbers.find((item) => item.profession === text);
		return profession ? profession.profession_count : 0;
	};

	if (!numbers || totalCount === 0) return null;
	return (
		<StyledList>
			{professionTypes.map(({ text, to, icon }) => (
				<StyledListItemButton key={text} onClick={() => navigate(`/${to}`)}>
					<ListItemIcon>{icon}</ListItemIcon>
					<span className="menu-text">
						{t(text)} ({getNumberByProfession(text)})
					</span>
				</StyledListItemButton>
			))}
		</StyledList>
	);
};

export default Drawer;
