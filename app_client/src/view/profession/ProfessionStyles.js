import styled from '@emotion/styled';
import { Card, CardContent, Button } from '@mui/material';

export const StyledCard = styled(Card)`
	height: 100%;
	display: flex;
	flex-direction: column;
	background-color: ${(props) => props.theme.palette.background.paper};
`;

export const StyledCardContent = styled(CardContent)`
	flex-grow: 1;
	display: flex;
	flex-direction: column;
`;

export const ImageContainer = styled.div`
	position: relative;
	width: 100%;
	padding-top: 180%;
	overflow: hidden;
	margin-bottom: ${(props) => props.theme.spacing(2)};
`;

export const StyledImage = styled.img`
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	object-fit: cover;
	cursor: pointer;
`;

export const Introduction = styled.div`
	margin-bottom: ${(props) => props.theme.spacing(2)};
	flex-grow: 1;
	color: ${(props) => props.theme.palette.text.primary};
`;

export const ButtonContainer = styled.div`
	display: flex;
	gap: 3px;
	flex-wrap: wrap;
`;

export const StyledButton = styled(Button)`
	border: 1px solid ${(props) => props.theme.palette.text.primary};
	border-radius: 3px;
	padding: 5px;
	margin-bottom: 5px;
	color: ${(props) => props.theme.palette.text.primary};
	&:hover {
		background-color: ${(props) => props.theme.palette.action.hover};
	}
`;

export const OverlayContainer = styled.div`
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	background-color: rgba(0, 0, 0, 0.7);
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	cursor: pointer;
`;

export const OverlayButton = styled(Button)`
	margin: 5px;
	color: white;
	border: 1px solid white;
	&:hover {
		background-color: rgba(255, 255, 255, 0.1);
	}
`;
