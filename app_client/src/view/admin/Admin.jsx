import React, { useState, useCallback, lazy, Suspense } from 'react';
import {
	Snackbar,
	Accordion,
	AccordionDetails,
	Typography,
	CircularProgress,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { StyledBox, StyledAccordionSummary } from './AdminStyles';

const Celeb = lazy(() => import('./manager/celeb/Celeb'));
const Recommendation = lazy(() => import('./manager/recs/Recs'));
const NewCelebForm = lazy(() => import('./manager/celeb/NewCelebForm'));
const NewRecsForm = lazy(() => import('./manager/recs/NewRecsForm'));
const Crawling = lazy(() => import('./Crawling')); // 새로 추가된 컴포넌트

const AccordionSection = React.memo(
	({ expanded, onChange, title, children }) => (
		<Accordion expanded={expanded} onChange={onChange}>
			<StyledAccordionSummary
				expandIcon={<ExpandMoreIcon />}
				aria-controls={`${title.toLowerCase()}-content`}
				id={`${title.toLowerCase()}-header`}>
				<Typography>{title}</Typography>
			</StyledAccordionSummary>
			<AccordionDetails>
				<Suspense fallback={<CircularProgress />}>
					{expanded && children}
				</Suspense>
			</AccordionDetails>
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

	return (
		<StyledBox>
			<AccordionSection
				expanded={expanded === 'celeb'}
				onChange={handleChange('celeb')}
				title="Celeb Management">
				{expanded === 'celeb' && <Celeb showSnackbar={showSnackbar} />}
			</AccordionSection>

			<AccordionSection
				expanded={expanded === 'recommendation'}
				onChange={handleChange('recommendation')}
				title="Recommendation Management">
				{expanded === 'recommendation' && (
					<Recommendation showSnackbar={showSnackbar} />
				)}
			</AccordionSection>

			<AccordionSection
				expanded={expanded === 'newCeleb'}
				onChange={handleChange('newCeleb')}
				title="Add New Celebrity">
				{expanded === 'newCeleb' && (
					<NewCelebForm showSnackbar={showSnackbar} />
				)}
			</AccordionSection>

			<AccordionSection
				expanded={expanded === 'newRecs'}
				onChange={handleChange('newRecs')}
				title="Add New Recommendation">
				{expanded === 'newRecs' && <NewRecsForm showSnackbar={showSnackbar} />}
			</AccordionSection>

			<AccordionSection
				expanded={expanded === 'crawling'}
				onChange={handleChange('crawling')}
				title="Crawling Management">
				{expanded === 'crawling' && <Crawling showSnackbar={showSnackbar} />}
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
