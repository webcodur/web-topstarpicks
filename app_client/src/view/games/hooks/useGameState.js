import { useState, useCallback, useMemo } from 'react';
import { GameManager } from '../gameLogic';

export const useGameState = () => {
	const gameManager = useMemo(() => new GameManager(), []);
	const [gameState, setGameState] = useState(() => {
		const initialState = gameManager.initializeGame();
		return {
			...initialState,
			playerHand: [...initialState.playerHand],
			opponentHand: [...initialState.opponentHand],
		};
	});
	const [selectedCard, setSelectedCard] = useState(null);
	const [showBattle, setShowBattle] = useState(false);
	const [battleResult, setBattleResult] = useState(null);
	const [removingCardIndex, setRemovingCardIndex] = useState(null);

	const handleCardSelect = useCallback((card) => {
		setSelectedCard(card);
	}, []);

	const handleSubmit = useCallback(() => {
		if (!selectedCard || showBattle) return;

		const playerIndex = gameState.playerHand.findIndex(
			(card) => card.id === selectedCard.id
		);
		if (playerIndex === -1) return;

		const opponentIndex = Math.floor(
			Math.random() * gameState.opponentHand.length
		);
		const opponentCard = gameState.opponentHand[opponentIndex];

		const cardElement = document.querySelector(
			`[data-card-index="${playerIndex}"]`
		);
		const cardPosition = cardElement?.getBoundingClientRect();

		setRemovingCardIndex(playerIndex);
		setShowBattle(true);
		setBattleResult({
			playerCard: selectedCard,
			opponentCard,
			playerScore: gameManager.calculateScore(
				selectedCard,
				gameState.currentTopic
			),
			opponentScore: gameManager.calculateScore(
				opponentCard,
				gameState.currentTopic
			),
			startPosition: cardPosition
				? {
						left: cardPosition.left + cardPosition.width / 2,
						top: cardPosition.top + cardPosition.height / 2,
				  }
				: null,
		});

		setTimeout(() => {
			const newState = gameManager.executeTurn(
				selectedCard,
				gameState.currentTopic,
				opponentCard,
				gameState.currentTopic,
				playerIndex,
				opponentIndex
			);
			setGameState(newState);
			setSelectedCard(null);
			setRemovingCardIndex(null);
			setShowBattle(false);
			setBattleResult(null);
		}, 3800);
	}, [selectedCard, showBattle, gameState, gameManager]);

	return {
		gameState,
		selectedCard,
		handleCardSelect,
		handleSubmit,
		gameManager,
		showBattle,
		battleResult,
		removingCardIndex,
		setShowBattle,
		setBattleResult,
	};
};
