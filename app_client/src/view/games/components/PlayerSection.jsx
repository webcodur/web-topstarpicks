import React from 'react';
import * as S from '../styles';
import { JobEffectTooltip } from './JobEffectTooltip';

export const PlayerSection = ({ isOpponent, health, cards = [] }) => {
	return (
		<S.PlayerSection isOpponent={isOpponent}>
			<div>
				<S.InfoText fontSize="1.2rem" fontWeight="600">
					{isOpponent ? '상대방' : '플레이어'}
				</S.InfoText>
				<S.InfoText>체력: {health}</S.InfoText>
				<S.HealthBar>
					<S.HealthBarFill value={(health / 100) * 100} />
				</S.HealthBar>
			</div>
			{isOpponent && cards && (
				<S.OpponentCards>
					{cards.map((card, index) => (
						<S.CardBack key={index}>
							{!card.isEmpty && (
								<>
									<JobEffectTooltip jobType={card.type} />
									<S.CardBackText>{card.type}</S.CardBackText>
								</>
							)}
						</S.CardBack>
					))}
				</S.OpponentCards>
			)}
		</S.PlayerSection>
	);
};
