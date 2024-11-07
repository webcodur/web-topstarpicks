import React from 'react';
import * as S from '../styles';
import { JobEffectTooltip } from './JobEffectTooltip';

export const CardSection = ({
	cards,
	selectedCard,
	onCardSelect,
	removingIndex,
}) => {
	return (
		<S.HandSection>
			{cards.map((card, index) => (
				<S.PlayerCard
					key={`${card.id}-${index}`}
					data-card-index={index}
					elevation={3}
					isSelected={selectedCard && selectedCard.id === card.id}
					isRemoving={removingIndex === index}
					onClick={() => !card.isEmpty && onCardSelect(card)}>
					{!card.isEmpty && (
						<>
							<JobEffectTooltip jobType={card.type} />
							<S.InfoText fontSize="1.25rem" fontWeight="600">
								{card.name}
							</S.InfoText>
							<S.InfoText color="textSecondary">{card.type}</S.InfoText>
							<S.InfoText color="primary">{card.rank}등급</S.InfoText>
						</>
					)}
				</S.PlayerCard>
			))}
		</S.HandSection>
	);
};
