// LoadingScreen.jsx
import React from 'react';
import {
	LoadingContainer,
	StyledLogo,
	FadingText,
} from './LoadingScreen.styles';

const LoadingScreen = () => {
	return (
		<LoadingContainer>
			{/* <StyledLogo component="img" src="/logo.png" alt="loading" /> */}
			<FadingText>데이터를 불러오는 중입니다...</FadingText>
		</LoadingContainer>
	);
};

export default LoadingScreen;
