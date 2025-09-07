import React from 'react';
import {
	Dialog,
	DialogContent,
} from '../../../../../components/ui/dialog';

// 이미지 미리보기 다이얼로그 컴포넌트
// 이미지 링크 입력 시 전체화면으로 미리보기 제공
const ImagePreviewDialog = ({ open, onClose, imageUrl }) => (
	<Dialog open={open} onOpenChange={onClose}>
		<DialogContent className="max-w-4xl">
			<img
				src={imageUrl}
				alt="Celebrity preview"
				className="w-full h-auto max-h-[80vh] object-contain"
				onError={(e) => {
					e.target.onerror = null;
					e.target.src = '/placeholder-image.jpg';
				}}
			/>
		</DialogContent>
	</Dialog>
);

export default ImagePreviewDialog;