import React, { useState, useCallback } from 'react';
import { Snackbar } from '@mui/material';
import { StyledBox } from './AdminStyles';
import CelebritiesManager from './CelebritiesManager';

const Admin = () => {
	const [snackbar, setSnackbar] = useState({ open: false, message: '' });

	const showSnackbar = useCallback((message) => {
		setSnackbar({ open: true, message });
	}, []);

	return (
		<StyledBox>
			<CelebritiesManager showSnackbar={showSnackbar} />

			{/* Here you can add more components for other tables */}

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
