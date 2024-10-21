// ContentsStyle.js
import styled from '@emotion/styled';
import { keyframes } from '@emotion/react';

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const slideIn = keyframes`
  from { transform: translateY(20px); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
`;

export const PageContainer = styled.div`
	max-width: 800px;
	margin: 0 auto;
	padding: 2rem 0;
	animation: ${fadeIn} 0.5s ease-in-out;
`;

export const PersonInfoContainer = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	margin-bottom: 40px;
	animation: ${slideIn} 0.5s ease-in-out;
`;

export const PersonInfoText = styled.p`
	margin: 5px 0;
	color: ${(props) => props.theme.palette.text.secondary};
	transition: color 0.3s ease;
`;

export const PersonName = styled.h1`
	font-family: 'Song Myung', serif;
	text-align: center;
	animation: ${fadeIn} 0.5s ease-in-out 0.2s both;
`;

export const StyledImage = styled.img`
	max-width: 400px;
	object-fit: cover;
	transition: transform 0.3s ease;
	&:hover {
		transform: scale(1.05);
	}
	border-radius: 10px;
`;

export const ImageContainer = styled.div`
	border-radius: 10px;
	padding: 5px;
	margin-bottom: ${(props) => props.theme.spacing(2)};
	overflow: hidden;
`;

export const ErrorMessage = styled.p`
	color: red;
	animation: ${fadeIn} 0.5s ease-in-out;
`;
