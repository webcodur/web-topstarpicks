import styled from '@emotion/styled';
import { Box } from '@mui/material';

export const ModalContainer = styled(Box)`
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	width: 90%;
	max-width: 600px;
	background-color: #fff;
	border-radius: 8px;
	box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
	outline: none;
`;

export const ModalHeader = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 20px;
	border-bottom: 1px solid #eee;
`;

export const ModalContent = styled.div`
	padding: 20px;
	max-height: 70vh;
	overflow-y: auto;
`;

export const CloseButton = styled.button`
	background: none;
	border: none;
	font-size: 24px;
	cursor: pointer;
	padding: 0;
	color: #666;

	&:hover {
		color: #000;
	}
`;

export const ManualSection = styled.div`
	line-height: 1.6;
`;

export const SettingSection = styled.div`
	margin-bottom: 24px;
`;

export const ButtonGroup = styled.div`
	display: flex;
	gap: 10px;
	justify-content: flex-end;
	margin-top: 20px;
`;

export const SettingButton = styled.button`
	padding: 8px 16px;
	border: 1px solid #ddd;
	border-radius: 4px;
	background: ${(props) => (props.isActive ? '#2196f3' : '#fff')};
	color: ${(props) => (props.isActive ? '#fff' : '#000')};
	cursor: pointer;
	transition: all 0.2s;

	&:hover {
		background: ${(props) => (props.isActive ? '#1976d2' : '#f5f5f5')};
	}
`;

export const SaveButton = styled.button`
	padding: 10px 20px;
	background: #2196f3;
	color: white;
	border: none;
	border-radius: 4px;
	cursor: pointer;
	transition: background 0.2s;

	&:hover {
		background: #1976d2;
	}
`;

export const CancelButton = styled.button`
	padding: 10px 20px;
	background: #f5f5f5;
	color: #666;
	border: 1px solid #ddd;
	border-radius: 4px;
	cursor: pointer;
	transition: all 0.2s;

	&:hover {
		background: #eee;
	}
`;
