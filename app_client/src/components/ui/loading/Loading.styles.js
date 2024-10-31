// LoadingScreen.styles.js
import styled from '@emotion/styled';
import { Box } from '@mui/material';

export const LoadingContainer = styled(Box)`
	position: fixed;
  top:0px;
  left:0px;
	background: linear-gradient(45deg, #fe6b8b 30%, #ff8e53 90%);
  width:100vw;
  height:100vh;
	text-align: center;
  padding:0px;
  margin:0px;
	display: flex;
	justify-content: center;
	align-items: center;
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
