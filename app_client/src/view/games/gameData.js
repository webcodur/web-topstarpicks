// 직군별 행동 보너스 데이터
export const jobBonusData = {
	지도자: {
		rule: 25,
		diplomacy: 20,
		battle: 10,
		strategy: -10,
	},
	정치인: {
		rule: 15,
		diplomacy: 25,
		battle: -5,
		strategy: 20,
	},
	지휘관: {
		rule: 10,
		diplomacy: -5,
		battle: 25,
		strategy: -10,
	},
	기업가: {
		rule: 20,
		diplomacy: 20,
		battle: -10,
		strategy: 15,
	},
	투자자: {
		rule: 10,
		diplomacy: 20,
		battle: -10,
		strategy: 25,
	},
	학자: {
		rule: 15,
		diplomacy: 15,
		battle: -5,
		strategy: 20,
	},
	예술인: {
		rule: 5,
		diplomacy: 15,
		battle: -10,
		strategy: 25,
	},
	작가: {
		rule: 5,
		diplomacy: 20,
		battle: -10,
		strategy: 20,
	},
	배우: {
		rule: 0,
		diplomacy: 15,
		battle: -10,
		strategy: 20,
	},
	인플루엔서: {
		rule: 5,
		diplomacy: 15,
		battle: -10,
		strategy: 15,
	},
	스포츠인: {
		rule: 10,
		diplomacy: -5,
		battle: 20,
		strategy: -10,
	},
};

// 등급별 점수
export const rankScores = {
	S: 60,
	A: 50,
	B: 40,
	C: 30,
	D: 20,
};

// 가상의 인물 카드 30장
export const characterCards = [
	// S등급 캐릭터 (6장)
	{
		id: '1',
		name: '김영웅',
		type: '지도자',
		rank: 'S',
		description: '전 세계적 영향력을 가진 카리스마 넘치는 지도자',
	},
	{
		id: '2',
		name: '박정도',
		type: '정치인',
		rank: 'S',
		description: '국제 외교의 대가로 알려진 정치인',
	},
	{
		id: '3',
		name: '이무적',
		type: '지휘관',
		rank: 'S',
		description: '전략적 천재로 불리는 군사 지휘관',
	},
	{
		id: '4',
		name: '정상업',
		type: '기업가',
		rank: 'S',
		description: '글로벌 기업을 일군 혁신적 기업가',
	},
	{
		id: '5',
		name: '강부자',
		type: '투자자',
		rank: 'S',
		description: '세계 금융을 좌우하는 전설적 투자자',
	},
	{
		id: '6',
		name: '한별이',
		type: '배우',
		rank: 'S',
		description: '세계적 명성을 가진 아카데미 수상 배우',
	},

	// A등급 캐릭터 (8장)
	{
		id: '7',
		name: '최민국',
		type: '정치인',
		rank: 'A',
		description: '차세대 정치 리더',
	},
	{
		id: '8',
		name: '유명가',
		type: '예술인',
		rank: 'A',
		description: '현대 미술계의 새로운 별',
	},
	{
		id: '9',
		name: '송필력',
		type: '작가',
		rank: 'A',
		description: '베스트셀러 작가',
	},
	{
		id: '10',
		name: '장투자',
		type: '투자자',
		rank: 'A',
		description: '신예 투자 전문가',
	},
	{
		id: '11',
		name: '윤체육',
		type: '스포츠인',
		rank: 'A',
		description: '올림픽 금메달리스트',
	},
	{
		id: '12',
		name: '구소셜',
		type: '인플루엔서',
		rank: 'A',
		description: '1000만 팔로워를 보유한 인플루엔서',
	},
	{
		id: '13',
		name: '남전략',
		type: '지휘관',
		rank: 'A',
		description: '특수작전 전문가',
	},
	{
		id: '14',
		name: '오사업',
		type: '기업가',
		rank: 'A',
		description: '스타트업 성공신화의 주인공',
	},

	// B등급 캐릭터 (8장)
	{
		id: '15',
		name: '진학자',
		type: '학자',
		rank: 'B',
		description: '신진 이론물리학자',
	},
	{
		id: '16',
		name: '권투자',
		type: '투자자',
		rank: 'B',
		description: '급성장중인 펀드매니저',
	},
	{
		id: '17',
		name: '신예술',
		type: '예술인',
		rank: 'B',
		description: '실험적인 현대미술가',
	},
	{
		id: '18',
		name: '임창작',
		type: '작가',
		rank: 'B',
		description: '신인상 수상 작가',
	},
	{
		id: '19',
		name: '배연기',
		type: '배우',
		rank: 'B',
		description: '차세대 주연배우',
	},
	{
		id: '20',
		name: '도영향',
		type: '인플루엔서',
		rank: 'B',
		description: '떠오르는 1인 미디어 스타',
	},
	{
		id: '21',
		name: '황지휘',
		type: '지휘관',
		rank: 'B',
		description: '전술 전문가',
	},
	{
		id: '22',
		name: '조사업',
		type: '기업가',
		rank: 'B',
		description: '혁신적인 청년사업가',
	},

	// C등급 캐릭터 (5장)
	{
		id: '23',
		name: '마정치',
		type: '정치인',
		rank: 'C',
		description: '지역구 국회의원',
	},
	{
		id: '24',
		name: '가창작',
		type: '작가',
		rank: 'C',
		description: '신인 웹소설 작가',
	},
	{
		id: '25',
		name: '나운동',
		type: '스포츠인',
		rank: 'C',
		description: '프로구단 선수',
	},
	{
		id: '26',
		name: '다연예',
		type: '배우',
		rank: 'C',
		description: '조연배우',
	},
	{
		id: '27',
		name: '라투자',
		type: '투자자',
		rank: 'C',
		description: '주식투자 전문가',
	},

	// D등급 캐릭터 (3장)
	{
		id: '28',
		name: '사영향',
		type: '인플루엔서',
		rank: 'D',
		description: '신규 콘텐츠 크리에이터',
	},
	{
		id: '29',
		name: '아학문',
		type: '학자',
		rank: 'D',
		description: '대학원생 연구원',
	},
	{
		id: '30',
		name: '자예술',
		type: '예술인',
		rank: 'D',
		description: '신인 예술가',
	},
];

// 전체 카드 정보를 생성하는 함수
export const generateFullCardData = () => {
	return characterCards.map((card) => ({
		...card,
		rankScore: rankScores[card.rank],
		bonus: {
			rule: jobBonusData[card.type]?.rule || 0,
			diplomacy: jobBonusData[card.type]?.diplomacy || 0,
			battle: jobBonusData[card.type]?.battle || 0,
			strategy: jobBonusData[card.type]?.strategy || 0,
		},
	}));
};

// 사용 예시:
// const fullCardData = generateFullCardData();
// console.log(fullCardData);
// 결과:
// [
//   {
//     id: "1",
//     name: "김영웅",
//     type: "지도자",
//     rank: "S",
//     description: "전 세계적 영향력을 가진 카리스마 넘치는 지도자",
//     rankScore: 60,
//     bonus: {
//       rule: 25,
//       diplomacy: 20,
//       battle: 10,
//       strategy: -10
//     }
//   },
//   ...
// ]
