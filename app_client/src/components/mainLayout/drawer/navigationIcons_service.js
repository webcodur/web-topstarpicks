import SignpostIcon from '@mui/icons-material/Signpost';
import ContactsIcon from '@mui/icons-material/Contacts';

const navigationIcons = [
	{
		key: 'about',
		text: '제작자',
		icon: <ContactsIcon />,
		to: '/about',
	},
	{
		key: 'guide',
		text: '가이드',
		icon: <SignpostIcon />,
		to: '/guide',
	},
];

export default navigationIcons;
