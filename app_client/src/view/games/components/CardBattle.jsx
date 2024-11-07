import React, { useEffect, useState } from 'react';
import * as S from '../styles';
import { TRANSLATIONS } from '../constants';

export const CardBattle = ({
	playerCard,
	opponentCard,
	playerAction,
	opponentAction,
	playerScore,
	opponentScore,
	onFinish,
	startPosition,
}) => {
	const [battlePhase, setBattlePhase] = useState('fly');

	useEffect(() => {
		const timer1 = setTimeout(() => setBattlePhase('start'), 500);
		const timer2 = setTimeout(() => setBattlePhase('clash'), 1000);
		const timer3 = setTimeout(() => setBattlePhase('result'), 2000);
		const timer4 = setTimeout(() => {
			setBattlePhase('fly');
			onFinish();
		}, 3500);

		return () => {
			clearTimeout(timer1);
			clearTimeout(timer2);
			clearTimeout(timer3);
			clearTimeout(timer4);
		};
	}, [onFinish]);

	const winner = playerScore > opponentScore ? 'player' : 'opponent';

	return (
		<S.BattleOverlay>
			<S.BattleContainer phase={battlePhase}>
				<S.BattleCard
					isPlayer
					isWinner={winner === 'player'}
					phase={battlePhase}
					startPosition={startPosition}>
					<S.InfoText fontSize="1.25rem" fontWeight="600">
						{playerCard.name}
					</S.InfoText>
					<S.InfoText color="textSecondary">{playerCard.type}</S.InfoText>
					<S.InfoText color="primary">{playerCard.rank}등급</S.InfoText>
					<S.InfoText>{TRANSLATIONS[playerAction]}</S.InfoText>
					<S.ScoreText>{playerScore}점</S.ScoreText>
				</S.BattleCard>

				<S.BattleVS phase={battlePhase}>VS</S.BattleVS>

				<S.BattleCard
					isOpponent
					isWinner={winner === 'opponent'}
					phase={battlePhase}>
					<S.InfoText fontSize="1.25rem" fontWeight="600">
						{opponentCard.name}
					</S.InfoText>
					<S.InfoText color="textSecondary">{opponentCard.type}</S.InfoText>
					<S.InfoText color="primary">{opponentCard.rank}등급</S.InfoText>
					<S.InfoText>{TRANSLATIONS[opponentAction]}</S.InfoText>
					<S.ScoreText>{opponentScore}점</S.ScoreText>
				</S.BattleCard>
			</S.BattleContainer>
		</S.BattleOverlay>
	);
};
