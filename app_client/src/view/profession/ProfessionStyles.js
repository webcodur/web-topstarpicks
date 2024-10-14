import styled from '@emotion/styled';
import { Card, CardContent, Button, Typography } from '@mui/material';

export const StyledCard = styled(Card)`
	height: 100%;
	/* height: 1100px; */
	display: flex;
	flex-direction: column;
	background-color: ${(props) => props.theme.palette.background.paper};
	transition: transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out;
	border-radius: 16px;
	overflow: hidden;
	box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
	&:hover {
		transform: translateY(-5px);
		box-shadow: 0 6px 25px rgba(0, 0, 0, 0.15);
	}
`;

export const StyledCardContent = styled(CardContent)`
	/* flex-grow: 1;
	display: flex;
	flex-direction: column;
	padding: 24px; */
`;

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

export const PersonName = styled(Typography)`
	font-size: 1.3rem; // 크기를 약간 줄임
	font-weight: 600;
	margin-top: 16px; // 이미지와의 간격을 위해 상단 마진 추가
	margin-bottom: 8px;
	color: ${(props) => props.theme.palette.text.primary};
`;

export const StyledButton = styled(Button)`
	border: none;
	border-radius: 4px; // 네모난 모서리로 변경
	padding: 6px 12px;
	margin-bottom: 8px;
	margin-right: 8px;
	color: ${(props) => props.theme.palette.text.primary};
	background-color: ${(props) => props.theme.palette.action.hover};
	transition: all 0.1s ease; // 즉시 적용되는 애니메이션

	&:hover {
		background-color: ${(props) => props.theme.palette.primary.light};
		color: ${(props) => props.theme.palette.common.white};
	}
`;

export const PersonInfo = styled(Typography)`
	font-size: 0.9rem;
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
