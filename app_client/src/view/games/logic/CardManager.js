import { MAX_HAND_SIZE } from '../constants';

export class CardManager {
	constructor(gameState) {
		this.gameState = gameState;
	}

	drawCard(isPlayer) {
		if (
			this.gameState.mainDeck.length === 0 &&
			this.gameState.usedCards.length > 0
		) {
			this.gameState.mainDeck = [...this.gameState.usedCards].sort(
				() => Math.random() - 0.5
			);
			this.gameState.usedCards = [];
		}

		if (this.gameState.mainDeck.length > 0) {
			const drawnCard = this.gameState.mainDeck.pop();
			const handKey = isPlayer ? 'player1Hand' : 'player2Hand';

			this.gameState[handKey] = [...this.gameState[handKey], drawnCard];

			return drawnCard;
		}

		return null;
	}

	removeCard(isPlayer, cardId) {
		const handKey = isPlayer ? 'player1Hand' : 'player2Hand';
		const index = this.gameState[handKey].findIndex(
			(card) => card.id === cardId
		);

		if (index !== -1) {
			const newHand = [...this.gameState[handKey]];
			newHand.splice(index, 1);
			this.gameState[handKey] = newHand;
			return true;
		}

		return false;
	}

	addToUsedCards(card) {
		if (card) {
			this.gameState.usedCards.push(card);
		}
	}

	getHandSize(isPlayer) {
		const handKey = isPlayer ? 'player1Hand' : 'player2Hand';
		return this.gameState[handKey].length;
	}

	getDeckSize() {
		return this.gameState.mainDeck.length;
	}
}
