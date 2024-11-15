import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import StyleIcon from '@mui/icons-material/Style';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import TempleBuddhistIcon from '@mui/icons-material/TempleBuddhist';

export const CELEB_IMAGES = [
	{
		imageUrl: 'https://ik.imagekit.io/wnivma72t/closeup/1.png',
		path: '/일론-머스크/책',
	},
	{
		imageUrl: 'https://ik.imagekit.io/wnivma72t/closeup/2.png',
		path: '/도널드-트럼프/책',
	},
	{
		imageUrl: 'https://ik.imagekit.io/wnivma72t/closeup/3.png',
		path: '/알베르트-아인슈타인/책',
	},
	{
		imageUrl: 'https://ik.imagekit.io/wnivma72t/closeup/4.png',
		path: '/빌-게이츠/책',
	},
	{
		imageUrl: 'https://ik.imagekit.io/wnivma72t/closeup/5.png',
		path: '/마고-로비/책',
	},
	{
		imageUrl: 'https://ik.imagekit.io/wnivma72t/closeup/6.png',
		path: '/워렌-버핏/책',
	},
];

export const services = [
	{
		icon: <AutoStoriesIcon sx={{ fontSize: 45 }} />,
		title: '추천정보',
		path: '/people',
	},
	{
		icon: <AccountBoxIcon sx={{ fontSize: 45 }} />,
		title: '인물도감',
		path: '/people/history',
	},
	{
		icon: <AccountBalanceIcon sx={{ fontSize: 45 }} />,
		title: '전설도감',
		path: '/people/legend',
	},
	// {
	// 	icon: <TempleBuddhistIcon sx={{ fontSize: 45 }} />,
	// 	title: '신화도감',
	// 	path: '/people/myth',
	// },
	{
		icon: <StyleIcon sx={{ fontSize: 45 }} />,
		title: '카드게임',
		path: '/games',
	},
];
