export const JOB_EFFECTS = {
	지도자: {
		name: '군주의 위엄',
		description: '모든 기본 점수 +15',
		effect: (score) => score + 15,
	},
	정치인: {
		name: '외교술',
		description: '외교 주제일 때 +25',
		effect: (score, _, gameState) => {
			return gameState.currentTopic === 'diplomacy' ? score + 25 : score;
		},
	},
	지휘관: {
		name: '전술 지휘',
		description: '교전 주제일 때 +30',
		effect: (score, _, gameState) => {
			return gameState.currentTopic === 'battle' ? score + 30 : score;
		},
	},
	기업가: {
		name: '자금력',
		description: '통치 주제일 때 +25',
		effect: (score, _, gameState) => {
			return gameState.currentTopic === 'rule' ? score + 25 : score;
		},
	},
	투자자: {
		name: '시장 조작',
		description: '상대방의 점수를 15 감소',
		effect: (score, opponentScore) => {
			return [score, opponentScore - 15];
		},
	},
	학자: {
		name: '전략 분석',
		description: '모략 주제일 때 +25',
		effect: (score, _, gameState) => {
			return gameState.currentTopic === 'strategy' ? score + 25 : score;
		},
	},
	예술인: {
		name: '예술적 영감',
		description: '다음 턴 주제와 현재 주제가 같을 때 +20',
		effect: (score, _, gameState) => {
			return gameState.currentTopic === gameState.nextTopic
				? score + 20
				: score;
		},
	},
	작가: {
		name: '서사 창작',
		description: '기본 점수 +10, 주제 보너스 +5',
		effect: (score, _, gameState) => {
			let bonus = 10;
			if (gameState.currentTopic === gameState.nextTopic) {
				bonus += 5;
			}
			return score + bonus;
		},
	},
	배우: {
		name: '변신',
		description: '상대 카드의 직군 점수 보너스를 복사',
		effect: (score, _, gameState, opponentCard) => {
			if (!opponentCard) return score;
			const opponentEffect = JOB_EFFECTS[opponentCard.type].effect;
			return opponentEffect(score, 0, gameState, null);
		},
	},
	인플루엔서: {
		name: '여론 주도',
		description: '주제 보너스를 2배로 적용',
		effect: (score, _, gameState) => {
			return score + 20;
		},
	},
	스포츠인: {
		name: '승부욕',
		description: '체력이 40 이하일 때 모든 점수 +20',
		effect: (score, _, gameState, __, isPlayer) => {
			const health = isPlayer
				? gameState.playerHealth
				: gameState.opponentHealth;
			return health <= 40 ? score + 20 : score;
		},
	},
};
