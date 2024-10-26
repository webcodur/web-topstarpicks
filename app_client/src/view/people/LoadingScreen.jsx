// LoadingScreen.jsx
import React from 'react';
import { LoadingContainer, FadingText } from './LoadingScreen.styles';

const LoadingScreen = () => {
	return (
		<LoadingContainer>
			<FadingText>데이터를 불러오는 중입니다...</FadingText>
		</LoadingContainer>
	);
};

export default LoadingScreen;
