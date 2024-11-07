import React, { useState } from 'react';
import { ThemeProvider } from '@emotion/react';
import { createTheme } from '@mui/material/styles';
import * as S from '../styles';
import { useGameState } from '../hooks/useGameState';
import { PlayerSection } from './PlayerSection';
import { TopicSection } from './TopicSection';
import { CardSection } from './CardSection';
import { CardLibrary } from './CardLibrary';
import { ScorePreview } from './ScorePreview';
import { CardBattle } from './CardBattle';
import { ScoreCalculator } from '../logic/ScoreCalculator';
import { ActionSection } from './ActionSection';

const GameUI = ({ settings }) => {
	const {
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
	} = useGameState();

	const [isModalOpen, setIsModalOpen] = useState(false);

	const handleBattleFinish = () => {
		setShowBattle(false);
		setBattleResult(null);
	};

	// 게임 상태가 완전히 초기화될 때까지 로딩 표시
	if (!gameState || !gameState.playerHand) {
		return <div>Loading...</div>;
	}

	return (
		<S.GameContainer>
			{/* 턴 표시 */}
			<S.TurnIndicator>
				<S.InfoText color="white">턴 {gameState.turn}</S.InfoText>
			</S.TurnIndicator>

			{/* 전체 카드 목록 버튼과 남은 카드 수 */}
			<S.TopButtonSection>
				<S.LibraryButton onClick={() => setIsModalOpen(true)}>
					전체 카드
				</S.LibraryButton>
				<S.InfoText>남은 카드: {gameState.mainDeckCount}</S.InfoText>
			</S.TopButtonSection>

			{/* 주제 섹션 */}
			<TopicSection
				currentTopic={gameState.currentTopic}
				nextTopic={gameState.nextTopic}
			/>

			{/* 상대방 정보 */}
			<PlayerSection
				isOpponent
				health={gameState.opponentHealth}
				cards={gameState.opponentHand}
			/>

			{/* 점수 미리보기 */}
			<ScorePreview card={selectedCard} currentTopic={gameState.currentTopic} />

			{/* 카드 제출 버튼 */}
			<ActionSection onSubmit={handleSubmit} isSubmitDisabled={!selectedCard} />

			{/* 플레이어 카드 섹션 */}
			<CardSection
				cards={gameState.playerHand}
				selectedCard={selectedCard}
				onCardSelect={handleCardSelect}
				removingIndex={removingCardIndex}
			/>

			{/* 플레이어 정보 */}
			<PlayerSection health={gameState.playerHealth} />

			{/* 카드 목록 모달 */}
			<CardLibrary
				isOpen={isModalOpen}
				onClose={() => setIsModalOpen(false)}
				cards={gameManager.fullDeck}
			/>

			{/* 카드 배틀 애니메이션 */}
			{showBattle && battleResult && (
				<CardBattle {...battleResult} onFinish={handleBattleFinish} />
			)}
		</S.GameContainer>
	);
};

export default GameUI;
