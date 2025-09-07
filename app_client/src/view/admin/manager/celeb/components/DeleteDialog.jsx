import React from 'react';
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogFooter,
} from '../../../../../components/ui/dialog';
import { Button } from '../../../../../components/ui/button';

// 삭제 확인 다이얼로그 컴포넌트
// 삭제 전 사용자 확인을 받기 위한 모달
const DeleteDialog = ({ open, onClose, onDelete }) => (
	<Dialog open={open} onOpenChange={onClose}>
		<DialogContent>
			<DialogHeader>
				<DialogTitle>유명인사 삭제</DialogTitle>
			</DialogHeader>
			<div className="py-4">
				<p>정말로 이 유명인사를 삭제하시겠습니까?</p>
				<p className="text-sm text-destructive mt-2">
					이 작업은 되돌릴 수 없습니다.
				</p>
			</div>
			<DialogFooter className="space-x-2">
				<Button variant="outline" onClick={onClose}>
					취소
				</Button>
				<Button variant="destructive" onClick={onDelete}>
					삭제
				</Button>
			</DialogFooter>
		</DialogContent>
	</Dialog>
);

export default DeleteDialog;
