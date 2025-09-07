import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { backgroundImages, getLoadingMessage } from './loadingUtils';

/**
 * 로딩 화면을 표시하는 컴포넌트 (Tailwind CSS 버전)
 * @param {string} menuType - 현재 메뉴 타입 (기본값: '추천정보')
 * @param {boolean} isLoaded - 데이터가 로드되었는지 여부
 * @param {number} forceMinDuration - 최소 표시 시간 (기본값: 1000ms)
 * @returns {React.ReactElement} 로딩 화면 컴포넌트
 */
const LoadingScreenTailwind = ({
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
		let timer;
		if (isLoaded) {
			timer = setTimeout(() => {
				setShouldShow(false);
			}, forceMinDuration);
		}
		return () => clearTimeout(timer);
	}, [isLoaded, forceMinDuration]);

	// 로딩 메시지 가져오기
	const message = getLoadingMessage(menuType);

	return (
		<AnimatePresence>
			{shouldShow && (
				<motion.div
					className="w-screen h-screen fixed top-0 left-0 flex justify-center items-center bg-cover bg-center bg-no-repeat"
					style={{ backgroundImage: `url(${bgImage})` }}
					initial={{ opacity: 1 }}
					exit={{ opacity: 0 }}
					transition={{ duration: 0.3 }}
				>
					<motion.div
						className="relative inline-block"
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ delay: 0.2, duration: 0.5 }}
					>
						<motion.div
							className="text-white text-4xl md:text-5xl font-serif bg-black bg-opacity-30 px-8 py-4 rounded-lg"
							style={{
								fontFamily: "'Song Myung', serif",
								textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)',
							}}
						>
							{message}
						</motion.div>
						<motion.div
							className="absolute bottom-3 left-8 right-8 h-1 bg-white rounded-full md:bottom-3 md:left-8 md:right-8"
							initial={{ scaleX: 0 }}
							animate={{ scaleX: 1 }}
							transition={{ delay: 0.5, duration: 0.5 }}
							style={{ transformOrigin: 'left' }}
						/>
					</motion.div>
				</motion.div>
			)}
		</AnimatePresence>
	);
};

export default LoadingScreenTailwind;