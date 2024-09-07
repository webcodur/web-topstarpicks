import React from 'react';
import { useTranslation } from 'react-i18next';

import AllInclusiveIcon from '@mui/icons-material/AllInclusive';
import TheatersIcon from '@mui/icons-material/Theaters';
import SportsBasketballIcon from '@mui/icons-material/SportsBasketball';
import BusinessIcon from '@mui/icons-material/Business';
import PaletteIcon from '@mui/icons-material/Palette';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import SchoolIcon from '@mui/icons-material/School';
import PersonAddIcon from '@mui/icons-material/PersonAdd';

import { celebData } from 'store/content/celebData';

export const useItems_jobs = () => {
	const { t } = useTranslation();

	// 직업군별 인원 수
	const jobCounts = celebData.reduce((acc, celeb) => {
		acc[celeb.jobType] = (acc[celeb.jobType] || 0) + 1;
		return acc;
	}, {});

	// 전체 인원 수
	const totalCount = celebData.length;

	return [
		{ text: `전체 (${totalCount})`, to: 'all', icon: <AllInclusiveIcon /> },
		{
			text: `배우 (${jobCounts['actor'] || 0})`,
			to: 'actor',
			icon: <TheatersIcon />,
		},
		{
			text: `운동선수 (${jobCounts['athlete'] || 0})`,
			to: 'athlete',
			icon: <SportsBasketballIcon />,
		},
		{
			text: `기업인 (${jobCounts['entrepreneur'] || 0})`,
			to: 'entrepreneur',
			icon: <BusinessIcon />,
		},
		{
			text: `예술가 (${jobCounts['artist'] || 0})`,
			to: 'artist',
			icon: <PaletteIcon />,
		},
		{
			text: `정치인 (${jobCounts['politician'] || 0})`,
			to: 'politician',
			icon: <AccountBalanceIcon />,
		},
		{
			text: `학자 (${jobCounts['scholar'] || 0})`,
			to: 'scholar',
			icon: <SchoolIcon />,
		},
		{
			text: `인플루엔서 (${jobCounts['influencer'] || 0})`,
			to: 'influencer',
			icon: <PersonAddIcon />,
		},
	];
};

export default function JobList() {
	const items = useItems_jobs();

	return (
		<ul>
			{items.map((item, index) => (
				<li key={index}>
					{item.icon} {item.text}
				</li>
			))}
		</ul>
	);
}
