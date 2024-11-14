import React, { useMemo } from 'react';
import { Box, IconButton } from '@mui/material';
import { motion } from 'framer-motion';
import RotateLeftIcon from '@mui/icons-material/RotateLeft';
import RotateRightIcon from '@mui/icons-material/RotateRight';
import LayersClearIcon from '@mui/icons-material/LayersClear';
import FlipToBackIcon from '@mui/icons-material/FlipToBack';
import SubdirectoryArrowLeftIcon from '@mui/icons-material/SubdirectoryArrowLeft';
import SubdirectoryArrowRightIcon from '@mui/icons-material/SubdirectoryArrowRight';
import CallMissedOutgoingIcon from '@mui/icons-material/CallMissedOutgoing';

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
	<IconButton
		onClick={onClick}
		sx={{
			position: 'absolute',
			left: '0px',
			bottom: '0px',
			color: 'white',
			zIndex: 10,
			backgroundColor: '#42A5F5',
			'&:hover': {
				backgroundColor: '#42A5F5',
			},
			width: '40px',
			height: '40px',
			padding: '8px',
			borderRadius: '50%',
		}}>
		<RotateLeftIcon fontSize="large" />
	</IconButton>
);

// 4. 개별 카드 컴포넌트
const CelebCard = React.memo(({ imageData, xPos, yPos, index, onClick }) => (
	<Box
		onClick={index === 0 ? onClick : undefined}
		sx={{
			position: 'absolute',
			// 반응형 너비: 모바일에서는 축소된 크기, 데스크톱에서는 원래 크기
			width: {
				xs: `${CARD_STYLES.WIDTH * CARD_STYLES.MOBILE.SCALE}px`,
				md: `${CARD_STYLES.WIDTH}px`,
			},
			height: {
				xs: `${CARD_STYLES.HEIGHT * CARD_STYLES.MOBILE.SCALE}px`,
				md: `${CARD_STYLES.HEIGHT}px`,
			},
			// 3D 변환: translate(-50%, -50%)로 중앙 정렬 후 회전과 Z축 이동
			transform: {
				xs: `translate(-50%, -50%) rotateY(${
					index * CARD_STYLES.MOBILE.ROTATION
				}deg) 
					 translateZ(${index * CARD_STYLES.MOBILE.Z_TRANSLATION}px)`,
				md: `translate(-50%, -50%) rotateY(${
					index * CARD_STYLES.DESKTOP.ROTATION
				}deg) 
					 translateZ(${index * CARD_STYLES.DESKTOP.Z_TRANSLATION}px)`,
			},
			// 카드 위치 계산: 50%는 컨테이너 중앙, xPos/yPos로 상대적 위치 조정
			left: {
				xs: `calc(50% + ${xPos * CARD_STYLES.MOBILE.SCALE}px)`,
				md: `calc(50% + ${xPos}px)`,
			},
			top: {
				xs: `calc(50% + ${yPos * CARD_STYLES.MOBILE.SCALE}px)`,
				md: `calc(50% + ${yPos}px)`,
			},
			borderRadius: '20px',
			overflow: 'hidden',
			boxShadow: '0 10px 30px rgba(0,0,0,0.3)',
			transition: 'all 0.5s ease',
			background: CARD_STYLES.BACKGROUND,
			cursor: index === 0 ? 'pointer' : 'default',
			'&::after': {
				content: '""',
				position: 'absolute',
				inset: 0,
				background:
					'linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.3) 100%)',
				zIndex: 1,
			},
		}}>
		<img
			src={imageData.imageUrl}
			alt={`Celebrity ${index + 1}`}
			style={{
				width: '100%',
				height: '100%',
				objectFit: 'cover',
				position: 'relative',
				zIndex: 0,
			}}
		/>
	</Box>
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
			<Box
				sx={{
					position: 'relative',
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'center',
					perspective: '1000px',
					width: {
						xs: '240px', // 모바일에서는 더 작은 너비
						md: '300px', // 데스크톱에서는 원래 크기
					},
					height: {
						xs: '296px', // 모바일에서는 더 작은 높이 (370px * 0.8)
						md: '370px', // 데스크톱에서는 원래 크기
					},
					margin: 'auto',
					borderRadius: '10px',
				}}>
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
			</Box>
		);
	}
);

export default CelebGallery;
