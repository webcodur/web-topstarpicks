import React, { useState, useCallback, useMemo } from 'react';
import {
	Snackbar,
	Accordion,
	AccordionSummary,
	AccordionDetails,
	Typography,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { StyledBox } from './AdminStyles';

import Celeb from './manager/celeb/Celeb';
import Recommendation from './manager/recs/Recs';

const AccordionSection = React.memo(
	({ expanded, onChange, title, children }) => (
		<Accordion expanded={expanded} onChange={onChange}>
			<AccordionSummary
				expandIcon={<ExpandMoreIcon />}
				aria-controls={`${title.toLowerCase()}-content`}
				id={`${title.toLowerCase()}-header`}>
				<Typography>{title}</Typography>
			</AccordionSummary>
			<AccordionDetails>{children}</AccordionDetails>
		</Accordion>
	)
);

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

	const memoizedCeleb = useMemo(
		() => <Celeb showSnackbar={showSnackbar} />,
		[showSnackbar]
	);
	const memoizedRecommendation = useMemo(
		() => <Recommendation showSnackbar={showSnackbar} />,
		[showSnackbar]
	);

	return (
		<StyledBox>
			<AccordionSection
				expanded={expanded === 'celeb'}
				onChange={handleChange('celeb')}
				title="Celeb Management">
				{memoizedCeleb}
			</AccordionSection>

			<AccordionSection
				expanded={expanded === 'recommendation'}
				onChange={handleChange('recommendation')}
				title="Recommendation Management">
				{memoizedRecommendation}
			</AccordionSection>

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
