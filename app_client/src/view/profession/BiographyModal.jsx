import React from 'react';
import { Modal, Box, Typography, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import styled from '@emotion/styled';

const ModalContent = styled(Box)`
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	width: 80%;
	max-width: 600px;
	background-color: ${(props) => props.theme.palette.background.paper};
	border-radius: 8px;
	padding: 32px;
	box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
`;

const ModalTitle = styled(Typography)`
	font-size: 1.5rem;
	font-weight: 600;
	margin-bottom: 16px;
`;

const CloseButton = styled(IconButton)`
	position: absolute;
	top: 8px;
	right: 8px;
`;

const BiographyModal = ({ isOpen, onClose, biography, name }) => {
	return (
		<Modal open={isOpen} onClose={onClose}>
			<ModalContent>
				<CloseButton onClick={onClose}>
					<CloseIcon />
				</CloseButton>
				<ModalTitle>{name}의 약력</ModalTitle>
				<Typography>{biography || '정보가 없습니다.'}</Typography>
			</ModalContent>
		</Modal>
	);
};

export default BiographyModal;
