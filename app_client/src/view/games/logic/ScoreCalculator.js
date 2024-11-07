import { JOB_EFFECTS } from '../constants/jobEffects';

export class ScoreCalculator {
	static calculateScore(playerCard, opponentCard, gameState) {
		let playerScore = playerCard.rankScore;
		let opponentScore = opponentCard.rankScore;

		// 기본 점수에 이전 턴 보너스 적용
		if (gameState.nextTurnBonus) {
			playerScore += gameState.nextTurnBonus;
			gameState.nextTurnBonus = 0;
		}

		// 직군 효과 적용
		const playerEffect = JOB_EFFECTS[playerCard.type].effect;
		const [newPlayerScore, newOpponentScore] = this.applyEffect(
			playerEffect,
			playerScore,
			opponentScore,
			gameState,
			opponentCard
		);

		return {
			playerScore: newPlayerScore,
			opponentScore: newOpponentScore,
			effectDescription: JOB_EFFECTS[playerCard.type].description,
		};
	}

	static applyEffect(
		effect,
		playerScore,
		opponentScore,
		gameState,
		opponentCard
	) {
		const result = effect(playerScore, opponentScore, gameState, opponentCard);

		// 효과가 배열을 반환하면 양쪽 점수 모두 수정
		if (Array.isArray(result)) {
			return result;
		}

		// 단일 값을 반환하면 플레이어 점수만 수정
		return [result, opponentScore];
	}
}
