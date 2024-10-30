import React from 'react';
import { Grid, Button, Typography } from '@mui/material';

// 폼 하단의 버튼 그룹 컴포넌트
// mode와 selectedCeleb 상태에 따라 적절한 버튼들을 렌더링
const FormButtons = ({ mode, selectedCeleb, onSubmit, onDelete, onReset }) => (
	<Grid item xs={12} sx={{ textAlign: 'center', mt: 2 }}>
		{/* 수정 모드 & 선택된 유명인사 있음: 수정/삭제/초기화 버튼 */}
		{mode === 'edit' && selectedCeleb && (
			<>
				<Button
					type="submit"
					variant="contained"
					color="primary"
					sx={{ mr: 1 }}>
					수정 완료
				</Button>
				<Button
					variant="contained"
					color="error"
					onClick={onDelete}
					sx={{ mr: 1 }}>
					삭제
				</Button>
				<Button variant="outlined" onClick={onReset} sx={{ ml: 1 }}>
					초기화
				</Button>
			</>
		)}

		{/* 수정 모드 & 선택된 유명인사 없음: 안내 메시지 */}
		{mode === 'edit' && !selectedCeleb && (
			<Typography variant="body2" color="textSecondary">
				수정할 유명인사를 검색하여 선택해주세요
			</Typography>
		)}

		{/* 생성 모드: 추가/초기화 버튼 */}
		{mode === 'create' && (
			<>
				<Button
					type="submit"
					variant="contained"
					color="primary"
					sx={{ mr: 1 }}>
					유명인사 추가
				</Button>
				<Button variant="outlined" onClick={onReset} sx={{ ml: 1 }}>
					초기화
				</Button>
			</>
		)}
	</Grid>
);

export default FormButtons;
