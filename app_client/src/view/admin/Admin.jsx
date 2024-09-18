import React, { useState, useCallback } from 'react';
import { Snackbar } from '@mui/material';
import { StyledBox } from './AdminStyles';
import CelebritiesManager from './CelebritiesManager';
import RecommendationManager from './RecommendationManager';

const Admin = () => {
	const [snackbar, setSnackbar] = useState({ open: false, message: '' });

	const showSnackbar = useCallback((message) => {
		setSnackbar({ open: true, message });
	}, []);

	return (
		<StyledBox>
			{/* 셀럽 정보 관리자 */}
			<CelebritiesManager showSnackbar={showSnackbar} />

			{/* 추천 컨텐츠 정보 관리자 */}
			<RecommendationManager showSnackbar={showSnackbar} />

			<Snackbar
				open={snackbar.open}
				autoHideDuration={6000}
				onClose={() => setSnackbar({ ...snackbar, open: false })}
				message={snackbar.message}
			/>
		</StyledBox>
	);
};

export default Admin;
