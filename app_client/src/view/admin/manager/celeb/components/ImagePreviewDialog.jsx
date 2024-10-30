import React from 'react';
import { Dialog, DialogContent, CardMedia } from '@mui/material';

// 이미지 미리보기 다이얼로그 컴포넌트
// 이미지 링크 입력 시 전체화면으로 미리보기 제공
const ImagePreviewDialog = ({ open, onClose, imageUrl }) => (
	<Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
		<DialogContent>
			<CardMedia
				component="img"
				image={imageUrl}
				alt="Celebrity preview"
				sx={{ width: '100%', height: 'auto' }}
				onError={(e) => {
					e.target.onerror = null;
					e.target.src = '/placeholder-image.jpg';
				}}
			/>
		</DialogContent>
	</Dialog>
);

export default ImagePreviewDialog;
