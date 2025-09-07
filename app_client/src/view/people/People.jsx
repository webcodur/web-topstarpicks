import React, { useState, useEffect, useRef } from 'react';
// 외부 라이브러리
import { useAtom } from 'jotai';

// 전역 상태
import {
	contentNameAtom,
	timesNameAtom,
	professionNameAtom,
	menuInfoAtom,
	viewTypeAtom,
	profDataLoadedAtom,
} from 'store/atom';

// 커스텀 훅
import useProfessionData from 'hooks/useProfessionData';
import { useModalState } from 'hooks/useModalState';
import { useEraBoundaries } from 'hooks/useEraBoundaries';

// 컴포넌트
import AgeBoundaries from './AgeBoundaries';
import PeopleGrid from './peopleGrid/PeopleGrid';
import ScoreModal from './scoreModal/ScoreModal';
import DataControlPanel from './dataControlPanel/DataControlPanel';
import Title from './Title';


const People = () => {
	const [contentName] = useAtom(contentNameAtom);
	const [timesName] = useAtom(timesNameAtom);
	const [profession] = useAtom(professionNameAtom);
	const [menuInfo] = useAtom(menuInfoAtom);
	const [viewType, setViewType] = useAtom(viewTypeAtom);
	const [profDataLoaded] = useAtom(profDataLoadedAtom);

	const { professionData } = useProfessionData(
		profession,
		contentName,
		timesName,
		menuInfo
	);

	const [sortCriteria, setSortCriteria] = useState('influence');
	const [sortOrder, setSortOrder] = useState('desc');

	const { modalOpen, selectedPerson, handleModalOpen, handleModalClose } =
		useModalState();

	const { eraBoundaries, setEraBoundaries } = useEraBoundaries();

	const containerRef = useRef(null);

	useEffect(() => {
		const resizeObserver = new ResizeObserver((entries) => {});
		if (containerRef.current) resizeObserver.observe(containerRef.current);
		return () => resizeObserver.disconnect();
	}, []);

	const handleViewTypeChange = (newViewType) => {
		setViewType(newViewType);
	};

	if (!profDataLoaded) {
		return <div></div>;
	}

	return (
		<div ref={containerRef} className="max-w-full px-4 box-border">
			<Title menu={menuInfo} />
			<DataControlPanel
				sortCriteria={sortCriteria}
				setSortCriteria={setSortCriteria}
				sortOrder={sortOrder}
				setSortOrder={setSortOrder}
				viewType={viewType}
				onViewTypeChange={handleViewTypeChange}
			/>

			<hr className="border-gray-300 my-4" />
			<div className="h-8"></div>

			{professionData?.length === 0 && (
				<div className="text-gray-600 text-center py-8">해당 데이터가 없습니다.</div>
			)}

			{menuInfo === '신화도감' && (
				<div className="text-gray-600 text-center py-8">신화 도감은 업데이트 준비중입니다...</div>
			)}

			{menuInfo !== '신화도감' && professionData?.length > 0 && (
				<>
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
						viewType={viewType}
					/>

					<ScoreModal
						person={selectedPerson}
						open={modalOpen}
						onClose={handleModalClose}
						container={document.body}
					/>
				</>
			)}
		</div>
	);
};

export default React.memo(People);
