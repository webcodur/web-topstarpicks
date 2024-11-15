// LoadingScreen.styles.js
import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import { Box } from '@mui/material';

export const LoadingContainer = styled(motion.div)`
	width: 100vw;
	height: 100vh;
	position: fixed;
	top: 0;
	left: 0;
	display: flex;
	justify-content: center;
	align-items: center;
	background-size: cover;
	background-position: center;
	background-repeat: no-repeat;
`;

export const LoadingTextWrapper = styled(motion.div)`
	position: relative;
	display: inline-block;
`;

export const LoadingText = styled(motion.div)`
	color: white;
	font-size: 2.5rem;
	font-family: 'Song Myung', serif;
	text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
	background: rgba(0, 0, 0, 0.3);
	padding: 1rem 2rem;
	border-radius: 8px;

	@media (max-width: 768px) {
		font-size: 1.8rem;
		padding: 0.8rem 1.6rem;
	}
`;

export const Underline = styled(motion.div)`
	position: absolute;
	bottom: 0.8rem;
	left: 2rem;
	right: 2rem;
	height: 3px;
	background: white;
	border-radius: 3px;

	@media (max-width: 768px) {
		bottom: 0.6rem;
		left: 1.6rem;
		right: 1.6rem;
		height: 2px;
	}
`;

export const LoadingMessage = styled(Box)`
	position: relative;
	text-align: center;
	width: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
`;

export const FadingTextWide = styled.div`
	color: white;
	font-size: 1.5rem;
	font-family: 'Song Myung', serif;
`;

export const FadingText = styled.div`
	padding: 10px;
	font-size: 1.5rem;
	font-family: 'Song Myung', serif;
`;
