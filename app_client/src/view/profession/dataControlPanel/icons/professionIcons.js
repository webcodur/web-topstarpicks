import AllInclusiveIcon from '@mui/icons-material/AllInclusive';
import BusinessIcon from '@mui/icons-material/Business';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import SchoolIcon from '@mui/icons-material/School';
import TheaterComedyIcon from '@mui/icons-material/TheaterComedy';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import PaletteIcon from '@mui/icons-material/Palette';
import SportsBasketballIcon from '@mui/icons-material/SportsBasketball';
import MicIcon from '@mui/icons-material/Mic';
import MilitaryTechIcon from '@mui/icons-material/MilitaryTech';

const professionIcons = [
	{
		key: '전체',
		text: '전체',
		icon: <AllInclusiveIcon />,
		to: '전체',
	},
	{
		key: '정치인',
		text: '정치인',
		icon: <AccountBalanceIcon />,
		to: '정치인',
	},
	{
		key: '지휘관',
		text: '지휘관',
		icon: <MilitaryTechIcon />,
		to: '지휘관',
	},
	{
		key: '기업가',
		text: '기업가',
		icon: <BusinessIcon />,
		to: '기업가',
	},
	{
		key: '투자자',
		text: '투자자',
		icon: <AttachMoneyIcon />,
		to: '투자자',
	},
	{ key: '학자', text: '학자', icon: <SchoolIcon />, to: '학자' },
	{ key: '배우', text: '배우', icon: <TheaterComedyIcon />, to: '배우' },
	{ key: '작가', text: '작가', icon: <MenuBookIcon />, to: '작가' },
	{ key: '예술인', text: '예술인', icon: <PaletteIcon />, to: '예술인' },
	{
		key: '스포츠인',
		text: '스포츠인',
		icon: <SportsBasketballIcon />,
		to: '스포츠인',
	},
	{
		key: '인플루언서',
		text: '인플루언서',
		icon: <MicIcon />,
		to: '인플루언서',
	},
];

export default professionIcons;
