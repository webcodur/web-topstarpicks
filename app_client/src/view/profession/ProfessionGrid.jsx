// ProfessionGrid.jsx
import React, { useMemo } from 'react';
import { Grid, Typography, Divider } from '@mui/material';
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
					{/* 영역 분리선 */}
					{groupIndex > 0 && sortCriteria && <Divider sx={{ my: 2 }} />}

					{/* 영역 구분 정보 */}
					{sortCriteria && (
						<Typography variant="h6" sx={{ my: 2 }}>
							{getSortLabel(sortCriteria, group.key, eraBoundaries)}
						</Typography>
					)}

					{/* 영역 별 인물 정보 */}
					<Grid container spacing={4}>
						{group.persons.map((person) => (
							<Grid item xs={12} sm={6} md={4} lg={2} key={person.id}>
								<PersonCard
									person={person}
									contentName={contentName}
									onModalOpen={onModalOpen}
								/>
							</Grid>
						))}
					</Grid>
				</React.Fragment>
			))}
		</>
	);
};

export default ProfessionGrid;
