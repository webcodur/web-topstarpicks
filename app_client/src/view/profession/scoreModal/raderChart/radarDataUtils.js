export const prepareRadarData = (person) => [
	{
		subject: `정치·외교 (${person.political})`,
		score: person.political || 0,
		fullMark: 10,
	},
	{
		subject: `전략·안보 (${person.strategic})`,
		score: person.strategic || 0,
		fullMark: 10,
	},
	{
		subject: `기술·과학 (${person.tech})`,
		score: person.tech || 0,
		fullMark: 10,
	},
	{
		subject: `사회·윤리 (${person.social})`,
		score: person.social || 0,
		fullMark: 10,
	},
	{
		subject: `산업·경제 (${person.economic})`,
		score: person.economic || 0,
		fullMark: 10,
	},
	{
		subject: `문화·예술 (${person.cultural})`,
		score: person.cultural || 0,
		fullMark: 10,
	},
];
