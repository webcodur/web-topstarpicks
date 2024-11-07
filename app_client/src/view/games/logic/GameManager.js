import { CardManager } from './CardManager';
import { ScoreCalculator } from './ScoreCalculator';
import { EffectHandler } from './EffectHandler';
import { TOPICS, INITIAL_HEALTH } from '../constants';
import { generateFullCardData } from '../gameData';

/**
 * 게임의 전체적인 상태와 로직을 관리하는 클래스
 */
export class GameManager {
	constructor() {
		this.fullDeck = generateFullCardData();
		this.cardManager = null;
	}

	initializeGame() {
		console.log('GameManager initializing...'); // 디버깅용

		// 게임 상태 초기화
		this.gameState = {
			turn: 1,
			currentTopic: this.getRandomTopic(),
			nextTopic: this.getRandomTopic(),
			previousTopic: null,
			player1Health: 100,
			player2Health: 100,
			mainDeck: [...this.fullDeck].sort(() => Math.random() - 0.5),
			usedCards: [],
			player1Hand: [],
			player2Hand: [],
			selectedCard: null,
			revealOpponentNextCard: false,
			shouldDrawExtra: false,
			canChangeNextTopic: false,
			nextTurnBonus: 0,
			consecutiveLosses: 0,
		};

		// CardManager 초기화를 gameState 생성 후에 수행
		this.cardManager = new CardManager(this.gameState);

		// 초기 카드 분배
		this.dealInitialCards();

		return this.getGameState();
	}

	dealInitialCards() {
		// 각 플레이어에게 4장씩 카드 분배
		for (let i = 0; i < 4; i++) {
			const playerCard = this.gameState.mainDeck.pop();
			const opponentCard = this.gameState.mainDeck.pop();

			if (playerCard) this.gameState.player1Hand.push(playerCard);
			if (opponentCard) this.gameState.player2Hand.push(opponentCard);
		}
	}

	setInitialTopics() {
		this.gameState.currentTopic = this.getRandomTopic();
		this.gameState.nextTopic = this.getRandomTopic();
	}

	drawCard(isPlayer) {
		const drawnCard = this.cardManager.drawCard(isPlayer);
		if (drawnCard) {
			this.gameState.mainDeckCount = this.gameState.mainDeck.length;
		}
		return drawnCard;
	}

	calculateScore(card, action) {
		return ScoreCalculator.calculateScore(
			card,
			action,
			this.gameState.currentTopic
		);
	}

	executeTurn(playerCard, opponentCard, scores) {
		// 카드 처리
		const playerHandBefore = [...this.gameState.player1Hand];
		const opponentHandBefore = [...this.gameState.player2Hand];

		// 카드 제거 및 사용된 카드 더미로 이동
		this.cardManager.removeCard(true, playerCard.id);
		this.cardManager.removeCard(false, opponentCard.id);
		this.cardManager.addToUsedCards(playerCard);
		this.cardManager.addToUsedCards(opponentCard);

		// 점수에 따른 효과 적용
		const winner =
			scores.playerScore > scores.opponentScore ? 'player' : 'opponent';
		const damage = 30;

		if (scores.playerScore > scores.opponentScore) {
			this.gameState.player2Health = Math.max(
				0,
				this.gameState.player2Health - damage
			);
		} else if (scores.playerScore < scores.opponentScore) {
			this.gameState.player1Health = Math.max(
				0,
				this.gameState.player1Health - damage
			);
		}

		// 카드 보충
		if (this.gameState.player1Hand.length < 4) {
			this.cardManager.drawCard(true);
		}
		if (this.gameState.player2Hand.length < 4) {
			this.cardManager.drawCard(false);
		}

		// 다음 턴 준비
		this.gameState.turn += 1;
		this.gameState.previousTopic = this.gameState.currentTopic;
		this.gameState.currentTopic = this.gameState.nextTopic;
		this.gameState.nextTopic = this.getRandomTopic();

		return {
			...this.gameState,
			mainDeckCount: this.gameState.mainDeck.length,
			usedCardsCount: this.gameState.usedCards.length,
			selectedCard: null,
			revealOpponentNextCard: false,
			shouldDrawExtra: false,
			canChangeNextTopic: false,
			nextTurnBonus: 0,
			consecutiveLosses: this.gameState.consecutiveLosses || 0,
		};
	}

	replenishHands() {
		while (this.gameState.player1Hand.length < 4) {
			if (!this.cardManager.drawCard(true)) break;
		}
		while (this.gameState.player2Hand.length < 4) {
			if (!this.cardManager.drawCard(false)) break;
		}
	}

	prepareNextTurn() {
		this.gameState.turn += 1;
		this.gameState.currentTopic = this.gameState.nextTopic;
		this.gameState.nextTopic = this.getRandomTopic();
		this.gameState.selectedCard = null;
		this.gameState.selectedAction = null;
	}

	getRandomTopic() {
		const topics = Object.values(TOPICS);
		return topics[Math.floor(Math.random() * topics.length)];
	}

	checkGameEnd() {
		if (this.gameState.player1Health <= 0) return 'player2';
		if (this.gameState.player2Health <= 0) return 'player1';
		return null;
	}

	getGameState() {
		return {
			...this.gameState,
			mainDeckCount: this.gameState.mainDeck.length,
			usedCardsCount: this.gameState.usedCards.length,
		};
	}

	removeCardFromHand(isPlayer, card) {
		if (!card) return;

		const handKey = isPlayer ? 'player1Hand' : 'player2Hand';
		const index = this.gameState[handKey].findIndex((c) => c.id === card.id);

		if (index !== -1) {
			// 배열을 복사하고 특정 인덱스의 카드만 제거
			const newHand = [...this.gameState[handKey]];
			newHand.splice(index, 1);
			this.gameState[handKey] = newHand;
		}
	}

	useCard(card) {
		if (!card) return;
		this.gameState.usedCards.push(card);
	}
}
