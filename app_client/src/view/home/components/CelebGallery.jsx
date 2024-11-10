import React from 'react';
import { Box, IconButton } from '@mui/material';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

const CARD_BACKGROUND = 'linear-gradient(145deg, #42A5F5 0%, #64B5F6 100%)';

const CelebGallery = ({ images, moveLeft, moveRight }) => {
	return (
		<Box
			sx={{
				display: { xs: 'none', md: 'flex' },
				perspective: '1000px',
				height: '400px',
				position: 'relative',
				width: '66%',
			}}>
			<Box
				sx={{
					position: 'absolute',
					top: '50%',
					left: '50%',
					transform: 'translate(-50%, -50%)',
					width: '700px',
					height: '400px',
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'center',
				}}>
				<IconButton
					onClick={moveLeft}
					sx={{
						position: 'absolute',
						left: '40px',
						color: '#42A5F5',
						zIndex: 2,
						'&:hover': {
							backgroundColor: 'rgba(66, 165, 245, 0.1)',
						},
					}}>
					<ChevronLeftIcon fontSize="large" />
				</IconButton>

				{/* 카드 갤러리 로직 */}
				<Box
					sx={{
						position: 'relative',
						width: '600px',
						height: '100%',
						display: 'flex',
						justifyContent: 'center',
						alignItems: 'center',
					}}>
					{images.map((imageData, index) => {
						const totalCards = images.length;
						const cardWidth = 250;
						const cardHeight = 350;
						const cardSpacing = 30;
						const cardVerticalOffset = 15;

						const middleIndex = Math.floor(totalCards / 2);
						const distanceFromMiddle = index - middleIndex;
						const xPos = distanceFromMiddle * cardSpacing - cardWidth / 2;
						const yPos =
							-cardHeight / 2 +
							(index * cardVerticalOffset -
								((totalCards - 1) * cardVerticalOffset) / 2);

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
									position: 'relative',
									zIndex: images.length - index,
								}}>
								{index === 0 ? (
									<Link to={imageData.path} style={{ textDecoration: 'none' }}>
										<CelebCard
											imageData={imageData}
											cardWidth={cardWidth}
											cardHeight={cardHeight}
											xPos={xPos}
											yPos={yPos}
											index={index}
										/>
									</Link>
								) : (
									<CelebCard
										imageData={imageData}
										cardWidth={cardWidth}
										cardHeight={cardHeight}
										xPos={xPos}
										yPos={yPos}
										index={index}
									/>
								)}
							</motion.div>
						);
					})}
				</Box>

				<IconButton
					onClick={moveRight}
					sx={{
						position: 'absolute',
						right: '40px',
						color: '#42A5F5',
						zIndex: 2,
						'&:hover': {
							backgroundColor: 'rgba(66, 165, 245, 0.1)',
						},
					}}>
					<ChevronRightIcon fontSize="large" />
				</IconButton>
			</Box>
		</Box>
	);
};

const CelebCard = ({ imageData, cardWidth, cardHeight, xPos, yPos, index }) => (
	<Box
		sx={{
			position: 'absolute',
			width: `${cardWidth}px`,
			height: `${cardHeight}px`,
			left: `${xPos}px`,
			top: `${yPos}px`,
			borderRadius: '20px',
			overflow: 'hidden',
			boxShadow: '0 10px 30px rgba(0,0,0,0.3)',
			transform: `rotateY(${index * 5}deg) translateZ(${index * 20}px)`,
			transition: 'all 0.5s ease',
			background: CARD_BACKGROUND,
			cursor: index === 0 ? 'pointer' : 'default',
			'&::after': {
				content: '""',
				position: 'absolute',
				top: 0,
				left: 0,
				right: 0,
				bottom: 0,
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
);

export default CelebGallery;
