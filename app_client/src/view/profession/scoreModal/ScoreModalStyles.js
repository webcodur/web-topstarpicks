import styled from '@emotion/styled';
import { Typography } from '@mui/material';

export const ModalContent = styled.div`
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	width: 100%;
	max-width: 400px;
	background-color: ${(props) => props.theme.palette.background.paper};
	border: 2px solid #000;
	box-shadow: 24px;
	padding: 10px;
	border-radius: 10px;
`;

export const FlexCenter = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
`;

export const Title = styled(Typography)`
	font-weight: bold;
	margin-bottom: 10px;
	margin-top: 10px;
`;

export const Name = styled(Typography)`
	font-weight: bold;
`;
