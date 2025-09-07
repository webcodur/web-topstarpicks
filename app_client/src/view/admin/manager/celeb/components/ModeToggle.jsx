import React from 'react';
import { Button } from '../../../../../components/ui/button';

// 모드 전환 토글 버튼 컴포넌트
// 추가/수정 모드 간 전환을 위한 토글 버튼 그룹
const ModeToggle = ({ mode, onModeChange }) => (
	<div className="flex justify-center mb-6">
		<div className="inline-flex rounded-md shadow-sm" role="group">
			<Button
				variant={mode === 'create' ? 'default' : 'outline'}
				size="sm"
				className="rounded-r-none"
				onClick={(e) => onModeChange(e, 'create')}>
				유명인사 추가
			</Button>
			<Button
				variant={mode === 'edit' ? 'default' : 'outline'}
				size="sm"
				className="rounded-l-none border-l-0"
				onClick={(e) => onModeChange(e, 'edit')}>
				유명인사 수정/삭제
			</Button>
		</div>
	</div>
);

export default ModeToggle;
