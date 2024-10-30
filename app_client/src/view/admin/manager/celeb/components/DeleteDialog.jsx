import React from 'react';
import {
	Dialog,
	DialogTitle,
	DialogContent,
	DialogActions,
	Button,
	Typography,
} from '@mui/material';

// 삭제 확인 다이얼로그 컴포넌트
// 삭제 전 사용자 확인을 받기 위한 모달
const DeleteDialog = ({ open, onClose, onDelete }) => (
	<Dialog open={open} onClose={onClose}>
		<DialogTitle>유명인사 삭제</DialogTitle>
		<DialogContent>
			<Typography>정말로 이 유명인사를 삭제하시겠습니까?</Typography>
			<Typography variant="caption" color="error">
				이 작업은 되돌릴 수 없습니다.
			</Typography>
		</DialogContent>
		<DialogActions>
			<Button onClick={onClose}>취소</Button>
			<Button onClick={onDelete} color="error" variant="contained">
				삭제
			</Button>
		</DialogActions>
	</Dialog>
);

export default DeleteDialog;
