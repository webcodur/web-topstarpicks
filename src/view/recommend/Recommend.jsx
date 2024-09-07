import React, { useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { celebData } from 'store/content/celebData';
import {
	Grid,
	Card,
	CardContent,
	Typography,
	Box,
	Button,
} from '@mui/material';
import { formatNameForUrl } from 'utils/urlUtils';

const Recommend = () => {
	const { jobCategory } = useParams();
	const navigate = useNavigate();

	const filteredData = useMemo(() => {
		return celebData.filter((person) => person.jobType === jobCategory);
	}, [jobCategory]);

	const handleContentClick = (personName, content) => {
		navigate(`/${jobCategory}/${formatNameForUrl(personName)}/${content}`);
	};

	return (
		<div>
			<h1>
				{jobCategory.charAt(0).toUpperCase() + jobCategory.slice(1)}'s top pick
			</h1>

			<Grid container spacing={3}>
				{filteredData.map((person, index) => (
					<Grid item xs={12} sm={6} md={4} lg={3} key={index}>
						<Card>
							<CardContent>
								<img
									src={`https://via.placeholder.com/150?text=${encodeURIComponent(
										person.name
									)}`}
									alt={person.name}
									style={{ width: '100%', height: 'auto' }}
								/>
								<Typography variant="h6">{person.name}</Typography>
								<Typography variant="body2">{person.nationality}</Typography>
								<Typography variant="body2">{person.introduction}</Typography>
								<Box style={{ display: 'flex', gap: '3px', marginTop: '10px' }}>
									{person.contentType.map((content) => (
										<Button
											key={`${person.name}-${content}`}
											onClick={() => handleContentClick(person.name, content)}
											style={{
												display: 'flex',
												border: '1px solid black',
												borderRadius: '3px',
												padding: '5px',
											}}>
											{content}
										</Button>
									))}
								</Box>
							</CardContent>
						</Card>
					</Grid>
				))}
			</Grid>
		</div>
	);
};

export default Recommend;
