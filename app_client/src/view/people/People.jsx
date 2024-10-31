import React, { useState, useEffect, useRef } from 'react';

// 외부 라이브러리
import { useAtom } from 'jotai';

// 전역 상태
import {
	contentNameAtom,
	timesNameAtom,
	professionNameAtom,
	menuInfoAtom,
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

const Title = ({ menuInfo }) => (
	<>
		<PageTitle variant="h3" component="h1" align="center">
			{menuInfo === '추천정보' && '유명인사 추천정보'}
			{menuInfo === '인물도감' && '유명인사 인물도감'}
		</PageTitle>
		<PageTitle variant="h5" component="h3" align="center">
			{menuInfo === '추천정보' &&
				'컨텐츠 종류 따른 인물별 추천정보를 확인하세요!'}
			{menuInfo === '인물도감' &&
				'인물별 특성과 능력치를 확인하고 카드 게임에서 활용하세요!'}
		</PageTitle>
	</>
);

const People = () => {
	const [contentName] = useAtom(contentNameAtom);
	const [timesName] = useAtom(timesNameAtom);
	const [profession] = useAtom(professionNameAtom);
	const [menuInfo] = useAtom(menuInfoAtom);

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
		// ResizeObserver 인스턴스 생성: 필요한 경우 여기서 크기 변경 처리
		const resizeObserver = new ResizeObserver((entries) => {});

		// 컨테이너 요소 관찰 시작
		if (containerRef.current) resizeObserver.observe(containerRef.current);

		// 클린업 함수
		return () => resizeObserver.disconnect();
	}, []);

	if (!profDataLoaded) return <LoadingScreen loadingStatus={"데이터 로딩중..."}/>;

	return (
		<ContentWrapper ref={containerRef}>
			<Title menuInfo={menuInfo} />
			<FilterControls
				sortCriteria={sortCriteria}
				setSortCriteria={setSortCriteria}
				sortOrder={sortOrder}
				setSortOrder={setSortOrder}
			/>

			<Divider />
			<Spacer />
			<Spacer />

			{professionData?.length === 0 && <LoadingMessageBox loadingStatus={"해당 데이터가 없습니다."}/>}

			{professionData?.length > 0 && (
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
