import styled from '@emotion/styled';
import { Card, CardContent, Button, Typography } from '@mui/material';

export const StyledCard = styled(Card)`
	height: 100%;
	display: flex;
	flex-direction: column;
	background-color: ${(props) => props.theme.palette.background.paper};
	transition: transform 0.1s ease-in-out, box-shadow 0.1s ease-in-out;
	border-radius: 16px;
	overflow: hidden;
	box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
	&:hover {
		transform: translateY(-2px);
		box-shadow: 0 6px 25px gray;
	}
`;

export const StyledCardContent = styled(CardContent)``;

export const Introduction = styled.div`
	margin-bottom: ${(props) => props.theme.spacing(2)};
	flex-grow: 1;
	color: ${(props) => props.theme.palette.text.primary};
`;

export const ButtonContainer = styled.div`
	display: flex;
	gap: 8px;
	flex-wrap: wrap;
	margin-top: 16px;
`;

export const PersonPreName = styled(Typography)`
	text-align: center;
	font-size: 1.2rem;
	margin-top: 16px;
	font-family: 'Noto Serif KR', serif;
	color: ${(props) => props.theme.palette.text.primary};
`;

export const PersonName = styled(Typography)`
	text-align: center;
	font-size: 1.3rem;
	font-weight: 800;
	margin-bottom: 8px;
	font-family: 'Gowun Batang', serif;
	color: ${(props) => props.theme.palette.text.primary};
`;

export const StyledButton = styled(Button)`
	border-radius: 10px;
	height: 55px;
	color: ${(props) => props.theme.palette.text.primary};
	background-color: ${(props) => props.theme.palette.action.hover};
	transition: all 0.1s ease;
	&:hover {
		background-color: ${(props) => props.theme.palette.primary.light};
		color: ${(props) => props.theme.palette.common.white};
	}
`;

export const PersonInfo = styled(Typography)`
	margin-bottom: 4px;
	display: flex;
	svg {
		margin-right: 10px;
	}
`;

export const BiographyContainer = styled.div`
	position: relative;
`;

export const BiographyText = styled(Typography)`
	font-size: 0.9rem;
	line-height: 1.6;
	max-height: 7.2em;
	overflow: hidden;
	display: -webkit-box;
	-webkit-line-clamp: 4;
	-webkit-box-orient: vertical;
	text-overflow: ellipsis;
`;

export const ReadMoreButton = styled(Button)`
	padding: 0;
	margin-left: 4px;
	min-width: auto;
	font-size: 0.9rem;
	text-transform: none;
	color: ${(props) => props.theme.palette.primary.main};
	vertical-align: baseline;
	display: inline;
	&:hover {
		background-color: transparent;
		text-decoration: underline;
	}
`;
