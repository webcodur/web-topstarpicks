// gameLogic.js
import { generateFullCardData } from './gameData';

/**
 * ===================================
 * 1. 게임 매니저 클래스
 * ===================================
 * 역사 인물 카드 게임의 전체 로직을 관리하는 클래스
 */
export class GameManager {
	/**
	 * 1.1 초기화 관련
	 * ---------------------------------
	 */
	constructor() {
		// 전체 카드 덱 초기화
		this.fullDeck = generateFullCardData();

		// 게임 상태 초기화
		this.gameState = {
			turn: 1,
			currentTopic: '',
			nextTopic: '',
			playerHealth: 100,
			opponentHealth: 100,
			mainDeck: [], // 공유 덱
			usedCards: [], // 사용된 카드들
			playerHand: [],
			opponentHand: [],
		};

		this.topics = ['rule', 'diplomacy', 'battle', 'strategy'];
	}

	/**
	 * 1.2 게임 시작/초기화
	 * ---------------------------------
	 */
	initializeGame() {
		this.gameState.mainDeck = [...this.fullDeck].sort(
			() => Math.random() - 0.5
		);
		this.gameState.playerHand = this.gameState.mainDeck.splice(0, 4);
		this.gameState.opponentHand = this.gameState.mainDeck.splice(0, 4);
		this.gameState.currentTopic = this.getRandomTopic();
		this.gameState.nextTopic = this.getRandomTopic();
		return { ...this.gameState };
	}

	/**
	 * 2. 카드 관리
	 * ===================================
	 */

	/**
	 * 2.1 카드 조작
	 * ---------------------------------
	 */
	drawCard() {
		if (this.gameState.mainDeck.length === 0) {
			this.gameState.mainDeck = [...this.gameState.usedCards].sort(
				() => Math.random() - 0.5
			);
			this.gameState.usedCards = [];
		}
		return this.gameState.mainDeck.pop();
	}

	useCard(card) {
		this.gameState.usedCards.push(card);
	}

	removeCardFromHand(isPlayer, index) {
		const hand = isPlayer ? 'playerHand' : 'opponentHand';
		this.gameState[hand][index] = {
			id: '',
			name: '',
			type: '',
			rank: '',
			rankScore: 0,
			bonus: {},
			isEmpty: true,
		};
	}

	fillEmptySlot(isPlayer, index) {
		const hand = isPlayer ? 'playerHand' : 'opponentHand';
		const newCard = this.drawCard();
		if (newCard) {
			this.gameState[hand][index] = {
				...newCard,
				isEmpty: false,
			};
		}
	}

	/**
	 * 3. 게임 진행
	 * ===================================
	 */

	/**
	 * 3.1 점수 계산
	 * ---------------------------------
	 */
	calculateScore(card, action) {
		if (!card || !action) return 0;

		// 기본 점수 계산
		let score = card.rankScore;

		// 직업 보너스 점수 추가
		if (card.bonus && card.bonus[action]) {
			score += card.bonus[action];
		}

		// 주제 보너스
		if (action === this.gameState.currentTopic) {
			score += 20;
		}

		return score;
	}

	/**
	 * 3.2 턴 실행
	 * ---------------------------------
	 */
	executeTurn(
		playerCard,
		playerAction,
		opponentCard,
		opponentAction,
		playerIndex,
		opponentIndex
	) {
		// 1. 카드 제거 및 사용된 카드 더미로 이동
		this.gameState.usedCards.push(playerCard, opponentCard);

		// 2. 점수 계산
		const playerScore = this.calculateScore(playerCard, playerAction);
		const opponentScore = this.calculateScore(opponentCard, opponentAction);

		// 3. 효과 적용
		this.applyEffects(playerScore, opponentScore, playerAction, opponentAction);

		// 4. 새 카드 뽑기
		const newPlayerCard = this.drawCard();
		const newOpponentCard = this.drawCard();

		// 5. 손패 업데이트
		this.gameState.playerHand[playerIndex] = newPlayerCard;
		this.gameState.opponentHand[opponentIndex] = newOpponentCard;

		// 6. 다음 턴 준비
		this.gameState.turn += 1;
		this.gameState.currentTopic = this.gameState.nextTopic;
		this.gameState.nextTopic = this.getRandomTopic();

		return { ...this.gameState };
	}

	/**
	 * 3.3 효과 적용
	 * ---------------------------------
	 */
	applyEffects(playerScore, opponentScore, playerAction, opponentAction) {
		if (playerScore === opponentScore) {
			return; // 무승부
		}

		const winner = playerScore > opponentScore ? 'player' : 'opponent';

		// 승자의 행동에 따른 효과 적용
		if (winner === 'player') {
			switch (playerAction) {
				case 'rule':
					this.gameState.playerHealth = Math.min(
						100,
						this.gameState.playerHealth + 30
					);
					break;
				case 'diplomacy':
					this.gameState.playerHealth = Math.min(
						100,
						this.gameState.playerHealth + 15
					);
					this.gameState.opponentHealth = Math.max(
						0,
						this.gameState.opponentHealth - 15
					);
					break;
				case 'battle':
					this.gameState.opponentHealth = Math.max(
						0,
						this.gameState.opponentHealth - 30
					);
					break;
				case 'strategy':
					if (opponentAction === 'strategy') {
						this.gameState.opponentHealth = Math.max(
							0,
							this.gameState.opponentHealth - 15
						);
					}
					break;
			}
		} else {
			switch (opponentAction) {
				case 'rule':
					this.gameState.opponentHealth = Math.min(
						100,
						this.gameState.opponentHealth + 30
					);
					break;
				case 'diplomacy':
					this.gameState.opponentHealth = Math.min(
						100,
						this.gameState.opponentHealth + 15
					);
					this.gameState.playerHealth = Math.max(
						0,
						this.gameState.playerHealth - 15
					);
					break;
				case 'battle':
					this.gameState.playerHealth = Math.max(
						0,
						this.gameState.playerHealth - 30
					);
					break;
				case 'strategy':
					if (playerAction === 'strategy') {
						this.gameState.playerHealth = Math.max(
							0,
							this.gameState.playerHealth - 15
						);
					}
					break;
			}
		}
	}

	/**
	 * 4. 게임 상태 관리
	 * ===================================
	 */
	prepareNextTurn() {
		this.gameState.turn += 1;
		this.gameState.currentTopic = this.gameState.nextTopic;
		this.gameState.nextTopic = this.getRandomTopic();
		this.gameState.selectedCard = null;
		this.gameState.selectedAction = null;
	}

	getGameState() {
		return {
			...this.gameState,
			mainDeckCount: this.gameState.mainDeck.length,
			usedCardsCount: this.gameState.usedCards.length,
		};
	}

	/**
	 * 5. 유틸리티 메서드
	 * ===================================
	 */
	getRandomTopic() {
		return this.topics[Math.floor(Math.random() * this.topics.length)];
	}

	shuffleDeck(deck) {
		for (let i = deck.length - 1; i > 0; i--) {
			const j = Math.floor(Math.random() * (i + 1));
			[deck[i], deck[j]] = [deck[j], deck[i]];
		}
		return deck;
	}

	/**
	 * 6. 검증 메서드
	 * ===================================
	 */
	checkGameEnd() {
		if (this.gameState.playerHealth <= 0) return 'opponent';
		if (this.gameState.opponentHealth <= 0) return 'player';
		return null;
	}

	isValidAction(action) {
		return this.topics.includes(action);
	}

	isValidCard(card) {
		return this.fullDeck.some((c) => c.id === card.id);
	}
}
