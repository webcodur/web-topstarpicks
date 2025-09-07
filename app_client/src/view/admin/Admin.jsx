import React, { useState, useCallback } from 'react';
import { useToast } from '../../hooks/use-toast';
import AccordionSection from './AccordionSection';
import { adminSections } from './config/adminSections';

const Admin = () => {
	const { toast } = useToast();
	const [expanded, setExpanded] = useState(false);

	const handleChange = useCallback(
		(panel) => (event, isExpanded) => {
			setExpanded(isExpanded ? panel : false);
		},
		[]
	);

	const showSnackbar = useCallback((message) => {
		toast({ 
			title: message,
			duration: 6000 
		});
	}, [toast]);

	return (
		<div className="flex flex-col gap-4 w-full items-center">
			{adminSections.map(({ id, title, component: Component }) => (
				<AccordionSection
					key={id}
					expanded={expanded === id}
					onChange={handleChange(id)}
					title={title}>
					{expanded === id && <Component showSnackbar={showSnackbar} />}
				</AccordionSection>
			))}
		</div>
	);
};

export default React.memo(Admin);
