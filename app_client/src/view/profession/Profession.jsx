// Profession.jsx
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAtom } from 'jotai';
import { contentNameAtom } from 'store/atom';
import useProfessionData from './useProfessionData';
import SortControls from './SortControls';
import AgeBoundaries from './AgeBoundaries';
import ProfessionGrid from './professionGrid/ProfessionGrid';
import ScoreModal from './scoreModal/ScoreModal';
import LoadingScreen from './LoadingScreen';
import {
	PageTitle,
	ContentWrapper,
	Divider,
	Spacer,
} from './Profession.styles';

const Profession = () => {
	const [contentName] = useAtom(contentNameAtom);
	const { profession } = useParams();
	const professionData = useProfessionData(profession, contentName);
	const [modalOpen, setModalOpen] = useState(false);
	const [selectedPerson, setSelectedPerson] = useState(null);
	const [sortCriteria, setSortCriteria] = useState('rank');
	const [sortOrder, setSortOrder] = useState('desc');
	const [eraBoundaries, setEraBoundaries] = useState({
		ancient: 476,
		medieval: 1453,
		early_modern: 1789,
		modern: 1945,
	});

	const pageTitle = profession === '전체' ? '전체 셀럽' : profession;

	const handleModalOpen = (person) => {
		setSelectedPerson(person);
		setModalOpen(true);
	};

	const handleModalClose = () => {
		setModalOpen(false);
	};

	if (!Array.isArray(professionData) || professionData.length === 0) {
		return <LoadingScreen />;
	}

	return (
		<ContentWrapper>
			<PageTitle variant="h4" component="h1" align="center">
				{contentName === '전체' ? pageTitle : `${pageTitle}들의 ${contentName}`}
			</PageTitle>
			<Divider />
			<Spacer />

			<SortControls
				sortCriteria={sortCriteria}
				setSortCriteria={setSortCriteria}
				sortOrder={sortOrder}
				setSortOrder={setSortOrder}
			/>

			{sortCriteria === 'age' && (
				<AgeBoundaries
					eraBoundaries={eraBoundaries}
					setEraBoundaries={setEraBoundaries}
				/>
			)}

			<ProfessionGrid
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

export default Profession;
