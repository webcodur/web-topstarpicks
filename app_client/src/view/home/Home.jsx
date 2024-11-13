import React, { useState, useRef, useEffect } from 'react';
import { Box, Container, Typography } from '@mui/material';
import { motion, animate } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';

import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import StyleIcon from '@mui/icons-material/Style';
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

// 스타일 컴포넌트 추가
const ServiceIconWrapper = styled(Box)(({ theme }) => ({
	position: 'relative',
	display: 'flex',
	flexDirection: 'column',
	alignItems: 'center',
	cursor: 'pointer',
	padding: '12px',
	borderRadius: '12px',
	transition: 'all 0.3s ease',
	background: 'rgba(255, 255, 255, 0.7)',
	backdropFilter: 'blur(8px)',
	border: '1px solid rgba(255, 255, 255, 0.3)',
	'&:hover': {
		background: 'rgba(255, 255, 255, 0.9)',
		transform: 'translateY(-3px)',
		boxShadow: '0 8px 20px rgba(0, 0, 0, 0.1)',
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
	background: 'rgba(33, 150, 243, 0.95)',
	padding: theme.spacing(0.5),
	borderRadius: theme.spacing(0.5),
	boxShadow: '0 4px 12px rgba(33, 150, 243, 0.2)',
	opacity: 0,
	transition: 'all 0.3s ease',
	width: '80px',
	textAlign: 'center',
	zIndex: 1000,
	backdropFilter: 'blur(8px)',
}));

const services = [
	{
		icon: <AutoStoriesIcon sx={{ fontSize: 45 }} />,
		title: '추천정보',
		path: '/people',
	},
	{
		icon: <AccountBoxIcon sx={{ fontSize: 45 }} />,
		title: '인물도감',
		path: '/people/history',
	},
	{
		icon: <AccountBalanceIcon sx={{ fontSize: 45 }} />,
		title: '전설도감',
		path: '/people/legend',
	},
	{
		icon: <TempleBuddhistIcon sx={{ fontSize: 45 }} />,
		title: '신화도감',
		path: '/people/myth',
	},
	{
		icon: <StyleIcon sx={{ fontSize: 45 }} />,
		title: '카드게임',
		path: '/games',
	},
];

// 제목을 위한 스타일 컴포넌트 추가
const GradientText = styled(Typography)(({ theme }) => ({
	background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
	WebkitBackgroundClip: 'text',
	WebkitTextFillColor: 'transparent',
	backgroundClip: 'text',
	textFillColor: 'transparent',
	position: 'relative',
}));

// 부제목을 위한 스타일 컴포넌트 추가
const SubtitleText = styled(Typography)(({ theme }) => ({
	color: '#1976d2',
	position: 'relative',
	textShadow: '0 1px 2px rgba(0,0,0,0.1)',
}));

// 배경 스타일 컴포넌트 추가
const GradientBackground = styled(Box)(({ theme }) => ({
	background: `linear-gradient(135deg, #e3e8ef 0%, #d1d8e6 100%)`,
	position: 'relative',
	minHeight: '100vh',
	width: '100%',
	zIndex: 0,
	'&::before': {
		content: '""',
		position: 'absolute',
		top: 0,
		left: 0,
		right: 0,
		bottom: 0,
		background: `
			radial-gradient(circle at 100% 0%, rgba(33, 150, 243, 0.08) 0%, transparent 25%),
			radial-gradient(circle at 0% 100%, rgba(33, 203, 243, 0.08) 0%, transparent 25%)
		`,
		opacity: 1,
		zIndex: -1,
	},
	'&::after': {
		content: '""',
		position: 'absolute',
		top: 0,
		left: 0,
		right: 0,
		bottom: 0,
		background: `
			repeating-linear-gradient(
				45deg,
				rgba(255, 255, 255, 0.1) 0px,
				rgba(255, 255, 255, 0.1) 1px,
				transparent 1px,
				transparent 3px
			)
		`,
		opacity: 0.5,
		zIndex: -1,
	},
}));

const Home = () => {
	const [images, setImages] = useState(CELEB_IMAGES);
	const [, setMenuInfo] = useAtom(menuInfoAtom);
	const navigate = useNavigate();

	// 각 통계 값에 대한 ref 추가
	const profileCountRef = useRef();
	const insightCountRef = useRef();
	const userCountRef = useRef();

	// 숫자 애니메이션을 위한 함수 수정
	const animateCount = (ref, target, format = 'default') => {
		const startValue = Math.floor(target * 0.9);

		animate(startValue, target, {
			duration: 1.5,
			onUpdate: (value) => {
				if (ref.current) {
					if (format === 'K') {
						ref.current.textContent =
							(Math.floor(value) / 1000).toFixed(1) + 'K+';
					} else {
						ref.current.textContent = Math.floor(value).toLocaleString() + '+';
					}
				}
			},
			ease: 'easeOut',
		});
	};

	useEffect(() => {
		animateCount(profileCountRef, 1000);
		animateCount(insightCountRef, 5000);
		animateCount(userCountRef, 10000, 'K'); // K 포맷 적용
	}, []);

	// 첫 번째 카드 클릭 핸들러 수정
	const handleFirstCardClick = () => {
		if (images[0] && images[0].path) {
			navigate(images[0].path);
		}
	};

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
		<GradientBackground>
			<Container
				maxWidth="lg"
				sx={{
					minHeight: '100vh',
					display: 'flex',
					flexDirection: 'column',
					position: 'relative',
					pt: { xs: 2, md: 4 },
					zIndex: 1,
					px: { xs: 2, md: 3 },
				}}>
				<Box
					sx={{
						display: 'flex',
						flexDirection: 'column',
						alignItems: 'center',
						width: '100%',
						maxWidth: '600px',
						mx: 'auto',
					}}>
					{/* 텍스트 섹션 */}
					<Box sx={{ textAlign: 'center', width: '100%', mb: 3 }}>
						<motion.div>
							<GradientText
								variant="h1"
								sx={{
									fontSize: { xs: '1.4rem', sm: '1.8rem', md: '2.2rem' },
									fontWeight: 'bold',
									mb: 2,
									fontFamily: "'Song Myung', serif",
								}}>
								<motion.span>Top Star Picks</motion.span>
							</GradientText>
							<motion.div>
								<SubtitleText
									variant="h4"
									sx={{
										fontSize: { xs: '0.8rem', sm: '0.9rem', md: '1.1rem' },
										mb: 1,
										fontFamily: "'Song Myung', serif",
									}}>
									<Box component="span">영감을 주는 셀럽들의 인사이트</Box>
								</SubtitleText>
							</motion.div>
						</motion.div>
					</Box>

					<Box
						sx={{
							display: 'flex',
							width: '100%',
							gap: { xs: 3, md: 4 },
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
								onFirstCardClick={handleFirstCardClick}
							/>
						</Box>

						{/* 통계 섹션 */}
						<Box
							sx={{
								display: 'flex',
								justifyContent: 'center',
								gap: { xs: 1.5, md: 2 },
								width: '100%',
								maxWidth: '340px',
								background: 'rgba(255, 255, 255, 0.7)',
								borderRadius: '12px',
								py: 1,
								px: { xs: 1, md: 1.5 },
								boxShadow: '0 4px 16px rgba(0, 0, 0, 0.08)',
							}}>
							{[
								{ ref: profileCountRef, label: '셀럽 프로필' },
								{ ref: insightCountRef, label: '인사이트' },
								{ ref: userCountRef, label: '월 사용자' },
							].map((stat, index) => (
								<motion.div
									key={index}
									initial={{ opacity: 0, y: 20 }}
									animate={{ opacity: 1, y: 0 }}
									transition={{ delay: index * 0.2 }}>
									<Box
										sx={{
											textAlign: 'center',
											color: '#1976d2',
											p: 1,
											borderRadius: '12px',
											transition: 'all 0.3s ease',
											'&:hover': {
												transform: 'translateY(-3px)',
											},
										}}>
										<Typography
											variant="h3"
											sx={{
												fontSize: { xs: '1rem', md: '1.4rem' },
												fontWeight: 'bold',
												mb: 0.5,
												background: 'linear-gradient(45deg, #1976d2, #42a5f5)',
												WebkitBackgroundClip: 'text',
												WebkitTextFillColor: 'transparent',
											}}
											ref={stat.ref}>
											0+
										</Typography>
										<Typography
											sx={{
												fontSize: { xs: '0.65rem', md: '0.75rem' },
												color: '#666',
												fontWeight: 500,
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
								gap: { xs: 0.5, md: 1 },
								flexWrap: 'wrap',
								width: '100%',
								maxWidth: '340px',
								mt: 2,
							}}>
							{services.map((service, index) => (
								<motion.div key={index}>
									<Link
										to={service.path}
										style={{ textDecoration: 'none' }}
										onClick={() => handleNavigate(service.path, service.title)}>
										<ServiceIconWrapper
											sx={{
												padding: '4px',
												minWidth: { xs: '45px', md: '50px' },
											}}>
											<Box
												sx={{
													color: '#1976d2',
													transition: 'all 0.3s ease',
													'&:hover': {
														transform: 'scale(1.1) rotate(5deg)',
													},
												}}>
												{React.cloneElement(service.icon, {
													sx: {
														fontSize: { xs: 20, md: 24 },
														filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.1))',
													},
												})}
											</Box>
											<ServiceInfo
												className="service-info"
												sx={{
													width: '80px',
												}}>
												<Typography
													variant="h6"
													sx={{
														fontSize: { xs: '0.65rem', md: '0.7rem' },
														fontWeight: 600,
														color: '#ffffff',
														fontFamily: "'Noto Sans KR', sans-serif",
														letterSpacing: '0.02em',
													}}>
													{service.title}
												</Typography>
											</ServiceInfo>
										</ServiceIconWrapper>
									</Link>
								</motion.div>
							))}
						</Box>
					</Box>
				</Box>
			</Container>
		</GradientBackground>
	);
};

export default Home;
