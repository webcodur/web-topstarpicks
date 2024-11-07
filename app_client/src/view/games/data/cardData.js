/**
 * 게임에서 사용되는 카드 데이터 생성
 * 각 카드는 고유 ID, 이름, 타입, 등급, 기본 점수, 행동별 보너스 점수를 가짐
 */
export function generateFullCardData() {
	return [
		// 통치 계열 카드
		{
			id: 1,
			name: '왕권신수설',
			type: '통치',
			rank: 'S',
			rankScore: 90,
			description: '군주의 권력은 신으로부터 부여받은 것이다.',
			bonus: {
				rule: 30,
				diplomacy: 10,
				battle: 0,
				strategy: 15,
			},
		},
		{
			id: 2,
			name: '군주론',
			type: '통치',
			rank: 'A',
			rankScore: 80,
			description: '군주가 갖추어야 할 덕목과 통치술을 논하다.',
			bonus: {
				rule: 25,
				diplomacy: 15,
				battle: 5,
				strategy: 20,
			},
		},
		// 외교 계열 카드
		{
			id: 3,
			name: '조공체제',
			type: '외교',
			rank: 'S',
			rankScore: 90,
			description: '예물을 바쳐 평화로운 관계를 유지한다.',
			bonus: {
				rule: 10,
				diplomacy: 30,
				battle: 0,
				strategy: 15,
			},
		},
		{
			id: 4,
			name: '혼인동맹',
			type: '외교',
			rank: 'A',
			rankScore: 80,
			description: '혼인을 통해 동맹 관계를 맺다.',
			bonus: {
				rule: 15,
				diplomacy: 25,
				battle: 5,
				strategy: 10,
			},
		},
		// 전투 계열 카드
		{
			id: 5,
			name: '십만양병',
			type: '전투',
			rank: 'S',
			rankScore: 90,
			description: '대규모 군대를 동원하여 압도적인 승리를 거두다.',
			bonus: {
				rule: 0,
				diplomacy: 5,
				battle: 30,
				strategy: 15,
			},
		},
		{
			id: 6,
			name: '기병전술',
			type: '전투',
			rank: 'A',
			rankScore: 80,
			description: '기동력 있는 기병을 활용한 전술.',
			bonus: {
				rule: 5,
				diplomacy: 0,
				battle: 25,
				strategy: 20,
			},
		},
		// 전략 계열 카드
		{
			id: 7,
			name: '반간계',
			type: '전략',
			rank: 'S',
			rankScore: 90,
			description: '적의 내부를 교란시켜 승리를 거두다.',
			bonus: {
				rule: 10,
				diplomacy: 15,
				battle: 5,
				strategy: 30,
			},
		},
		{
			id: 8,
			name: '첩자활용',
			type: '전략',
			rank: 'A',
			rankScore: 80,
			description: '적진에 첩자를 심어 정보를 얻다.',
			bonus: {
				rule: 5,
				diplomacy: 10,
				battle: 15,
				strategy: 25,
			},
		},
	];
}
