import React, { useState } from 'react';
import { Box, Container, Typography, IconButton } from '@mui/material';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import TempleBuddhistIcon from '@mui/icons-material/TempleBuddhist';
import { styled } from '@mui/material/styles';

import CelebGallery from './components/CelebGallery';
import { useAtom } from 'jotai';
import { menuInfoAtom } from 'store/atom';

// 셀럽 이미지 URL 배열 수정
const CELEB_IMAGES = [
	{
		imageUrl: 'https://ik.imagekit.io/wnivma72t/closeup/1.png',
		path: '/일론-머스크/책',
	},
	{
		imageUrl: 'https://ik.imagekit.io/wnivma72t/closeup/2.png',
		path: '/도널드-트럼프/책',
	},
	{
		imageUrl: 'https://ik.imagekit.io/wnivma72t/closeup/3.png',
		path: '/알베르트-아인슈타인/책',
	},
	{
		imageUrl: 'https://ik.imagekit.io/wnivma72t/closeup/4.png',
		path: '/빌-게이츠/책',
	},
	{
		imageUrl: 'https://ik.imagekit.io/wnivma72t/closeup/5.png',
		path: '/마고-로비/책',
	},
	{
		imageUrl: 'https://ik.imagekit.io/wnivma72t/closeup/6.png',
		path: '/워렌-버핏/책',
	},
];

// 카드 배경색 변수 추가 (파일 상단)

// 스타일 컴포넌트 추가
const ServiceIconWrapper = styled(Box)(({ theme }) => ({
	position: 'relative',
	display: 'flex',
	flexDirection: 'column',
	alignItems: 'center',
	cursor: 'pointer',
	padding: '10px 15px',
	borderRadius: '12px',
	transition: 'all 0.3s ease',
	'&:hover': {
		backgroundColor: 'rgba(66, 165, 245, 0.08)',
	},
	'&:hover .service-info': {
		opacity: 1,
		transform: 'translateY(0)',
	},
}));

const ServiceInfo = styled(Box)(({ theme }) => ({
	position: 'absolute',
	top: '100%',
	left: '50%',
	transform: 'translateX(-50%) translateY(10px)',
	backgroundColor: 'rgba(255, 255, 255, 0.98)',
	padding: theme.spacing(1.5),
	borderRadius: theme.spacing(1),
	boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
	opacity: 0,
	transition: 'all 0.3s ease',
	width: '180px',
	textAlign: 'center',
	zIndex: 10,
}));

const services = [
	{
		icon: <AutoStoriesIcon sx={{ fontSize: 45 }} />,
		title: '추천정보',
		description: '영향력 있는 인물들의 책과 영화 추천',
		path: '/people',
	},
	{
		icon: <SportsEsportsIcon sx={{ fontSize: 45 }} />,
		title: '카드게임',
		description: '인물 카드로 즐기는 재미있는 게임',
		path: '/games',
	},
	{
		icon: <AccountBoxIcon sx={{ fontSize: 45 }} />,
		title: '인물도감',
		description: '역사 속 인물들의 프로필과 이야기',
		path: '/people/history',
	},
	{
		icon: <AccountBalanceIcon sx={{ fontSize: 45 }} />,
		title: '전설도감',
		description: '이야기 속 인물들의 프로필과 이야기',
		path: '/people/legend',
	},
	{
		icon: <TempleBuddhistIcon sx={{ fontSize: 45 }} />,
		title: '신화도감',
		description: '이야기 속 신들의 프로필과 이야기',
		path: '/people/myth',
	},
];

