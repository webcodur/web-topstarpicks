import React, { useMemo } from 'react';
import { Typography, Divider, Box } from '@mui/material';
import PersonCard from './PersonCard';
import { getSortedAndGroupedData, getSortLabel } from './professionUtils';

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
					{/* 영역 구분선 */}
					{groupIndex > 0 && sortCriteria && <Divider sx={{ my: 2 }} />}
					<br />
					<br />

					{/* 영역 */}
					{sortCriteria && (
						<Typography
							variant="h4"
							sx={{ my: 2, textAlign: 'center', fontFamily: 'fantasy' }}>
							{getSortLabel(sortCriteria, group.key, eraBoundaries)}
						</Typography>
					)}

					{/* 인물 */}
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
