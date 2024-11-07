export const JOB_EFFECTS = {
	지도자: {
		name: '카리스마',
		description: '같은 턴에 출전한 아군 카드들의 점수 +10',
		effect: (playerScore, opponentScore, gameState) => {
			return playerScore + 10;
		},
	},
	정치인: {
		name: '외교술',
		description: '상대방의 점수가 더 높을 경우, 그 차이의 50%만큼 감소',
		effect: (playerScore, opponentScore) => {
			if (opponentScore > playerScore) {
				const difference = opponentScore - playerScore;
				return playerScore + difference * 0.5;
			}
			return playerScore;
		},
	},
	지휘관: {
		name: '전술 지휘',
		description: "현재 주제가 '교전'일 경우 즉시 추가 점수 +30",
		effect: (playerScore, opponentScore, gameState) => {
			return gameState.currentTopic === 'battle'
				? playerScore + 30
				: playerScore;
		},
	},
	기업가: {
		name: '투자',
		description: '다음 턴에 사용하는 카드의 점수 +20',
		effect: (playerScore, opponentScore, gameState) => {
			gameState.nextTurnBonus = 20;
			return playerScore;
		},
	},
	투자자: {
		name: '주가 조작',
		description: '상대방 카드의 등급 점수를 한 단계 낮춤',
		effect: (playerScore, opponentScore, gameState) => {
			const rankReduction = 10;
			return [playerScore, opponentScore - rankReduction];
		},
	},
	학자: {
		name: '연구 분석',
		description: '상대방의 다음 카드 미리보기',
		effect: (playerScore, opponentScore, gameState) => {
			gameState.revealOpponentNextCard = true;
			return playerScore;
		},
	},
	예술인: {
		name: '예술적 영감',
		description: '자신의 덱에서 카드 1장 추가 드로우',
		effect: (playerScore, opponentScore, gameState) => {
			gameState.shouldDrawExtra = true;
			return playerScore;
		},
	},
	작가: {
		name: '서사 창작',
		description: '연속으로 같은 주제가 나올 경우 추가 점수 +25',
		effect: (playerScore, opponentScore, gameState) => {
			return gameState.currentTopic === gameState.previousTopic
				? playerScore + 25
				: playerScore;
		},
	},
	배우: {
		name: '변신',
		description: '이번 턴에 한해 아무 직업군의 출전 효과 복사',
		effect: (playerScore, opponentScore, gameState, opponentCard) => {
			// 상대 카드의 효과를 복사하여 사용
			const opponentEffect = JOB_EFFECTS[opponentCard.type].effect;
			return opponentEffect(playerScore, opponentScore, gameState);
		},
	},
	인플루엔서: {
		name: '트렌드 주도',
		description: '다음 턴의 주제를 원하는 것으로 변경',
		effect: (playerScore, opponentScore, gameState) => {
			gameState.canChangeNextTopic = true;
			return playerScore;
		},
	},
	스포츠인: {
		name: '승부욕',
		description: '연속으로 진 상태라면 다음 턴 점수 +40',
		effect: (playerScore, opponentScore, gameState) => {
			return gameState.consecutiveLosses > 0 ? playerScore + 40 : playerScore;
		},
	},
};
