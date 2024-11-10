import React, { useEffect, useState, useCallback } from 'react';
import * as S from '../styles';
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
					<S.BattlePreview>
						<S.PreviewText>
							{playerCard.name}({playerCard.type})와
							{opponentCard.name}({opponentCard.type})의 대결이 시작됩니다!
						</S.PreviewText>
						<S.PreviewText>
							현재 주제: {TRANSLATIONS[playerAction]}
						</S.PreviewText>
						<S.NextButton onClick={handleNextPhase}>
							계속하기 (Space 또는 Enter)
						</S.NextButton>
					</S.BattlePreview>
				);
			case 'preview':
				return (
					<S.BattlePreview>
						<S.PreviewText>
							{playerCard.name}의 {playerCard.rank}등급 카드 (
							{playerCard.rankScore}점)
						</S.PreviewText>
						<S.PreviewText>
							{playerCard.type}의 특수 효과:{' '}
							{JOB_EFFECTS[playerCard.type].description}
						</S.PreviewText>
						<S.PreviewText>VS</S.PreviewText>
						<S.PreviewText>
							{opponentCard.name}의 {opponentCard.rank}등급 카드 (
							{opponentCard.rankScore}점)
						</S.PreviewText>
						<S.PreviewText>
							{opponentCard.type}의 특수 효과:{' '}
							{JOB_EFFECTS[opponentCard.type].description}
						</S.PreviewText>
						<S.NextButton onClick={handleNextPhase}>
							점수 계산하기 (Space 또는 Enter)
						</S.NextButton>
					</S.BattlePreview>
				);
			case 'effects':
				return (
					<S.BattlePreview>
						<S.PreviewText>점수 계산</S.PreviewText>
						<S.EffectList>
							<S.PreviewText>플레이어 {playerCard.name}</S.PreviewText>
							{effectDescription.playerEffects.map((effect, index) => (
								<S.EffectText key={index}>{effect}</S.EffectText>
							))}
							<S.PreviewText>VS</S.PreviewText>
							<S.PreviewText>상대방 {opponentCard.name}</S.PreviewText>
							{effectDescription.opponentEffects.map((effect, index) => (
								<S.EffectText key={index}>{effect}</S.EffectText>
							))}
						</S.EffectList>
						<S.NextButton onClick={handleNextPhase}>
							결과 확인하기 (Space 또는 Enter)
						</S.NextButton>
					</S.BattlePreview>
				);
			case 'calculation':
				return (
					<S.BattlePreview>
						<S.PreviewText>결과</S.PreviewText>
						<S.PreviewText>
							{winner === 'player' ? playerCard.name : opponentCard.name}의
							승리!
						</S.PreviewText>
						<S.PreviewText>
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
						</S.PreviewText>
						<S.NextButton onClick={handleNextPhase}>
							효과 적용하기 (Space 또는 Enter)
						</S.NextButton>
					</S.BattlePreview>
				);
			case 'result':
				return (
					<S.BattleContainer>
						<S.BattleCard
							isPlayer
							isWinner={winner === 'player'}
							phase={battlePhase}>
							<S.InfoText fontSize="1.25rem" fontWeight="600">
								{playerCard.name}
							</S.InfoText>
							<S.InfoText color="textSecondary">{playerCard.type}</S.InfoText>
							<S.InfoText color="primary">{playerCard.rank}등급</S.InfoText>
							<S.ScoreText>{playerScore}점</S.ScoreText>
							<S.ResultText>
								{winner === 'player' ? '승리!' : '패배...'}
							</S.ResultText>
						</S.BattleCard>

						<S.BattleVS>VS</S.BattleVS>

						<S.BattleCard
							isOpponent
							isWinner={winner === 'opponent'}
							phase={battlePhase}>
							<S.InfoText fontSize="1.25rem" fontWeight="600">
								{opponentCard.name}
							</S.InfoText>
							<S.InfoText color="textSecondary">{opponentCard.type}</S.InfoText>
							<S.InfoText color="primary">{opponentCard.rank}등급</S.InfoText>
							<S.ScoreText>{opponentScore}점</S.ScoreText>
							<S.ResultText>
								{winner === 'opponent' ? '승리!' : '패배...'}
							</S.ResultText>
						</S.BattleCard>
						<S.NextButton onClick={handleNextPhase}>
							턴 종료하기 (Space 또는 Enter)
						</S.NextButton>
					</S.BattleContainer>
				);
			default:
				return null;
		}
	};

	return <S.BattleOverlay>{renderPhaseContent()}</S.BattleOverlay>;
};
