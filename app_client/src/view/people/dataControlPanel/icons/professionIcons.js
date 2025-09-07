import { 
	Globe, 
	Building, 
	DollarSign, 
	Landmark, 
	GraduationCap, 
	Drama, 
	Book, 
	Palette, 
	Trophy, 
	Mic, 
	Shield, 
	Users 
} from 'lucide-react';

const professionIcons = [
	{
		key: '전체',
		text: '전체',
		icon: <Globe className="w-5 h-5" />,
		to: '전체',
	},
	{
		key: '정치인',
		text: '정치인',
		icon: <Landmark className="w-5 h-5" />,
		to: '정치인',
	},
	{
		key: '지도자',
		text: '지도자',
		icon: <Users className="w-5 h-5" />,
		to: '지도자',
	},
	{
		key: '지휘관',
		text: '지휘관',
		icon: <Shield className="w-5 h-5" />,
		to: '지휘관',
	},
	{
		key: '기업가',
		text: '기업가',
		icon: <Building className="w-5 h-5" />,
		to: '기업가',
	},
	{
		key: '투자자',
		text: '투자자',
		icon: <DollarSign className="w-5 h-5" />,
		to: '투자자',
	},
	{ 
		key: '학자', 
		text: '학자', 
		icon: <GraduationCap className="w-5 h-5" />, 
		to: '학자' 
	},
	{ 
		key: '배우', 
		text: '배우', 
		icon: <Drama className="w-5 h-5" />, 
		to: '배우' 
	},
	{ 
		key: '작가', 
		text: '작가', 
		icon: <Book className="w-5 h-5" />, 
		to: '작가' 
	},
	{ 
		key: '예술인', 
		text: '예술인', 
		icon: <Palette className="w-5 h-5" />, 
		to: '예술인' 
	},
	{
		key: '스포츠인',
		text: '스포츠인',
		icon: <Trophy className="w-5 h-5" />,
		to: '스포츠인',
	},
	{
		key: '인플루엔서',
		text: '인플루엔서',
		icon: <Mic className="w-5 h-5" />,
		to: '인플루엔서',
	},
];

export default professionIcons;