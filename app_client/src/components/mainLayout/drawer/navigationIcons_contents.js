import MenuBookIcon from '@mui/icons-material/MenuBook';
import HistoryEduIcon from '@mui/icons-material/HistoryEdu';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import StyleIcon from '@mui/icons-material/Style';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import TempleBuddhistIcon from '@mui/icons-material/TempleBuddhist';

const navigationIcons = [
	{
		key: 'recommendations',
		text: '추천정보',
		icon: <AutoStoriesIcon />,
		to: '/people',
	},
	{
		key: 'history',
		text: '인물도감',
		icon: <AccountBoxIcon />,
		to: '/people/history',
	},
	{
		key: 'legend',
		text: '전설도감',
		icon: <AccountBalanceIcon />,
		to: '/people/legend',
	},
	{
		key: 'myth',
		text: '신화도감',
		icon: <TempleBuddhistIcon />,
		to: '/people/myth',
	},
	{
		key: 'games',
		text: '카드게임',
		icon: <StyleIcon />,
		to: '/games',
	},
];

export default navigationIcons;
