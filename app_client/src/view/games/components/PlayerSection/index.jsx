import React from 'react';
import * as S from './styles';

export const PlayerSection = ({ isOpponent, health, handCount }) => {
	return (
		<S.PlayerContainer>
			<div>체력: {health}</div>
			<S.HandContainer>
				{[...Array(handCount)].map((_, index) => (
					<S.Card key={index} isOpponent={isOpponent} />
				))}
			</S.HandContainer>
		</S.PlayerContainer>
	);
};
