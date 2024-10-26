import MenuBookIcon from '@mui/icons-material/MenuBook';
import Groups2Icon from '@mui/icons-material/Groups2';
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';

const navigationIcons = [
	{
		key: 'recommendations',
		text: '추천정보',
		icon: <MenuBookIcon />,
		to: '/',
		set: 'y',
	},
	{
		key: 'gallery',
		text: '인물도감',
		icon: <Groups2Icon />,
		to: '/',
		set: 'y',
	},
	{
		key: 'games',
		text: '카드게임',
		icon: <SportsEsportsIcon />,
		to: '/games',
		set: 'n',
	},
];

export default navigationIcons;
