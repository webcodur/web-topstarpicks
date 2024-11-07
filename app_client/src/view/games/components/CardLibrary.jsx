import React from 'react';
import * as S from '../styles';

export const CardLibrary = ({ isOpen, onClose, cards }) => {
	return (
		<S.CardListModal open={isOpen} onClose={onClose}>
			<S.ModalContent>
				<S.CloseButton onClick={onClose}>×</S.CloseButton>
				<S.InfoText fontSize="1.5rem" fontWeight="600">
					전체 카드 목록
				</S.InfoText>
				<S.CardGrid>
					{cards.map((card) => (
						<S.PlayerCard key={card.id} elevation={2}>
							<S.InfoText fontSize="1.25rem" fontWeight="600">
								{card.name}
							</S.InfoText>
							<S.InfoText color="textSecondary">{card.type}</S.InfoText>
							<S.InfoText color="primary">{card.rank}등급</S.InfoText>
							<S.InfoText fontSize="0.8rem">{card.description}</S.InfoText>
						</S.PlayerCard>
					))}
				</S.CardGrid>
			</S.ModalContent>
		</S.CardListModal>
	);
};
