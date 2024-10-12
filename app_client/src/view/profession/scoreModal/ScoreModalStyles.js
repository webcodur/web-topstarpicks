import styled from '@emotion/styled';
import { Typography } from '@mui/material';

export const ModalContent = styled.div`
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	width: 90%;
	max-width: 600px;
	height: 90%;
	max-height: 800px;
	background-color: ${(props) => props.theme.palette.background.paper};
	border: 2px solid #000;
	box-shadow: 24px;
	padding: 20px;
	border-radius: 10px;
	display: flex;
	flex-direction: column;
	overflow-y: auto;
`;

export const FlexCenter = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	margin-bottom: 20px;
`;

export const Title = styled(Typography)`
	font-weight: bold;
	font-size: 1.5rem;
`;

export const ContentWrapper = styled.div`
	flex-grow: 1;
	overflow-y: auto;
	margin-top: 20px;
`;

export const TabPanel = styled.div`
	display: ${(props) => (props.value === props.index ? 'block' : 'none')};
	padding: 20px 0;
`;

export const Name = styled(Typography)`
	font-weight: bold;
`;
