import React from 'react';
import * as S from '../styles';

export const DeckSection = ({ deckCount }) => {
	return <S.InfoText color="white">남은 카드: {deckCount}</S.InfoText>;
};
