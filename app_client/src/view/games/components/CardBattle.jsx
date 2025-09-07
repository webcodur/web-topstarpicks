import React, { useEffect, useState, useCallback } from 'react';
import { TRANSLATIONS } from '../constants';
import { JOB_EFFECTS } from '../constants/jobEffects';

export const CardBattle = ({
	playerCard,
	opponentCard,
	playerAction,
	opponentAction,
	playerScore,
	opponentScore,
	effectDescription,
	onFinish,
	startPosition,
	currentTopic,
}) => {
	const [battlePhase, setBattlePhase] = useState('intro');
	const winner = playerScore > opponentScore ? 'player' : 'opponent';

	const handleNextPhase = useCallback(() => {
		switch (battlePhase) {
			case 'intro':
				setBattlePhase('preview');
				break;
			case 'preview':
				setBattlePhase('effects');
				break;
			case 'effects':
				setBattlePhase('calculation');
				break;
			case 'calculation':
				setBattlePhase('result');
				break;
			case 'result':
				onFinish();
				break;
			default:
				break;
		}
	}, [battlePhase, onFinish]);

	// 키보드 이벤트 처리
	useEffect(() => {
		const handleKeyPress = (e) => {
			if (e.key === 'Enter' || e.key === ' ') {
				handleNextPhase();
			}
		};

		window.addEventListener('keydown', handleKeyPress);
		return () => window.removeEventListener('keydown', handleKeyPress);
	}, [handleNextPhase]);

	const renderPhaseContent = () => {
		switch (battlePhase) {
			case 'intro':
				return (
					<div className="flex flex-col items-center justify-center p-8 bg-white bg-opacity-90 rounded-lg shadow-lg max-w-md mx-auto">
						<p className="text-lg font-semibold text-gray-800 text-center mb-4">
							{playerCard.name}({playerCard.type})와
							{opponentCard.name}({opponentCard.type})의 대결이 시작됩니다!
						</p>
						<p className="text-lg font-semibold text-gray-800 text-center mb-6">
							현재 주제: {TRANSLATIONS[playerAction]}
						</p>
						<button onClick={handleNextPhase} className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition-colors">
							계속하기 (Space 또는 Enter)
						</button>
					</div>
				);
			case 'preview':
				return (
					<div className="flex flex-col items-center justify-center p-8 bg-white bg-opacity-90 rounded-lg shadow-lg max-w-lg mx-auto">
						<p className="text-base text-gray-800 text-center mb-3">
							{playerCard.name}의 {playerCard.rank}등급 카드 (
							{playerCard.rankScore}점)
						</p>
						<p className="text-sm text-gray-600 text-center mb-4">
							{playerCard.type}의 특수 효과:{' '}
							{JOB_EFFECTS[playerCard.type].description}
						</p>
						<p className="text-xl font-bold text-red-600 mb-4">VS</p>
						<p className="text-base text-gray-800 text-center mb-3">
							{opponentCard.name}의 {opponentCard.rank}등급 카드 (
							{opponentCard.rankScore}점)
						</p>
						<p className="text-sm text-gray-600 text-center mb-6">
							{opponentCard.type}의 특수 효과:{' '}
							{JOB_EFFECTS[opponentCard.type].description}
						</p>
						<button onClick={handleNextPhase} className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition-colors">
							점수 계산하기 (Space 또는 Enter)
						</button>
					</div>
				);
			case 'effects':
				return (
					<div className="flex flex-col items-center justify-center p-8 bg-white bg-opacity-90 rounded-lg shadow-lg max-w-lg mx-auto">
						<h3 className="text-lg font-bold text-gray-800 mb-6">점수 계산</h3>
						<div className="space-y-4 mb-6">
							<p className="text-base font-semibold text-gray-800">플레이어 {playerCard.name}</p>
							{effectDescription.playerEffects.map((effect, index) => (
								<p key={index} className="text-sm text-blue-600 ml-4">{effect}</p>
							))}
							<p className="text-xl font-bold text-red-600 text-center">VS</p>
							<p className="text-base font-semibold text-gray-800">상대방 {opponentCard.name}</p>
							{effectDescription.opponentEffects.map((effect, index) => (
								<p key={index} className="text-sm text-red-600 ml-4">{effect}</p>
							))}
						</div>
						<button onClick={handleNextPhase} className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition-colors">
							결과 확인하기 (Space 또는 Enter)
						</button>
					</div>
				);
			case 'calculation':
				return (
					<div className="flex flex-col items-center justify-center p-8 bg-white bg-opacity-90 rounded-lg shadow-lg max-w-md mx-auto">
						<h3 className="text-lg font-bold text-gray-800 mb-4">결과</h3>
						<p className="text-xl font-bold text-green-600 mb-4">
							{winner === 'player' ? playerCard.name : opponentCard.name}의
							승리!
						</p>
						<p className="text-base text-gray-800 text-center mb-6">
							{(() => {
								const winnerName =
									winner === 'player' ? playerCard.name : opponentCard.name;
								switch (playerAction) {
									case 'rule':
										return `${winnerName}가 통치전에서 승리하여 체력을 회복합니다!`;
									case 'diplomacy':
										return `${winnerName}가 외교전에서 승리하여 체력을 교환합니다!`;
									case 'battle':
										return `${winnerName}가 교전에서 승리하여 상대방에게 피해를 입힙니다!`;
									case 'strategy':
										return `${winnerName}가 모략전에서 승리했습니다!`;
									default:
										return `${winnerName}가 승리했습니다!`;
								}
							})()}
						</p>
						<button onClick={handleNextPhase} className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition-colors">
							효과 적용하기 (Space 또는 Enter)
						</button>
					</div>
				);
			case 'result':
				return (
					<div className="flex items-center justify-center gap-8 p-8">
						<div className={`flex flex-col items-center p-6 rounded-lg shadow-lg ${winner === 'player' ? 'bg-green-100 border-4 border-green-500' : 'bg-red-100 border-4 border-red-500'}`}>
							<h4 className="text-xl font-bold text-gray-800 mb-2">{playerCard.name}</h4>
							<p className="text-gray-600 mb-1">{playerCard.type}</p>
							<p className="text-blue-600 font-semibold mb-2">{playerCard.rank}등급</p>
							<p className="text-2xl font-bold text-gray-800 mb-2">{playerScore}점</p>
							<p className={`text-lg font-bold ${winner === 'player' ? 'text-green-600' : 'text-red-600'}`}>
								{winner === 'player' ? '승리!' : '패배...'}
							</p>
						</div>

						<div className="text-3xl font-bold text-gray-600">VS</div>

						<div className={`flex flex-col items-center p-6 rounded-lg shadow-lg ${winner === 'opponent' ? 'bg-green-100 border-4 border-green-500' : 'bg-red-100 border-4 border-red-500'}`}>
							<h4 className="text-xl font-bold text-gray-800 mb-2">{opponentCard.name}</h4>
							<p className="text-gray-600 mb-1">{opponentCard.type}</p>
							<p className="text-blue-600 font-semibold mb-2">{opponentCard.rank}등급</p>
							<p className="text-2xl font-bold text-gray-800 mb-2">{opponentScore}점</p>
							<p className={`text-lg font-bold ${winner === 'opponent' ? 'text-green-600' : 'text-red-600'}`}>
								{winner === 'opponent' ? '승리!' : '패배...'}
							</p>
						</div>
						
						<div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
							<button onClick={handleNextPhase} className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition-colors">
								턴 종료하기 (Space 또는 Enter)
							</button>
						</div>
					</div>
				);
			default:
				return null;
		}
	};

	return (
		<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
			{renderPhaseContent()}
		</div>
	);
};