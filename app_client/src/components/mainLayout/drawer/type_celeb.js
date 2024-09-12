import React from 'react';
import { useTranslation } from 'react-i18next';

import AllInclusiveIcon from '@mui/icons-material/AllInclusive';
import BusinessIcon from '@mui/icons-material/Business';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import SchoolIcon from '@mui/icons-material/School';
import TheatersIcon from '@mui/icons-material/Theaters';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import PaletteIcon from '@mui/icons-material/Palette';
import SportsBasketballIcon from '@mui/icons-material/SportsBasketball';
import PersonAddIcon from '@mui/icons-material/PersonAdd';

import { celebData } from 'store/content/celebData';

export const useItems_jobs = () => {
	const { t } = useTranslation();

	// 직업 유형 정의
	const jobTypes = [
		{
			key: '기업가',
			text: '기업가',
			icon: <BusinessIcon />,
			to: 'entrepreneur',
		},
		{
			key: '투자자',
			text: '투자자',
			icon: <AccountBalanceWalletIcon />,
			to: 'investor',
		},
		{
			key: '정치인',
			text: '정치인',
			icon: <AccountBalanceIcon />,
			to: 'politician',
		},
		{ key: '학자', text: '학자', icon: <SchoolIcon />, to: 'scholar' },
		{ key: '배우', text: '배우', icon: <TheatersIcon />, to: 'actor' },
		{ key: '작가', text: '작가', icon: <MenuBookIcon />, to: 'writer' },
		{ key: '아티스트', text: '아티스트', icon: <PaletteIcon />, to: 'artist' },
		{
			key: '스포츠인',
			text: '스포츠인',
			icon: <SportsBasketballIcon />,
			to: 'athlete',
		},
		{
			key: '인플루엔서',
			text: '인플루엔서',
			icon: <PersonAddIcon />,
			to: 'influencer',
		},
	];

	// 직업군별 인원 수 계산
	const jobCounts = celebData.reduce((acc, celeb) => {
		acc[celeb.jobType] = (acc[celeb.jobType] || 0) + 1;
		return acc;
	}, {});

	// 전체 인원 수
	const totalCount = celebData.length;

	// 직업별 아이템 생성
	const jobItems = jobTypes.map((job) => ({
		text: `${job.text} (${jobCounts[job.key] || 0})`,
		to: job.to,
		icon: job.icon,
	}));

	// 전체 아이템을 맨 앞에 추가
	return [
		{ text: `전체 (${totalCount})`, to: 'all', icon: <AllInclusiveIcon /> },
		...jobItems,
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
