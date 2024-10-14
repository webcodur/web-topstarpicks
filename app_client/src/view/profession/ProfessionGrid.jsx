import React, { useMemo } from 'react';
import { Typography, Divider, Box } from '@mui/material';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import PersonCard from './PersonCard';
import { getSortedAndGroupedData, getSortLabel } from './professionUtils';

const StencilTypography = styled(Typography)`
	text-align: center;
	font-family: fantasy;
	font-weight: bold;
	color: black;
	text-shadow: -1px -1px 0 #fff, 1px -1px 0 #fff, -1px 1px 0 #fff,
		1px 1px 0 #fff;
	letter-spacing: 2px;
	text-transform: uppercase;
	font-size: 1.5rem;

	@media (min-width: 600px) {
		font-size: 2rem;
	}

	@media (min-width: 960px) {
		font-size: 2.5rem;
	}
`;

const ProfessionGrid = ({
	professionData,
	sortCriteria,
	sortOrder,
	eraBoundaries,
	contentName,
	onModalOpen,
}) => {
	const groupedData = useMemo(
		() =>
			getSortedAndGroupedData(
				professionData,
				sortCriteria,
				sortOrder,
				eraBoundaries
			),
		[professionData, sortCriteria, sortOrder, eraBoundaries]
	);

	return (
		<>
			{groupedData.map((group, groupIndex) => (
				<React.Fragment key={group.key ?? groupIndex}>
					{groupIndex > 0 && sortCriteria && <Divider sx={{ my: 2 }} />}
					<br />
					<br />

					{sortCriteria && (
						<StencilTypography variant="h4" sx={{ my: 2 }}>
							{getSortLabel(sortCriteria, group.key, eraBoundaries)}
						</StencilTypography>
					)}

					<Box sx={{ display: 'flex', flexWrap: 'wrap', margin: -2 }}>
						{group.persons.map((person) => (
							<Box
								key={person.id}
								sx={{
									width: {
										xs: '100%',
										sm: '50%',
										md: '33.33%',
										lg: '25%',
										xl: '20%',
									},
									padding: 2,
								}}>
								<PersonCard
									person={person}
									contentName={contentName}
									onModalOpen={onModalOpen}
								/>
							</Box>
						))}
					</Box>
				</React.Fragment>
			))}
		</>
	);
};

export default ProfessionGrid;
