import { BookOpen, History, BookMarked, Sparkles, Layers, User, Building, Home } from 'lucide-react';

const navigationIcons = [
	{
		key: 'recommendations',
		text: '추천정보',
		icon: <BookMarked className="w-5 h-5" />,
		to: '/people',
	},
	{
		key: 'history',
		text: '인물도감',
		icon: <User className="w-5 h-5" />,
		to: '/people/history',
	},
	{
		key: 'legend',
		text: '전설도감',
		icon: <Building className="w-5 h-5" />,
		to: '/people/legend',
	},
	// {
	// 	key: 'myth',
	// 	text: '신화도감',
	// 	icon: <Home className="w-5 h-5" />,
	// 	to: '/people/myth',
	// },
	{
		key: 'games',
		text: '카드게임',
		icon: <Layers className="w-5 h-5" />,
		to: '/games',
	},
];

export default navigationIcons;