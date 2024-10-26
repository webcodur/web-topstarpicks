import MenuBookIcon from '@mui/icons-material/MenuBook';
import Groups2Icon from '@mui/icons-material/Groups2';
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';

const navigationIcons = [
	{
		key: 'profession',
		text: '추천정보',
		icon: <MenuBookIcon />,
		to: '전체',
	},
	{
		key: 'gallery',
		text: '인물도감',
		icon: <Groups2Icon />,
		to: 'gallery',
	},
	{
		key: 'games',
		text: '카드게임',
		icon: <SportsEsportsIcon />,
		to: 'games',
	},
];

export default navigationIcons;
