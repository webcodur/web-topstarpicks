// Profession.jsx
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Typography } from '@mui/material';
import { useAtom } from 'jotai';
import { contentNameAtom } from 'store/atom';
import useProfessionData from './useProfessionData';
import SortControls from './SortControls';
import AgeBoundaries from './AgeBoundaries';
import ProfessionGrid from './ProfessionGrid';
import ScoreModal from './scoreModal/ScoreModal';

const Profession = () => {
	const [contentName] = useAtom(contentNameAtom);
	const { profession } = useParams();
	const professionData = useProfessionData(profession, contentName);
	const [modalOpen, setModalOpen] = useState(false);
	const [selectedPerson, setSelectedPerson] = useState(null);
	const [sortCriteria, setSortCriteria] = useState('rank');
	const [sortOrder, setSortOrder] = useState('desc');
	const [eraBoundaries, setEraBoundaries] = useState({
		ancient: 500,
		medieval: 1500,
		modern: 1900,
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
		return <Typography>데이터를 불러오는 중입니다...</Typography>;
	}

	return (
		<div>
			<Typography
				variant="h4"
				component="h1"
				gutterBottom
				align="center"
				sx={{ mt: 4, mb: 4, fontWeight: 'bold' }}>
				{contentName === '전체' ? pageTitle : `${pageTitle}들의 ${contentName}`}
			</Typography>

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
		</div>
	);
};

export default Profession;
