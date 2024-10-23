import MenuBookIcon from '@mui/icons-material/MenuBook';
import SignpostIcon from '@mui/icons-material/Signpost';
import ContactsIcon from '@mui/icons-material/Contacts';

const navigationIcons = [
	{
		key: 'profession',
		text: '추천 콘텐츠',
		icon: <MenuBookIcon />,
		to: '전체',
	},
	{
		key: 'guide',
		text: '활용 가이드',
		icon: <SignpostIcon />,
		to: 'guide',
	},
	{
		key: 'about',
		text: '제작자',
		icon: <ContactsIcon />,
		to: 'about',
	},
];

export default navigationIcons;
