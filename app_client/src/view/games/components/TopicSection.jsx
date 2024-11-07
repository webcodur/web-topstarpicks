import React from 'react';
import { Box } from '@mui/material';
import * as S from '../styles';
import { TRANSLATIONS } from '../constants';

export const TopicSection = ({ currentTopic, nextTopic }) => {
	return (
		<S.TopicSection>
			<Box textAlign="center">
				<S.InfoText fontSize="0.875rem">현재 주제</S.InfoText>
				<S.InfoText fontSize="1.25rem" color="primary">
					{TRANSLATIONS[currentTopic]}
				</S.InfoText>
			</Box>
			<Box textAlign="center">
				<S.InfoText fontSize="0.875rem">다음 주제</S.InfoText>
				<S.InfoText fontSize="1.25rem" color="error">
					{TRANSLATIONS[nextTopic]}
				</S.InfoText>
			</Box>
		</S.TopicSection>
	);
};
