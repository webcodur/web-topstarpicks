import React from 'react';
import { Box } from '@mui/material';
import * as S from '../styles';
import { ScoreCalculator } from '../logic/ScoreCalculator';

export const ScorePreview = ({ card, action, currentTopic }) => {
	if (!card || !action) return null;

	const score = ScoreCalculator.calculateScore(card, action, currentTopic);
	const baseScore = card.rankScore;
	const bonusScore = card.bonus[action];
	const topicBonus = action === currentTopic ? 20 : 0;

	return (
		<S.ScorePreview>
			<S.InfoText fontSize="1rem" fontWeight="600">
				예상 점수
			</S.InfoText>
			<Box>
				<S.InfoText>기본 점수: {baseScore}</S.InfoText>
				<S.InfoText>
					직업 보너스: {bonusScore > 0 ? '+' : ''}
					{bonusScore}
				</S.InfoText>
				{topicBonus > 0 && <S.InfoText>주제 보너스: +{topicBonus}</S.InfoText>}
				<S.InfoText fontSize="1.2rem" fontWeight="600">
					총점: {score}
				</S.InfoText>
			</Box>
		</S.ScorePreview>
	);
};
