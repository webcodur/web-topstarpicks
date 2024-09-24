import React, { useState, useCallback } from 'react';
import { Snackbar } from '@mui/material';
import { StyledBox } from './AdminStyles';

import Celeb from './manager/celeb/Celeb';
import Recommendation from './manager/recs/Recs';

const Admin = () => {
	const [snackbar, setSnackbar] = useState({ open: false, message: '' });

	const showSnackbar = useCallback((message) => {
		setSnackbar({ open: true, message });
	}, []);

	return (
		<StyledBox>
			<Celeb showSnackbar={showSnackbar} />
			<Recommendation showSnackbar={showSnackbar} />

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
