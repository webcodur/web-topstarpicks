import { Signpost, ContactRound } from 'lucide-react';

const navigationIcons = [
	{
		key: 'about',
		text: '제작자',
		icon: <ContactRound className="w-5 h-5" />,
		to: '/about',
	},
	{
		key: 'guide',
		text: '가이드',
		icon: <Signpost className="w-5 h-5" />,
		to: '/guide',
	},
];

export default navigationIcons;