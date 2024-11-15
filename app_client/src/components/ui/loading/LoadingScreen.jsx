import React, { useEffect, useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import {
	LoadingContainer,
	LoadingTextWrapper,
	LoadingText,
	Underline,
} from './Loading.styles';
import { backgroundImages, getLoadingMessage } from './loadingUtils';

/**
 * 로딩 화면을 표시하는 컴포넌트
 * @param {string} menuType - 현재 메뉴 타입 (기본값: '추천정보')
 * @param {boolean} isLoaded - 데이터가 로드되었는지 여부
 * @param {number} forceMinDuration - 최소 표시 시간 (기본값: 1000ms)
 * @returns {React.ReactElement} 로딩 화면 컴포넌트
 */
const LoadingScreen = ({
	menuType = '추천정보',
	isLoaded,
	forceMinDuration = 1000,
}) => {
	// 로딩 화면 표시 여부 상태
	const [shouldShow, setShouldShow] = useState(true);
	// 배경 이미지 상태
	const [bgImage, setBgImage] = useState(() => {
		const defaultType = backgroundImages[menuType] ? menuType : '추천정보';
		const isMobile = window.innerWidth <= 768;
		return backgroundImages[defaultType][isMobile ? 'mobile' : 'pc'];
	});

	/**
	 * 화면 크기 변경 시 배경 이미지 업데이트
	 */
	useEffect(() => {
		const handleResize = () => {
			const isMobile = window.innerWidth <= 768;
			const currentType = backgroundImages[menuType] ? menuType : '추천정보';
			const images = backgroundImages[currentType];
			setBgImage(isMobile ? images.mobile : images.pc);
		};
		handleResize();
		window.addEventListener('resize', handleResize);
		return () => window.removeEventListener('resize', handleResize);
	}, [menuType]);

	/**
	 * 데이터가 로드되었고, 최소 표시 시간이 지났을 때만 숨김
	 */
	useEffect(() => {
		const timer = setTimeout(() => {
			if (isLoaded) {
				setShouldShow(false);
			}
		}, forceMinDuration);

		return () => clearTimeout(timer);
	}, [isLoaded, forceMinDuration]);

	return (
		<AnimatePresence>
			{shouldShow && (
				<LoadingContainer
					style={{ backgroundImage: `url(${bgImage})` }}
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					exit={{ opacity: 0 }}
					transition={{ duration: 0.3 }}>
					<LoadingTextWrapper
						initial={{ y: 20, opacity: 0 }}
						animate={{ y: 0, opacity: 1 }}
						exit={{ y: -20, opacity: 0 }}
						transition={{ duration: 0.3 }}>
						<LoadingText>{getLoadingMessage(menuType)}</LoadingText>
						<Underline
							initial={{ scaleX: 0 }}
							animate={{ scaleX: 1 }}
							transition={{
								duration: 0.3,
								ease: 'easeOut',
							}}
						/>
					</LoadingTextWrapper>
				</LoadingContainer>
			)}
		</AnimatePresence>
	);
};

export default LoadingScreen;
