import React from 'react';
import { LoadingMessage, FadingText } from './Loading.styles';

const LoadingMessageBox = ({ loadingStatus }) => {
	return (
		<LoadingMessage>
			<FadingText>{loadingStatus}</FadingText>
		</LoadingMessage>
	);
};

export default LoadingMessageBox;
