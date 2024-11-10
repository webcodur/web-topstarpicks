import React from 'react';
import styled from '@emotion/styled';
import { keyframes } from '@emotion/react';
import CircularProgress from '@mui/material/CircularProgress';
import { Typography } from '@mui/material';

const curtainLeft = keyframes`
  from { transform: translateX(0); }
  to { transform: translateX(-100%); }
`;

const curtainRight = keyframes`
  from { transform: translateX(0); }
  to { transform: translateX(100%); }
`;

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const Container = styled.div`
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 100vh;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	z-index: 1000;
	overflow: hidden;
`;

const CurtainLeft = styled.div`
	position: absolute;
	top: 0;
	left: 0;
	width: 50%;
	height: 100%;
	background: #000;
	z-index: 1;
	animation: ${curtainLeft} 1.5s cubic-bezier(0.8, 0, 0.2, 1) forwards;
`;

const CurtainRight = styled.div`
	position: absolute;
	top: 0;
	right: 0;
	width: 50%;
	height: 100%;
	background: #000;
	z-index: 1;
	animation: ${curtainRight} 1.5s cubic-bezier(0.8, 0, 0.2, 1) forwards;
`;

const Content = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	z-index: 2;
	animation: ${fadeIn} 0.5s ease-out 1s forwards;
	opacity: 0;
`;

const LoadingText = styled(Typography)`
	color: white;
	margin-top: 20px;
	font-family: 'Nanum Myeongjo', serif;
	font-size: 1.5rem;
	text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
`;

const Background = styled.div`
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	background: rgba(0, 0, 0, 0.85);
	z-index: 0;
`;

const LoadingScreen = () => {
	return (
		<Container>
			<Background />
			<CurtainLeft />
			<CurtainRight />
			<Content>
				<CircularProgress
					size={70}
					thickness={4}
					sx={{
						color: 'white',
						filter: 'drop-shadow(0 0 10px rgba(255,255,255,0.3))',
					}}
				/>
				<LoadingText>데모 게임 생성중입니다...</LoadingText>
			</Content>
		</Container>
	);
};

export default LoadingScreen;
