import React from 'react';
import * as S from '../styles';

export const ActionSection = ({ onSubmit, isSubmitDisabled }) => {
	return (
		<S.ActionSection>
			<S.ActionButton
				disabled={isSubmitDisabled}
				onClick={onSubmit}
				isSubmit
				variant="contained">
				카드 제출
			</S.ActionButton>
		</S.ActionSection>
	);
};
