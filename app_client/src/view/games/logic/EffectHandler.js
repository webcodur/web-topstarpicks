import { INITIAL_HEALTH } from '../constants';

export class EffectHandler {
	static applyEffects(
		gameState,
		playerScore,
		opponentScore,
		playerAction,
		opponentAction
	) {
		if (playerScore === opponentScore) return;

		const winner = playerScore > opponentScore ? 'player' : 'opponent';
		const winnerAction =
			playerScore > opponentScore ? playerAction : opponentAction;

		if (this.isStrategyDuel(playerAction, opponentAction)) {
			this.handleStrategyDuel(gameState, winner);
			return;
		}

		this.applyActionEffect(gameState, winner, winnerAction);
	}

	static isStrategyDuel(playerAction, opponentAction) {
		return playerAction === 'strategy' && opponentAction === 'strategy';
	}

	static handleStrategyDuel(gameState, winner) {
		const damage = 15;
		if (winner === 'player') {
			gameState.player2Health = Math.max(0, gameState.player2Health - damage);
		} else {
			gameState.player1Health = Math.max(0, gameState.player1Health - damage);
		}
	}

	static applyActionEffect(gameState, winner, action) {
		const effects = {
			rule: () => this.applyRuleEffect(gameState, winner),
			diplomacy: () => this.applyDiplomacyEffect(gameState, winner),
			battle: () => this.applyBattleEffect(gameState, winner),
			strategy: () => this.applyStrategyEffect(gameState, winner),
		};

		effects[action]?.();
	}

	static applyRuleEffect(gameState, winner) {
		const health = winner === 'player' ? 'player1Health' : 'player2Health';
		gameState[health] = Math.min(INITIAL_HEALTH, gameState[health] + 30);
	}

	static applyDiplomacyEffect(gameState, winner) {
		if (winner === 'player') {
			gameState.player1Health = Math.min(
				INITIAL_HEALTH,
				gameState.player1Health + 15
			);
			gameState.player2Health = Math.max(0, gameState.player2Health - 15);
		} else {
			gameState.player2Health = Math.min(
				INITIAL_HEALTH,
				gameState.player2Health + 15
			);
			gameState.player1Health = Math.max(0, gameState.player1Health - 15);
		}
	}

	static applyBattleEffect(gameState, winner) {
		const targetHealth =
			winner === 'player' ? 'player2Health' : 'player1Health';
		gameState[targetHealth] = Math.max(0, gameState[targetHealth] - 30);
	}

	static applyStrategyEffect(gameState, winner, oppositeAction) {
		// 상대의 효과를 가로채서 사용
		this.applyActionEffect(gameState, winner, oppositeAction);
	}
}
