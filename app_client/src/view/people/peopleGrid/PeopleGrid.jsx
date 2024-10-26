import React, { useMemo } from 'react';
import { Divider, Box } from '@mui/material';
import PersonCard from './personCard/PersonCard';
import { getSortedAndGroupedData, getSortLabel } from 'utils/professionUtils';
import { StencilTypography } from './PeopleGridStyles';

const PeopleGrid = ({
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
				<React.Fragment key={`group-${group.key}-${groupIndex}`}>
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
								key={`person-${person.id}`}
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

export default PeopleGrid;
