import React from 'react';
import { Box, ToggleButtonGroup, ToggleButton } from '@mui/material';
import { styles } from '../CelebForm.styles';

// 모드 전환 토글 버튼 컴포넌트
// 추가/수정 모드 간 전환을 위한 토글 버튼 그룹
const ModeToggle = ({ mode, onModeChange }) => (
	<Box sx={styles.modeToggleContainer}>
		<ToggleButtonGroup
			value={mode}
			exclusive
			onChange={onModeChange}
			aria-label="celeb form mode"
			size="small"
			sx={styles.toggleButtonGroup}>
			<ToggleButton value="create">유명인사 추가</ToggleButton>
			<ToggleButton value="edit">유명인사 수정/삭제</ToggleButton>
		</ToggleButtonGroup>
	</Box>
);

export default ModeToggle;
