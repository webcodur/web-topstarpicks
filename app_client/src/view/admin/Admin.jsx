import React, { useState, useCallback } from 'react';
import { Snackbar } from '@mui/material';
import { StyledBox } from './AdminStyles';
import AccordionSection from './AccordionSection';
import { adminSections } from './config/adminSections';

const Admin = () => {
	const [snackbar, setSnackbar] = useState({ open: false, message: '' });
	const [expanded, setExpanded] = useState(false);

	const handleChange = useCallback(
		(panel) => (event, isExpanded) => {
			setExpanded(isExpanded ? panel : false);
		},
		[]
	);

	const showSnackbar = useCallback((message) => {
		setSnackbar({ open: true, message });
	}, []);

	const handleSnackbarClose = useCallback(() => {
		setSnackbar((prev) => ({ ...prev, open: false }));
	}, []);

	return (
		<StyledBox>
			{adminSections.map(({ id, title, component: Component }) => (
				<AccordionSection
					key={id}
					expanded={expanded === id}
					onChange={handleChange(id)}
					title={title}>
					{expanded === id && <Component showSnackbar={showSnackbar} />}
				</AccordionSection>
			))}

			<Snackbar
				open={snackbar.open}
				autoHideDuration={6000}
				onClose={handleSnackbarClose}
				message={snackbar.message}
			/>
		</StyledBox>
	);
};

export default React.memo(Admin);
