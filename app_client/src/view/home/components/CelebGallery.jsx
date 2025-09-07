import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { RotateCcw } from 'lucide-react';

// 1. 카드 스타일 상수 - 모든 스타일 값을 한 곳에서 관리
const CARD_STYLES = {
	BACKGROUND: 'linear-gradient(145deg, #42A5F5 0%, #64B5F6 100%)', // 카드 배경 그라데이션
	WIDTH: 200, // 데스크톱 기준 카드 너비
	HEIGHT: 280, // 데스크톱 기준 카드 높이
	SPACING: 20, // 카드 간 수평 간격
	VERTICAL_OFFSET: 15, // 카드 간 수직 간격
	MOBILE: {
		SCALE: 0.8, // 모바일에서 카드 크기를 80%로 축소
		ROTATION: 3, // 모바일에서 각 카드의 Y축 회전 각도
		Z_TRANSLATION: 15, // 모바일에서 카드 간 Z축 거리
	},
	DESKTOP: {
		ROTATION: 5, // 데스크톱에서 각 카드의 Y축 회전 각도
		Z_TRANSLATION: 20, // 데스크톱에서 카드 간 Z축 거리
	},
};

// 2. 카드 위치 계산 함수
const calculateCardPosition = (index, totalCards) => {
	const centerIndex = Math.floor(totalCards / 2);
	const distanceFromCenter = index - centerIndex;

	return {
		xPos: distanceFromCenter * CARD_STYLES.SPACING,
		yPos:
			index * CARD_STYLES.VERTICAL_OFFSET -
			((totalCards - 1) * CARD_STYLES.VERTICAL_OFFSET) / 2,
	};
};

// 3. 네비게이션 버튼 컴포넌트
const NavigationButton = ({ direction, onClick }) => (
	<button
		onClick={onClick}
		className="absolute left-0 bottom-0 text-white z-10 bg-blue-400 hover:bg-blue-500 w-10 h-10 p-2 rounded-full transition-colors"
	>
		<RotateCcw size={24} />
	</button>
);

// 4. 개별 카드 컴포넌트
const CelebCard = React.memo(({ imageData, xPos, yPos, index, onClick }) => (
	<div
		onClick={index === 0 ? onClick : undefined}
		className={`
			absolute rounded-[20px] overflow-hidden shadow-[0_10px_30px_rgba(0,0,0,0.3)] transition-all duration-500 
			${index === 0 ? 'cursor-pointer' : 'cursor-default'}
			w-[160px] h-[224px] md:w-[200px] md:h-[280px]
			after:absolute after:inset-0 after:bg-gradient-to-b after:from-transparent after:to-black/30 after:z-10
		`}
		style={{
			background: CARD_STYLES.BACKGROUND,
			transform: `translate(-50%, -50%) rotateY(${
				index * (window.innerWidth >= 768 ? CARD_STYLES.DESKTOP.ROTATION : CARD_STYLES.MOBILE.ROTATION)
			}deg) translateZ(${
				index * (window.innerWidth >= 768 ? CARD_STYLES.DESKTOP.Z_TRANSLATION : CARD_STYLES.MOBILE.Z_TRANSLATION)
			}px)`,
			left: `calc(50% + ${xPos * (window.innerWidth >= 768 ? 1 : CARD_STYLES.MOBILE.SCALE)}px)`,
			top: `calc(50% + ${yPos * (window.innerWidth >= 768 ? 1 : CARD_STYLES.MOBILE.SCALE)}px)`,
		}}
	>
		<img
			src={imageData.imageUrl}
			alt={`Celebrity ${index + 1}`}
			className="w-full h-full object-cover relative z-0"
		/>
	</div>
));

// 5. 단순화된 갤러리 컴포넌트
const CelebGallery = React.memo(
	({ images, moveLeft, moveRight, onFirstCardClick }) => {
		const memoizedCardPositions = useMemo(
			() =>
				images.map((_, index) => calculateCardPosition(index, images.length)),
			[images.length]
		);

		return (
			<div className="relative flex items-center justify-center w-[240px] md:w-[300px] h-[296px] md:h-[370px] mx-auto rounded-[10px]"
				style={{ perspective: '1000px' }}
			>
				{/* 네비게이션 버튼들 */}
				<NavigationButton direction="left" onClick={moveRight} />

				{/* 카드들을 직접 렌더링 */}
				{images.map((imageData, index) => {
					const { xPos, yPos } = memoizedCardPositions[index];

					return (
						<motion.div
							key={imageData.imageUrl}
							initial={{ opacity: 0, rotateY: -30, z: -100 }}
							animate={{
								opacity: 1,
								rotateY: 0,
								z: 0,
								transition: { duration: 0.5 },
							}}
							whileHover={
								index === 0
									? {
											scale: 1.05,
											rotateY: 10,
											z: 50,
											zIndex: 10,
									  }
									: {}
							}
							style={{
								position: 'absolute',
								zIndex: images.length - index,
							}}>
							<CelebCard
								imageData={imageData}
								xPos={xPos}
								yPos={yPos}
								index={index}
								onClick={onFirstCardClick}
							/>
						</motion.div>
					);
				})}
			</div>
		);
	}
);

export default CelebGallery;
