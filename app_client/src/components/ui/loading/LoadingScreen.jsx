import React from 'react';
import { LoadingContainer, FadingTextWide } from './Loading.styles';

const LoadingScreen = ({ loadingStatus }) => {
	return (
		<LoadingContainer>
			<FadingTextWide>{loadingStatus}</FadingTextWide>
		</LoadingContainer>
	);
};

export default LoadingScreen;
