// LoadingScreen.styles.js
import styled from '@emotion/styled';
import { Box } from '@mui/material';
import { keyframes } from '@emotion/react';

const fadeInOut = keyframes`
  0% { opacity: 0; }
  50% { opacity: 1; }
  100% { opacity: 0; }
`;

export const LoadingContainer = styled(Box)`
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	background: linear-gradient(45deg, #fe6b8b 30%, #ff8e53 90%);
`;

export const StyledLogo = styled(Box)`
	width: 200px;
	margin-bottom: 20px;
`;

export const FadingText = styled.div`
	color: white;
	font-size: 1.5rem;
	font-family: 'Song Myung', serif;
	animation: ${fadeInOut} 2s ease-in-out infinite;
`;