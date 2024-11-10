import MenuBookIcon from '@mui/icons-material/MenuBook';
import HistoryEduIcon from '@mui/icons-material/HistoryEdu';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';

const navigationIcons = [
	{
		key: 'recommendations',
		text: '추천정보',
		icon: <MenuBookIcon />,
		to: '/people',
	},

	{
		key: 'history',
		text: '인물도감',
		icon: <HistoryEduIcon />,
		to: '/people/history',
	},
	{
		key: 'legend',
		text: '전설도감',
		icon: <AutoStoriesIcon />,
		to: '/people/legend',
	},
	{
		key: 'myth',
		text: '신화도감',
		icon: <AutoAwesomeIcon />,
		to: '/people/myth',
	},
	{
		key: 'games',
		text: '카드게임',
		icon: <SportsEsportsIcon />,
		to: '/games',
	},
];

export default navigationIcons;
