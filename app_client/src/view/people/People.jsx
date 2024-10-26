import React, { useState } from 'react';
import { useAtom } from 'jotai';
import {
	contentNameAtom,
	timesNameAtom,
	professionNameAtom,
	menuInfoAtom,
} from 'store/atom';
import useProfessionData from '../../hooks/useProfessionData';
import SortControls from './dataControlPanel/SortControls';
import ProfessionFilter from './dataControlPanel/ProfessionFilter';
import AgeBoundaries from './AgeBoundaries';
import PeopleGrid from './peopleGrid/PeopleGrid';
import ScoreModal from './scoreModal/ScoreModal';
import LoadingScreen from './LoadingScreen';
import CategorySelect from './dataControlPanel/CategorySelect';
import CategorySelect2 from './dataControlPanel/CategorySelect2';
import FilterControls from './dataControlPanel/FilterControls';

import { PageTitle, ContentWrapper, Divider, Spacer } from './People.styles';

const People = () => {
	const [contentName] = useAtom(contentNameAtom);
	const [timesName] = useAtom(timesNameAtom);

	const [profession] = useAtom(professionNameAtom);
	const [menuInfo] = useAtom(menuInfoAtom);

	const professionData = useProfessionData(
		profession,
		contentName,
		timesName,
		menuInfo
	);

	const [modalOpen, setModalOpen] = useState(false);
	const [selectedPerson, setSelectedPerson] = useState(null);
	const [sortCriteria, setSortCriteria] = useState('influence');
	const [sortOrder, setSortOrder] = useState('desc');

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
			<PageTitle variant="h3" component="h1" align="center">
				{menuInfo === '추천정보' && '유명인사 추천정보'}
				{menuInfo === '인물도감' && '유명인사 인물도감'}
			</PageTitle>
			<PageTitle variant="h5" component="h3" align="center">
				{menuInfo === '추천정보' &&
					'컨텐츠 종류에 따른 인물별 추천정보를 확인하세요!'}
				{menuInfo === '인물도감' &&
					'인물별 특성과 능력치를 확인하고 카드 게임에서 활용하세요!'}
			</PageTitle>

			<FilterControls>
				<ProfessionFilter currentProfession={profession} />

				{menuInfo === '추천정보' && <CategorySelect />}
				<CategorySelect2 />

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
