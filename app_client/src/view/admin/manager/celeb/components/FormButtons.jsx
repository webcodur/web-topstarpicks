import React from 'react';
import { Button } from '../../../../../components/ui/button';

// 폼 하단의 버튼 그룹 컴포넌트
// mode와 selectedCeleb 상태에 따라 적절한 버튼들을 렌더링
const FormButtons = ({ mode, selectedCeleb, onSubmit, onDelete, onReset }) => (
	<div className="col-span-12 text-center mt-4">
		{/* 수정 모드 & 선택된 유명인사 있음: 수정/삭제/초기화 버튼 */}
		{mode === 'edit' && selectedCeleb && (
			<div className="space-x-2">
				<Button
					type="submit"
					className="bg-primary hover:bg-primary/90">
					수정 완료
				</Button>
				<Button
					variant="destructive"
					onClick={onDelete}>
					삭제
				</Button>
				<Button 
					variant="outline" 
					onClick={onReset}>
					초기화
				</Button>
			</div>
		)}

		{/* 수정 모드 & 선택된 유명인사 없음: 안내 메시지 */}
		{mode === 'edit' && !selectedCeleb && (
			<p className="text-sm text-muted-foreground">
				수정할 유명인사를 검색하여 선택해주세요
			</p>
		)}

		{/* 생성 모드: 추가/초기화 버튼 */}
		{mode === 'create' && (
			<div className="space-x-2">
				<Button
					type="submit"
					className="bg-primary hover:bg-primary/90">
					유명인사 추가
				</Button>
				<Button 
					variant="outline" 
					onClick={onReset}>
					초기화
				</Button>
			</div>
		)}
	</div>
);

export default FormButtons;
