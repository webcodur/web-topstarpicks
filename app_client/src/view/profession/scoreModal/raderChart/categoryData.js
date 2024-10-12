import PublicIcon from '@mui/icons-material/Public';
import SecurityIcon from '@mui/icons-material/Security';
import ScienceIcon from '@mui/icons-material/Science';
import PeopleIcon from '@mui/icons-material/People';
import BusinessIcon from '@mui/icons-material/Business';
import PaletteIcon from '@mui/icons-material/Palette';

export const categories = (person) => [
	{
		type: '문화·예술',
		exp: person.cultural_exp,
		score: person.cultural || 0,
		desc: '문화와 예술 분야에서의 영향력과 기여도를 평가한 것이다.',
		icon: <PaletteIcon />,
		fullMark: 10,
	},
	{
		type: '정치·외교',
		exp: person.political_exp,
		score: person.political || 0,
		desc: '정치와 외교 분야에서의 영향력과 업적을 평가한 것이다.',
		icon: <PublicIcon />,
		fullMark: 10,
	},
	{
		type: '전략·안보',
		exp: person.strategic_exp,
		score: person.strategic || 0,
		desc: '전략적 사고와 국가 안보에 대한 기여도를 평가한 것이다.',
		icon: <SecurityIcon />,
		fullMark: 10,
	},
	{
		type: '산업·경제',
		exp: person.economic_exp,
		score: person.economic || 0,
		desc: '산업 발전과 경제 분야에서의 영향력을 평가한 것이다.',
		icon: <BusinessIcon />,
		fullMark: 10,
	},
	{
		type: '사회·윤리',
		exp: person.social_exp,
		score: person.social || 0,
		desc: '사회와 윤리 분야에서의 영향력과 기여도를 평가한 것이다.',
		icon: <PeopleIcon />,
		fullMark: 10,
	},
	{
		type: '기술·과학',
		exp: person.tech_exp,
		score: person.tech || 0,
		desc: '기술 혁신과 과학 발전에 대한 기여도를 평가한 것이다.',
		icon: <ScienceIcon />,
		fullMark: 10,
	},
];
