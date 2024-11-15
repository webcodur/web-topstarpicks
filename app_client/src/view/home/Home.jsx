import React, { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import CelebGallery from './components/CelebGallery';
import HeaderSection from './components/HeaderSection';
import StatisticsSection from './components/StatisticsSection';
import ServiceIcons from './components/ServiceIcons';
import { GradientBackground } from './styles/BackgroundStyles';
import {
	MainContainer,
	ContentWrapper,
	GallerySection,
	ContentSection,
	CenterContainer,
} from './styles/LayoutStyles';
import { CELEB_IMAGES } from './constants';

const Home = () => {
	const [images, setImages] = useState(CELEB_IMAGES);
	const navigate = useNavigate();

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
		<ContentWrapper>
			<CenterContainer>
				{/* 1.1 상단 헤더 섹션: 타이틀과 서브타이틀 */}
				<HeaderSection />

				{/* 1.2 메인 콘텐츠 영역: 갤러리, 통계, 서비스 아이콘 */}
				<ContentSection>
					{/* 1.2.1 셀럽 이미지 갤러리 섹션 */}
					<GallerySection>
						<CelebGallery
							images={images}
							moveLeft={moveLeft}
							moveRight={moveRight}
							onFirstCardClick={handleFirstCardClick}
						/>
					</GallerySection>

					{/* 1.2.2 주요 통계 수치 표시 섹션 */}
					<StatisticsSection />

					{/* 1.2.3 서비스 주요 기능 아이콘 섹션 */}
					<ServiceIcons />
				</ContentSection>
			</CenterContainer>
		</ContentWrapper>
	);
};

export default Home;