const Home = () => {
	const [images, setImages] = useState(CELEB_IMAGES);
	const [, setMenuInfo] = useAtom(menuInfoAtom);

	// 우측으로 이동하는 함수
	const moveRight = () => {
		setImages((prev) => {
			const newImages = [...prev];
			const first = newImages.shift();
			newImages.push(first);
			return newImages;
		});
	};

	// 좌측으로 이동하는 함수
	const moveLeft = () => {
		setImages((prev) => {
			const newImages = [...prev];
			const last = newImages.pop();
			newImages.unshift(last);
			return newImages;
		});
	};

	// handleNavigate 함수 추가
	const handleNavigate = (path, title) => {
		setMenuInfo(title);
	};

	return (
		<Box
			sx={{
				width: '100%',
				height: '100%',
				position: 'relative',
				background: '#ffffff',
			}}>
			{/* 메인 컨텐츠 */}
			<Container
				maxWidth="xl"
				sx={{
					height: '100%',
					display: 'flex',
					flexDirection: 'column',
					position: 'relative',
					pt: { xs: 4, md: 6 },
				}}>
				<Box
					sx={{
						display: 'flex',
						flexDirection: 'column',
						gap: { xs: 2, md: 3 },
						alignItems: 'center',
					}}>
					{/* 텍스트 섹션 */}
					<Box
						sx={{
							textAlign: 'center',
							width: '100%',
						}}>
						<motion.div
							initial={{ opacity: 0, y: 30 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.8 }}>
							<Typography
								variant="h1"
								sx={{
									color: '#000',
									fontSize: { xs: '1.5rem', sm: '2rem', md: '2.8rem' },
									fontWeight: 'bold',
									mb: 1,
									fontFamily: "'Noto Sans KR', sans-serif",
									letterSpacing: '-0.5px',
								}}>
								Top Star Picks
							</Typography>
							<Typography
								variant="h4"
								sx={{
									color: 'rgba(0, 0, 0, 0.9)',
									fontSize: { xs: '0.9rem', sm: '1rem', md: '1.3rem' },
									mb: 2,
									fontFamily: "'Song Myung', serif",
								}}>
								<Box
									component="span"
									sx={{ display: { xs: 'block', md: 'inline' } }}>
									영감을 주는 셀럽들의{' '}
								</Box>
								<Box
									component="span"
									sx={{ display: { xs: 'block', md: 'inline' } }}>
									인사이트
								</Box>
							</Typography>
						</motion.div>
					</Box>

					{/* CelebGallery 컴포넌트와 우측 섹션 */}
					<Box
						sx={{
							display: 'flex',
							width: '100%',
							mt: 2,
							gap: { xs: 4, md: 6 },
							flexDirection: 'column',
							alignItems: 'center',
						}}>
						{/* CelebGallery 컴포넌트 */}
						<Box
							sx={{
								width: '100%',
								display: 'flex',
								justifyContent: 'center',
							}}>
							<CelebGallery
								images={images}
								moveLeft={moveLeft}
								moveRight={moveRight}
							/>
						</Box>

						{/* 통계와 서비스 아이콘 섹션 */}
						<Box
							sx={{
								display: 'flex',
								flexDirection: 'column',
								gap: 4,
								width: '100%',
								maxWidth: '1200px',
							}}>
							{/* 통계 섹션 */}
							<Box
								sx={{
									display: 'flex',
									justifyContent: 'center',
									gap: { xs: 3, md: 6 },
									width: '100%',
								}}>
								{[
									{ number: '1000+', label: '셀럽 프로필' },
									{ number: '5000+', label: '인사이트' },
									{ number: '10K+', label: '월간 사용자' },
								].map((stat, index) => (
									<motion.div
										key={index}
										initial={{ opacity: 0, y: 20 }}
										animate={{ opacity: 1, y: 0 }}
										transition={{ delay: index * 0.2 }}>
										<Box
											sx={{
												textAlign: 'center',
												color: '#000',
											}}>
											<Typography
												variant="h3"
												sx={{
													fontSize: { xs: '1.4rem', md: '2rem' },
													fontWeight: 'bold',
													mb: 1,
												}}>
												{stat.number}
											</Typography>
											<Typography
												sx={{
													fontSize: { xs: '0.8rem', md: '0.9rem' },
													opacity: 0.8,
												}}>
												{stat.label}
											</Typography>
										</Box>
									</motion.div>
								))}
							</Box>

							{/* 서비스 아이콘 섹션 */}
							<Box
								sx={{
									display: 'flex',
									justifyContent: 'center',
									gap: { xs: 2, md: 4 },
									flexWrap: 'wrap',
									width: '100%',
								}}>
								{services.map((service, index) => (
									<motion.div
										key={index}
										initial={{ opacity: 0, y: 20 }}
										animate={{ opacity: 1, y: 0 }}
										transition={{ delay: index * 0.1 }}>
										<Link
											to={service.path}
											style={{ textDecoration: 'none' }}
											onClick={() =>
												handleNavigate(service.path, service.title)
											}>
											<ServiceIconWrapper>
												<Box
													sx={{
														color: '#000000',
														transition: 'transform 0.3s ease',
														'&:hover': {
															transform: 'scale(1.1)',
														},
													}}>
													{React.cloneElement(service.icon, {
														sx: { fontSize: 28 },
													})}
												</Box>
												<ServiceInfo className="service-info">
													<Typography
														variant="h6"
														sx={{ color: '#000000' }}
														gutterBottom>
														{service.title}
													</Typography>
													<Typography variant="body2" color="text.secondary">
														{service.description}
													</Typography>
												</ServiceInfo>
											</ServiceIconWrapper>
										</Link>
									</motion.div>
								))}
							</Box>
						</Box>
					</Box>
				</Box>
			</Container>
		</Box>
	);
};

export default Home;
