import React, { useState, useEffect } from 'react';
import { Box } from '@mui/material';
import * as S from '../styles';

export const PlayerSection = ({ isOpponent, health, cards = [] }) => {
	const [prevHealth, setPrevHealth] = useState(health);
	const [healthChange, setHealthChange] = useState(null);

	useEffect(() => {
		if (health !== prevHealth) {
			const change = health - prevHealth;
			setHealthChange({
				value: Math.abs(change),
				isHealing: change > 0,
			});

			// 애니메이션 종료 후 상태 초기화
			setTimeout(() => {
				setHealthChange(null);
				setPrevHealth(health);
			}, 1000);
		}
	}, [health, prevHealth]);

	return (
		<S.PlayerSection isOpponent={isOpponent}>
			<Box>
				<S.InfoText fontSize="1.25rem" fontWeight="600">
					{isOpponent ? '상대' : '플레이어'}
				</S.InfoText>
			</Box>
			{isOpponent && (
				<S.OpponentCards>
					{cards.map((card, idx) => (
						<S.CardBack key={idx}>
							<S.CardBackText>{card.type}</S.CardBackText>
						</S.CardBack>
					))}
				</S.OpponentCards>
			)}
			<Box position="relative">
				<S.HealthBar>
					<S.HealthBarFill value={health} />
				</S.HealthBar>
				<S.InfoText align="right">{health}/100</S.InfoText>
				{healthChange && (
					<S.HealthChange isHealing={healthChange.isHealing}>
						{healthChange.isHealing ? '+' : '-'}
						{healthChange.value}
					</S.HealthChange>
				)}
			</Box>
		</S.PlayerSection>
	);
};
