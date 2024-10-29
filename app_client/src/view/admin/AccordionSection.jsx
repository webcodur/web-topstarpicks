import React, { Suspense } from 'react';
import {
	Accordion,
	AccordionDetails,
	Typography,
	CircularProgress,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { StyledAccordionSummary } from './AdminStyles';

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

export default AccordionSection;
