import styled from '@emotion/styled';
import { CardContent } from '@mui/material';
import { Link } from 'react-router-dom';
import { keyframes } from '@emotion/react';

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

export const CardWrapper = styled.div`
	position: relative;
	margin-bottom: 60px;
	display: flex;
	align-items: stretch;
`;

export const NavigationArea = styled.div`
	flex: 0 0 50px;
	display: flex;
	align-items: center;
	justify-content: center;
	cursor: ${(props) => (props.disabled ? 'not-allowed' : 'pointer')};
	background-color: ${(props) =>
		props.disabled
			? props.theme.palette.action.disabledBackground
			: props.theme.palette.action.hover};
	opacity: ${(props) => (props.disabled ? 0.3 : 0.7)};
	transition: opacity 0.3s ease, background-color 0.3s ease;

	&::before {
		content: '';
		width: 0;
		height: 0;
		border-top: 10px solid transparent;
		border-bottom: 10px solid transparent;
		${(props) =>
			props.direction === 'left'
				? 'border-right: 10px solid currentColor;'
				: 'border-left: 10px solid currentColor;'}
		opacity: ${(props) => (props.disabled ? 0.3 : 1)};
	}

	&:hover {
		opacity: ${(props) => (props.disabled ? 0.3 : 1)};
		background-color: ${(props) =>
			props.disabled
				? props.theme.palette.action.disabledBackground
				: props.theme.palette.action.selected};
	}

	${(props) =>
		props.direction === 'left'
			? `
        border-top-left-radius: ${props.theme.shape.borderRadius}px;
        border-bottom-left-radius: ${props.theme.shape.borderRadius}px;
    `
			: `
        border-top-right-radius: ${props.theme.shape.borderRadius}px;
        border-bottom-right-radius: ${props.theme.shape.borderRadius}px;
    `}
`;

export const StyledCardContent = styled(CardContent)`
	flex: 1;
	display: flex;
	flex-direction: column;
	align-items: center;
`;

export const StyledTitle = styled.h2`
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
	border: 1px solid ${(props) => props.theme.palette.divider};
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
	transition: box-shadow 0.3s ease;

	&:hover {
		box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
	}
`;

export const QuoteText = styled.span`
	margin-left: 5px;
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
	transition: box-shadow 0.3s ease;

	&:hover {
		box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
	}
`;
