// gameLogic.js
import { generateFullCardData } from './gameData';
import { JOB_EFFECTS } from './constants/jobEffects';

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
	calculateScore(
		card,
		action,
		isPlayer = true,
		opponentCard = null,
		opponentScore = 0
	) {
		if (!card || !action) return 0;

		// 기본 점수 (등급 점수)
		let score = card.rankScore;

		// 주제 보너스
		if (action === this.gameState.currentTopic) {
			score += 20;
		}

		// 직군 특수 효과 적용
		const jobEffect = JOB_EFFECTS[card.type];
		if (jobEffect && jobEffect.effect) {
			const effectResult = jobEffect.effect(
				score,
				opponentScore,
				this.gameState,
				opponentCard,
				isPlayer
			);

			// 효과가 배열인 경우 [playerScore, opponentScore] 형태로 반환
			if (Array.isArray(effectResult)) {
				score = effectResult[0];
				if (effectResult[1] !== undefined) {
					this.gameState.pendingOpponentScoreModifier =
						effectResult[1] - opponentScore;
				}
			} else {
				score = effectResult;
			}
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
		// 카드 사용 처리
		this.useCard(playerCard);
		this.useCard(opponentCard);

		// 점수 계산 (상호 참조를 위해 두 단계로 나눔)
		let playerScore = this.calculateScore(
			playerCard,
			playerAction,
			true,
			opponentCard
		);
		let opponentScore = this.calculateScore(
			opponentCard,
			opponentAction,
			false,
			playerCard
		);

		// 보류된 점수 수정자 적용
		if (this.gameState.pendingOpponentScoreModifier) {
			opponentScore += this.gameState.pendingOpponentScoreModifier;
			this.gameState.pendingOpponentScoreModifier = 0;
		}

		// 효과 적용
		this.applyEffects(playerScore, opponentScore, playerAction, opponentAction);

		// 특수 효과로 인한 추가 동작 처리
		this.handleSpecialEffects(playerCard, opponentCard);

		// 새 카드 뽑기
		const newPlayerCard = this.drawCard();
		const newOpponentCard = this.drawCard();

		// 손패 업데이트
		this.gameState.playerHand[playerIndex] = newPlayerCard;
		this.gameState.opponentHand[opponentIndex] = newOpponentCard;

		// 다음 턴 준비
		this.prepareNextTurn();

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

	/**
	 * 특수 효과 추가 처리
	 */
	handleSpecialEffects(playerCard, opponentCard) {
		// 예술인: 추가 드로우
		if (playerCard.type === '예술인' && this.gameState.shouldDrawExtra) {
			const extraCard = this.drawCard();
			if (extraCard) {
				this.gameState.playerHand.push(extraCard);
			}
			this.gameState.shouldDrawExtra = false;
		}

		// 학자: 다음 카드 미리보기
		if (playerCard.type === '학자') {
			this.gameState.revealOpponentNextCard = true;
		}

		// 인플루엔서: 다음 주제 변경
		if (playerCard.type === '인플루엔서' && this.gameState.canChangeNextTopic) {
			const topics = ['rule', 'diplomacy', 'battle', 'strategy'];
			this.gameState.nextTopic =
				topics[Math.floor(Math.random() * topics.length)];
			this.gameState.canChangeNextTopic = false;
		}
	}
}
