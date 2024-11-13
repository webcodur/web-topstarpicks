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
} from 'store/atom';

// 커스텀 훅
import useProfessionData from 'hooks/useProfessionData';
import { useModalState } from 'hooks/useModalState';
import { useEraBoundaries } from 'hooks/useEraBoundaries';

// 컴포넌트
import LoadingScreen from 'components/ui/loading/LoadingScreen';
import LoadingMessageBox from 'components/ui/loading/LoadingMessageBox';
import AgeBoundaries from './AgeBoundaries';
import PeopleGrid from './peopleGrid/PeopleGrid';
import ScoreModal from './scoreModal/ScoreModal';
import FilterControls from './dataControlPanel/FilterControls';

// 스타일
import { PageTitle, ContentWrapper, Divider, Spacer } from './People.styles';

const Title = ({ menu }) => (
	<>
		<PageTitle variant="h3" component="h1" align="center">
			{menu === '추천정보' && '유명인사 추천정보'}
			{menu.includes('도감') && menu}
		</PageTitle>

		<PageTitle variant="h5" component="h3" align="center">
			{menu === '추천정보' && '인물별 컨텐츠 추천정보를 확인하세요!'}
			{menu.includes('도감') &&
				'인물별 능력치를 확인하고 카드 게임에 활용하세요!'}
		</PageTitle>
	</>
);

const People = () => {
	const [contentName] = useAtom(contentNameAtom);
	const [timesName] = useAtom(timesNameAtom);
	const [profession] = useAtom(professionNameAtom);
	const [menuInfo] = useAtom(menuInfoAtom);
	const [viewType] = useAtom(viewTypeAtom);

	const { profDataLoaded, professionData } = useProfessionData(
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

	if (!profDataLoaded)
		return <LoadingScreen loadingStatus={'데이터 로딩중...'} />;

	return (
		<ContentWrapper ref={containerRef}>
			<Title menu={menuInfo} />
			<FilterControls
				sortCriteria={sortCriteria}
				setSortCriteria={setSortCriteria}
				sortOrder={sortOrder}
				setSortOrder={setSortOrder}
				viewType={viewType}
			/>

			<Divider />
			<Spacer />
			<Spacer />

			{professionData?.length === 0 && (
				<LoadingMessageBox loadingStatus={'해당 데이터가 없습니다.'} />
			)}

			{menuInfo === '신화도감' && (
				<LoadingMessageBox loadingStatus={'신화 도감 업데이트 준비중...'} />
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
					/>
				</>
			)}
		</ContentWrapper>
	);
};

export default React.memo(People);
