import React from 'react';
import { Box, IconButton } from '@mui/material';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

// 1. 카드 스타일 상수
const CARD_STYLES = {
	BACKGROUND: 'linear-gradient(145deg, #42A5F5 0%, #64B5F6 100%)', // 카드 배경 그라데이션
	WIDTH: 200,      // 데스크톱 기준 카드 너비
	HEIGHT: 280,     // 데스크톱 기준 카드 높이
	SPACING: 30,     // 카드 간 수평 간격
	VERTICAL_OFFSET: 15, // 카드 간 수직 간격
	MOBILE: {
		SCALE: 0.8,        // 모바일에서 카드 크기 축소 비율
		ROTATION: 3,       // 모바일에서 카드 회전 각도
		Z_TRANSLATION: 15  // 모바일에서 Z축 이동 거리
	},
	DESKTOP: {
		ROTATION: 5,       // 데스크톱에서 카드 회전 각도
		Z_TRANSLATION: 20  // 데스크톱에서 Z축 이동 거리
	}
};

// 2. 카드 위치 계산 함수
const calculateCardPosition = (index, totalCards) => {
	// 중앙 카드의 인덱스 계산 (예: 7장일 경우 3)
	const centerIndex = Math.floor(totalCards / 2);
	// 현재 카드가 중앙으로부터 얼마나 떨어져 있는지 계산
	const distanceFromCenter = index - centerIndex;
	
	return {
		// X축 위치: 중앙으로부터의 거리 * 간격
		xPos: distanceFromCenter * CARD_STYLES.SPACING,
		// Y축 위치: 각 카드를 살짝 위로 올리면서 전체적으로 중앙 정렬
		yPos: index * CARD_STYLES.VERTICAL_OFFSET - 
			  ((totalCards - 1) * CARD_STYLES.VERTICAL_OFFSET) / 2
	};
};

// 3. 네비게이션 버튼 컴포넌트
const NavigationButton = ({ direction, onClick }) => (
	// 좌우 화살표 버튼 렌더링
	// direction prop에 따라 'left' 또는 'right' 위치에 배치
	<IconButton
		onClick={onClick}
		sx={{
			position: 'absolute',
			[direction]: '40px',
			color: '#42A5F5',
			zIndex: 2,
			'&:hover': {
				backgroundColor: 'rgba(66, 165, 245, 0.1)',
			},
		}}>
		{direction === 'left' ? 
			<ChevronLeftIcon fontSize="large" /> : 
			<ChevronRightIcon fontSize="large" />}
	</IconButton>
);

// 4. 개별 카드 컴포넌트
const CelebCard = ({ imageData, xPos, yPos, index }) => (
	<Box
		sx={{
			position: 'absolute',
			width: { 
				xs: `${CARD_STYLES.WIDTH * CARD_STYLES.MOBILE.SCALE}px`, 
					md: `${CARD_STYLES.WIDTH}px` 
			},
			height: { 
				xs: `${CARD_STYLES.HEIGHT * CARD_STYLES.MOBILE.SCALE}px`, 
					md: `${CARD_STYLES.HEIGHT}px` 
			},
			transform: {
				xs: `translate(-50%, -50%) rotateY(${index * CARD_STYLES.MOBILE.ROTATION}deg) translateZ(${index * CARD_STYLES.MOBILE.Z_TRANSLATION}px)`,
				md: `translate(-50%, -50%) rotateY(${index * CARD_STYLES.DESKTOP.ROTATION}deg) translateZ(${index * CARD_STYLES.DESKTOP.Z_TRANSLATION}px)`,
			},
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
				background: 'linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.3) 100%)',
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
);

// 5. 메인 갤러리 컴포넌트
const CelebGallery = ({ images, moveLeft, moveRight }) => (
	<Box
		sx={{
			display: 'flex',
			perspective: '1000px',
			height: { 
				xs: `${CARD_STYLES.HEIGHT * CARD_STYLES.MOBILE.SCALE}px`, 
				md: `${CARD_STYLES.HEIGHT + 70}px` 
			},
			position: 'relative',
			width: { xs: '100%', md: '60%' },
		}}>
		<Box
			sx={{
				position: 'absolute',
				inset: '50% auto auto 50%',
				transform: 'translate(-50%, -50%)',
				width: { xs: '100%', md: '600px' },
				height: { xs: '250px', md: '350px' },
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'center',
			}}>
			<NavigationButton direction="left" onClick={moveLeft} />
			
			<Box
				sx={{
					position: 'relative',
					width: '100%',
					height: '100%',
					display: 'flex',
					justifyContent: 'center',
					alignItems: 'center',
				}}>
				{images.map((imageData, index) => {
					const { xPos, yPos } = calculateCardPosition(index, images.length);
					
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
							whileHover={index === 0 ? {
								scale: 1.05,
								rotateY: 10,
								z: 50,
								zIndex: 10,
							} : {}}
							style={{
								position: 'relative',
								zIndex: images.length - index,
							}}>
							{index === 0 ? (
								<Link to={imageData.path} style={{ textDecoration: 'none' }}>
									<CelebCard
										imageData={imageData}
										xPos={xPos}
										yPos={yPos}
										index={index}
									/>
								</Link>
							) : (
								<CelebCard
									imageData={imageData}
									xPos={xPos}
									yPos={yPos}
									index={index}
								/>
							)}
						</motion.div>
					);
				})}
			</Box>
			
			<NavigationButton direction="right" onClick={moveRight} />
		</Box>
	</Box>
);

export default CelebGallery;
