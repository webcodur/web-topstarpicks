import React, { useState } from 'react';
import { useGameState } from '../hooks/useGameState';
import { PlayerSection } from './PlayerSection';
import { TopicSection } from './TopicSection';
import { CardSection } from './CardSection';
import { CardLibrary } from './CardLibrary';
import { ScorePreview } from './ScorePreview';
import { CardBattle } from './CardBattle';
import { ScoreCalculator } from '../logic/ScoreCalculator';
import { ActionSection } from './ActionSection';
import { ManualModal } from './ManualModal';
import { Button } from '../../../components/ui/button';

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
		gameOver,
		newCardIndices,
		handleBattleFinish,
	} = useGameState();

	const [isModalOpen, setIsModalOpen] = useState(false);
	const [isManualOpen, setIsManualOpen] = useState(false);

	// 게임 상태가 완전히 초기화될 때까지 로딩 표시
	if (!gameState || !gameState.playerHand) {
		return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
	}

	return (
		<div className="relative w-full max-w-6xl mx-auto p-5 min-h-screen bg-gray-100 dark:bg-gray-900 flex flex-col gap-5">
			{/* 턴 표시 */}
			<div className="absolute top-5 left-5 px-5 py-2.5 bg-black/50 rounded-lg z-10">
				<p className="m-0 text-base text-white">턴 {gameState.turn}</p>
			</div>

			{/* 전체 카드 목록 버튼과 남은 카드 수 */}
			<div className="flex items-center gap-5 absolute top-5 right-5 z-10">
				<Button
					onClick={() => setIsModalOpen(true)}
					variant="default"
					size="sm"
				>
					전체 카드
				</Button>
				<Button
					onClick={() => setIsManualOpen(true)}
					variant="default"
					size="sm"
				>
					플레이 방법
				</Button>
				<p className="m-0 text-base text-gray-800 dark:text-gray-200">남은 카드: {gameState.mainDeckCount}</p>
			</div>

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
				newCardIndices={newCardIndices}
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

			{/* 게임 종료 시 표시될 오버레이 */}
			{gameOver && (
				<div className="fixed top-0 left-0 right-0 bottom-0 bg-black/80 flex justify-center items-center z-50">
					<div className="bg-white dark:bg-gray-800 p-8 rounded-lg text-center flex flex-col gap-4">
						<p className="m-0 text-3xl font-semibold text-gray-800 dark:text-gray-200">
							게임 종료!
						</p>
						<p className="m-0 text-2xl text-gray-700 dark:text-gray-300">
							{gameState.playerHealth <= 0 ? '상대방' : '플레이어'} 승리!
						</p>
						<Button
							onClick={() => window.location.reload()}
							variant="default"
							size="lg"
						>
							다시 시작
						</Button>
					</div>
				</div>
			)}

			{/* 플레이 방법 모달 */}
			<ManualModal open={isManualOpen} onClose={() => setIsManualOpen(false)} />
		</div>
	);
};

export default GameUI;
