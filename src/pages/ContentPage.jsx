import React from 'react';
import { useParams } from 'react-router-dom';
import { Typography, Container } from '@mui/material';
import { celebData } from 'store/content/celebData';
import { parseNameFromUrl } from 'utils/urlUtils';

const ContentPage = () => {
	const { jobCategory, personName, contentType } = useParams();

	const person = celebData.find(
		(celeb) =>
			celeb.jobType === jobCategory &&
			celeb.name === parseNameFromUrl(personName)
	);

	if (!person) {
		return <Typography>Person not found</Typography>;
	}

	return (
		<Container>
			<Typography variant="h4">
				{person.name}'s {contentType}
			</Typography>
			<Typography variant="h6">
				JOB: {jobCategory.charAt(0).toUpperCase() + jobCategory.slice(1)}
			</Typography>
			<Typography variant="body1">
				This is the {contentType} content for {person.name}. You can add more
				specific content here based on the contentType.
			</Typography>
		</Container>
	);
};

export default ContentPage;
