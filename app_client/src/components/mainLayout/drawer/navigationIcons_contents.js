import MenuBookIcon from '@mui/icons-material/MenuBook';
import PersonIcon from '@mui/icons-material/Person';
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
		text: '갤러리',
		icon: <PersonIcon />,
		to: 'gallery',
	},
	{
		key: 'game',
		text: '게임',
		icon: <SportsEsportsIcon />,
		to: 'game',
	},
];

export default navigationIcons;
