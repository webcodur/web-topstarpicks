import { useState, useCallback, useEffect } from 'react';
import { GameManager } from '../gameLogic';
import { JOB_EFFECTS } from '../constants/jobEffects';

export const useGameState = () => {
	const [gameState, setGameState] = useState(null);
	const [selectedCard, setSelectedCard] = useState(null);
	const [showBattle, setShowBattle] = useState(false);
	const [battleResult, setBattleResult] = useState(null);
	const [removingCardIndex, setRemovingCardIndex] = useState(null);
	const [gameManager] = useState(() => new GameManager());
	const [gameOver, setGameOver] = useState(false);
	const [newCardIndices, setNewCardIndices] = useState([]);

	useEffect(() => {
		const initialState = gameManager.initializeGame();
		setGameState(initialState);
	}, [gameManager]);

	const handleCardSelect = useCallback((card) => {
		setSelectedCard(card);
	}, []);

	const checkGameEnd = useCallback(() => {
		const winner = gameManager.checkGameEnd();
		if (winner) {
			setGameOver(true);
			alert(`게임 종료! ${winner === 'player' ? '플레이어' : '상대방'} 승리!`);
			return true;
		}
		return false;
	}, [gameManager]);

	const handleSubmit = useCallback(() => {
		if (!selectedCard || gameOver) return;

		const opponentIndex = Math.floor(
			Math.random() * gameState.opponentHand.length
		);
		const opponentCard = gameState.opponentHand[opponentIndex];

		const playerIndex = gameState.playerHand.findIndex(
			(card) => card.id === selectedCard.id
		);

		setRemovingCardIndex(playerIndex);

		const currentAction = gameState.currentTopic;

		const playerScoreDetails = {
			baseScore: selectedCard.rankScore,
			topicBonus: currentAction === gameState.currentTopic ? 20 : 0,
			effectBonus: 0,
		};

		const opponentScoreDetails = {
			baseScore: opponentCard.rankScore,
			topicBonus: currentAction === gameState.currentTopic ? 20 : 0,
			effectBonus: 0,
		};

		const playerEffect = JOB_EFFECTS[selectedCard.type].effect(
			playerScoreDetails.baseScore,
			0,
			gameState,
			opponentCard,
			true
		);
		playerScoreDetails.effectBonus =
			(Array.isArray(playerEffect) ? playerEffect[0] : playerEffect) -
			playerScoreDetails.baseScore;

		const opponentEffect = JOB_EFFECTS[opponentCard.type].effect(
			opponentScoreDetails.baseScore,
			0,
			gameState,
			selectedCard,
			false
		);
		opponentScoreDetails.effectBonus =
			(Array.isArray(opponentEffect) ? opponentEffect[0] : opponentEffect) -
			opponentScoreDetails.baseScore;

		const playerScore =
			playerScoreDetails.baseScore +
			playerScoreDetails.topicBonus +
			playerScoreDetails.effectBonus;

		const opponentScore =
			opponentScoreDetails.baseScore +
			opponentScoreDetails.topicBonus +
			opponentScoreDetails.effectBonus;

		const effectDescription = {
			playerEffects: [
				`기본 점수: ${playerScoreDetails.baseScore}`,
				playerScoreDetails.topicBonus > 0 &&
					`주제 보너스: +${playerScoreDetails.topicBonus}`,
				`${selectedCard.type}의 특수 효과: ${
					JOB_EFFECTS[selectedCard.type].description
				} (${playerScoreDetails.effectBonus >= 0 ? '+' : ''}${
					playerScoreDetails.effectBonus
				})`,
				`최종 점수: ${playerScore}`,
			].filter(Boolean),
			opponentEffects: [
				`기본 점수: ${opponentScoreDetails.baseScore}`,
				opponentScoreDetails.topicBonus > 0 &&
					`주제 보너스: +${opponentScoreDetails.topicBonus}`,
				`${opponentCard.type}의 특수 효과: ${
					JOB_EFFECTS[opponentCard.type].description
				} (${opponentScoreDetails.effectBonus >= 0 ? '+' : ''}${
					opponentScoreDetails.effectBonus
				})`,
				`최종 점수: ${opponentScore}`,
			].filter(Boolean),
		};

		setBattleResult({
			playerCard: selectedCard,
			opponentCard,
			playerAction: currentAction,
			opponentAction: currentAction,
			playerScore,
			opponentScore,
			startPosition: playerIndex,
			effectDescription,
			currentTopic: gameState.currentTopic,
		});
		setShowBattle(true);
	}, [selectedCard, gameState, gameManager, checkGameEnd, gameOver]);

	const handleBattleFinish = useCallback(() => {
		const currentAction = gameState.currentTopic;

		const newState = gameManager.executeTurn(
			battleResult.playerCard,
			currentAction,
			battleResult.opponentCard,
			currentAction,
			battleResult.startPosition,
			battleResult.opponentIndex
		);

		setNewCardIndices([battleResult.startPosition]);
		setGameState(newState);
		setSelectedCard(null);
		setRemovingCardIndex(null);
		setShowBattle(false);
		setBattleResult(null);

		setTimeout(() => {
			setNewCardIndices([]);
		}, 500);

		checkGameEnd();
	}, [gameState, gameManager, battleResult, checkGameEnd]);

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
		gameOver,
		newCardIndices,
		handleBattleFinish,
	};
};
