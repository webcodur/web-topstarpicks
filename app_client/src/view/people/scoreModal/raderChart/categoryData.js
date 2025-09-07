import { Globe, Shield, Microscope, Users, Building2, Palette } from 'lucide-react';

export const categories = (person) => [
	{
		type: '문화·예술',
		exp: person.cultural_exp,
		score: person.cultural || 0,
		desc: '문화와 예술 분야에서의 영향력과 기여도를 평가한 것이다.',
		icon: <Palette />,
		fullMark: 10,
	},
	{
		type: '정치·외교',
		exp: person.political_exp,
		score: person.political || 0,
		desc: '정치와 외교 분야에서의 영향력과 업적을 평가한 것이다.',
		icon: <Globe />,
		fullMark: 10,
	},
	{
		type: '전략·안보',
		exp: person.strategic_exp,
		score: person.strategic || 0,
		desc: '전략적 사고와 국가 안보에 대한 기여도를 평가한 것이다.',
		icon: <Shield />,
		fullMark: 10,
	},
	{
		type: '산업·경제',
		exp: person.economic_exp,
		score: person.economic || 0,
		desc: '산업 발전과 경제 분야에서의 영향력을 평가한 것이다.',
		icon: <Building2 />,
		fullMark: 10,
	},
	{
		type: '사회·윤리',
		exp: person.social_exp,
		score: person.social || 0,
		desc: '사회와 윤리 분야에서의 영향력과 기여도를 평가한 것이다.',
		icon: <Users />,
		fullMark: 10,
	},
	{
		type: '기술·과학',
		exp: person.tech_exp,
		score: person.tech || 0,
		desc: '기술 혁신과 과학 발전에 대한 기여도를 평가한 것이다.',
		icon: <Microscope />,
		fullMark: 10,
	},
];
