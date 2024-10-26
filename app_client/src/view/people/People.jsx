import React, { useState } from 'react';
// import { useParams } from 'react-router-dom';
import { useAtom } from 'jotai';
import { contentNameAtom, professionNameAtom, menuInfoAtom } from 'store/atom';
import useProfessionData from '../../hooks/useProfessionData';
import SortControls from './dataControlPanel/SortControls';
import ProfessionFilter from './dataControlPanel/ProfessionFilter';
import AgeBoundaries from './AgeBoundaries';
import PeopleGrid from './peopleGrid/PeopleGrid';
import ScoreModal from './scoreModal/ScoreModal';
import LoadingScreen from './LoadingScreen';
import CategorySelect from './dataControlPanel/CategorySelect';
import FilterControls from './dataControlPanel/FilterControls';

import { PageTitle, ContentWrapper, Divider, Spacer } from './People.styles';

const People = () => {
	const [contentName] = useAtom(contentNameAtom);
	const [profession] = useAtom(professionNameAtom);
	const [menuInfo] = useAtom(menuInfoAtom);

	const professionData = useProfessionData(profession, contentName, menuInfo);

	const [modalOpen, setModalOpen] = useState(false);
	const [selectedPerson, setSelectedPerson] = useState(null);
	const [sortCriteria, setSortCriteria] = useState('influence');
	const [sortOrder, setSortOrder] = useState('desc');
	const pageTitle = profession === '전체' ? '전체 셀럽' : profession;

	const [eraBoundaries, setEraBoundaries] = useState({
		ancient: 476,
		medieval: 1453,
		early_modern: 1789,
		modern: 1945,
	});

	const handleModalOpen = (person) => {
		setSelectedPerson(person);
		setModalOpen(true);
	};

	const handleModalClose = () => setModalOpen(false);

	if (!professionData?.length) return <LoadingScreen />;

	return (
		<ContentWrapper>
			<PageTitle variant="h4" component="h1" align="center">
				{menuInfo === '추천정보' && '유명인사 추천정보'}
				{menuInfo === '인물도감' && '유명인사 인물도감'}
			</PageTitle>

			<FilterControls>
				<ProfessionFilter currentProfession={profession} />

				{menuInfo === '추천정보' && <CategorySelect />}

				<SortControls
					sortCriteria={sortCriteria}
					setSortCriteria={setSortCriteria}
					sortOrder={sortOrder}
					setSortOrder={setSortOrder}
				/>
			</FilterControls>

			<Divider />
			<Spacer />
			<Spacer />

			{sortCriteria === 'age' && (
				<AgeBoundaries
					eraBoundaries={eraBoundaries}
					setEraBoundaries={setEraBoundaries}
				/>
			)}

			<PeopleGrid
				professionData={professionData}
				sortCriteria={sortCriteria}
				sortOrder={sortOrder}
				eraBoundaries={eraBoundaries}
				contentName={contentName}
				onModalOpen={handleModalOpen}
			/>

			<ScoreModal
				person={selectedPerson}
				open={modalOpen}
				onClose={handleModalClose}
			/>
		</ContentWrapper>
	);
};

export default People;
