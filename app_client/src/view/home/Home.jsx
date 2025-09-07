import React, { useState, useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSetAtom } from 'jotai';
import {
	professionNameAtom,
	contentNameAtom,
	timesNameAtom,
} from '../../store/atom';
import CelebGallery from './components/CelebGallery';
import HeaderSection from './components/HeaderSection';
import StatisticsSection from './components/StatisticsSection';
import ServiceIcons from './components/ServiceIcons';
// Using Tailwind classes instead of styled-components
import { CELEB_IMAGES } from './constants';

const Home = () => {
	const [images, setImages] = useState(CELEB_IMAGES);
	const navigate = useNavigate();

	// atom setter 함수들 정의
	const setProfessionName = useSetAtom(professionNameAtom);
	const setContentName = useSetAtom(contentNameAtom);
	const setTimesName = useSetAtom(timesNameAtom);

	// 컴포넌트 마운트 시 필터 초기화
	useEffect(() => {
		setProfessionName('전체');
		setContentName('책');
		setTimesName('전체인물');
	}, [setProfessionName, setContentName, setTimesName]);

	// useCallback을 사용하여 함수 메모이제이션
	const moveRight = useCallback(() => {
		setImages((prev) => {
			const newImages = [...prev];
			const first = newImages.shift();
			newImages.push(first);
			return newImages;
		});
	}, []);

	const moveLeft = useCallback(() => {
		setImages((prev) => {
			const newImages = [...prev];
			const last = newImages.pop();
			newImages.unshift(last);
			return newImages;
		});
	}, []);

	const handleFirstCardClick = useCallback(() => {
		if (images[0]?.path) {
			navigate(images[0].path);
		}
	}, [images, navigate]);

	return (
		<div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
			<div className="container mx-auto px-4 py-8 max-w-7xl">
				{/* 1.1 상단 헤더 섹션: 타이틀과 서브타이틀 */}
				<HeaderSection />

				{/* 1.2 메인 콘텐츠 영역: 갤러리, 통계, 서비스 아이콘 */}
				<div className="space-y-12">
					{/* 1.2.1 셀럽 이미지 갤러리 섹션 */}
					<div className="flex justify-center">
						<CelebGallery
							images={images}
							moveLeft={moveLeft}
							moveRight={moveRight}
							onFirstCardClick={handleFirstCardClick}
						/>
					</div>

					{/* 1.2.2 주요 통계 수치 표시 섹션 */}
					<StatisticsSection />

					{/* 1.2.3 서비스 주요 기능 아이콘 섹션 */}
					<ServiceIcons />
				</div>
			</div>
		</div>
	);
};

export default Home;
