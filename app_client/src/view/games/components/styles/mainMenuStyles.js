import styled from '@emotion/styled';
import { keyframes } from '@emotion/react';
import { styled as muiStyled } from '@mui/material/styles';
import { Typography } from '@mui/material';

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const slideUp = keyframes`
  from { transform: translateY(20px); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
`;

export const MainMenuContainer = styled.div`
	width: 100%;
	height: 100vh;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	position: relative;
	background-image: url('/assets/images/background.jpg');
	background-size: cover;
	background-position: center;
	color: #fff;
`;

export const BackgroundOverlay = styled.div`
	position: absolute;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	background: rgba(0, 0, 0, 0.5);
	z-index: 1;
`;

export const TitleSection = styled.div`
	text-align: center;
	margin-bottom: 60px;
	z-index: 2;
	animation: ${fadeIn} 1s ease-out;
`;

export const GameTitle = muiStyled(Typography)`
	font-family: 'Nanum Myeongjo', serif;
	font-weight: 700;
	font-size: 3.5rem;
	margin-bottom: 1rem;
	text-align: center;
	text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
	letter-spacing: 0.1em;
`;

export const SubTitle = muiStyled(Typography)`
	font-family: 'Noto Sans KR', sans-serif;
	text-align: center;
	opacity: 0.8;
	font-size: 1.5rem;
	font-weight: 300;
	letter-spacing: 0.05em;
	text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.2);
`;

export const MenuSection = styled.div`
	display: flex;
	flex-direction: column;
	gap: 20px;
	z-index: 2;
	animation: ${slideUp} 1s ease-out 0.5s backwards;
`;

export const MenuButton = styled.button`
	padding: 15px 40px;
	font-size: 1.2rem;
	background: rgba(255, 255, 255, 0.1);
	border: 2px solid rgba(255, 255, 255, 0.3);
	color: white;
	border-radius: 4px;
	cursor: pointer;
	transition: all 0.3s ease;
	min-width: 250px;
	backdrop-filter: blur(5px);

	&:hover {
		background: rgba(255, 255, 255, 0.2);
		border-color: rgba(255, 255, 255, 0.5);
		transform: translateY(-2px);
	}

	&:active {
		transform: translateY(1px);
	}
`;

export const VersionInfo = styled.div`
	position: absolute;
	bottom: 20px;
	right: 20px;
	font-size: 0.9rem;
	opacity: 0.7;
	z-index: 2;
`;
