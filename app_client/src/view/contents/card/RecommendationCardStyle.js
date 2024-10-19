// ContentsStyle.js
import styled from '@emotion/styled';
import { CardContent } from '@mui/material';
import { Link } from 'react-router-dom';
import { keyframes } from '@emotion/react';

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

export const StyledCardContent = styled(CardContent)`
	display: flex;
	flex-direction: column;
	align-items: center;
`;

export const StyledTitle = styled.h2`
	margin-bottom: 24px;
	text-align: center;
	font-family: 'Song Myung', serif;
	animation: ${fadeIn} 0.5s ease-in-out;
`;

export const StyledBookImage = styled.img`
	max-width: 200px;
	height: 300px;
	object-fit: cover;
	transition: transform 0.3s ease;

	&:hover {
		transform: scale(1.05);
	}
`;

export const ImageContainer = styled.div`
	border: 1px solid lightGray;
	border-radius: 10px;
	padding: 5px;
	margin-bottom: ${(props) => props.theme.spacing(2)};
	overflow: hidden;
`;

export const AffiliateLink = styled(Link)`
	color: ${(props) => props.theme.palette.secondary.main};
	text-decoration: none;
	transition: color 0.3s ease;

	&:hover {
		color: ${(props) => props.theme.palette.secondary.dark};
		text-decoration: underline;
	}
`;

export const SourceLink = styled(Link)`
	color: ${(props) => props.theme.palette.warning.main};
	text-decoration: none;
	transition: color 0.3s ease;

	&:hover {
		color: ${(props) => props.theme.palette.warning.dark};
		text-decoration: underline;
	}
`;

export const QuoteText = styled.span`
	margin-left: 5px;
`;

export const NavigationContainer = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	width: 100%;
	margin-bottom: ${(props) => props.theme.spacing(2)};
`;

export const QuoteContainer = styled.div`
	border: 1px solid ${(props) => props.theme.palette.divider};
	border-radius: ${(props) => props.theme.shape.borderRadius}px;
	padding: ${(props) => props.theme.spacing(2)};
	margin-top: ${(props) => props.theme.spacing(2)};
	margin-bottom: ${(props) => props.theme.spacing(2)};
	background-color: ${(props) =>
		props.theme.palette.mode === 'dark'
			? props.theme.palette.grey[900]
			: props.theme.palette.grey[50]};
	transition: transform 0.3s ease, box-shadow 0.3s ease;

	&:hover {
		transform: translateY(-5px);
		box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
	}
`;

export const MediaDescContainer = styled.div`
	border: 1px solid ${(props) => props.theme.palette.divider};
	border-radius: ${(props) => props.theme.shape.borderRadius}px;
	padding: ${(props) => props.theme.spacing(2)};
	margin-top: ${(props) => props.theme.spacing(2)};
	margin-bottom: ${(props) => props.theme.spacing(2)};
	background-color: ${(props) =>
		props.theme.palette.mode === 'dark'
			? props.theme.palette.grey[900]
			: props.theme.palette.grey[50]};
	transition: transform 0.3s ease, box-shadow 0.3s ease;

	&:hover {
		transform: translateY(-5px);
		box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
	}
`;
