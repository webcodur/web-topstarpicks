import React from 'react';
import { Box } from '@mui/material';
import * as S from '../styles';
import { TRANSLATIONS } from '../constants';

export const ResultModal = ({ result }) => {
	if (!result) return null;

	return (
		<S.ResultModal>
			<S.InfoText fontSize="1.5rem" fontWeight="600">
				턴 결과
			</S.InfoText>
			<Box display="flex" justifyContent="space-between" gap={4}>
				<Box>
					<S.InfoText>플레이어 카드: {result.playerCard.name}</S.InfoText>
					<S.InfoText>
						선택 행동: {TRANSLATIONS[result.playerAction]}
					</S.InfoText>
					<S.InfoText>점수: {result.playerScore}</S.InfoText>
				</Box>
				<Box>
					<S.InfoText>상대 카드: {result.opponentCard.name}</S.InfoText>
					<S.InfoText>
						선택 행동: {TRANSLATIONS[result.opponentAction]}
					</S.InfoText>
					<S.InfoText>점수: {result.opponentScore}</S.InfoText>
				</Box>
			</Box>
		</S.ResultModal>
	);
};
