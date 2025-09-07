import React, { useMemo } from 'react';
import PersonCard from './personCard/PersonCard';
import { getSortedAndGroupedData, getSortLabel } from 'utils/professionUtils';
import { Separator } from 'components/ui/separator';

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
					{groupIndex > 0 && sortCriteria && <Separator className="my-4" />}
					<div className="mb-6" />

					{sortCriteria && (
						<h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 my-4 stencil-font">
							{getSortLabel(sortCriteria, group.key, eraBoundaries, group)}
						</h2>
					)}

					<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
						{group.persons.map((person) => (
							<div key={`person-${person.id}`}>
								<PersonCard
									person={person}
									contentName={contentName}
									onModalOpen={onModalOpen}
								/>
							</div>
						))}
					</div>
				</React.Fragment>
			))}
		</>
	);
};

export default PeopleGrid;
