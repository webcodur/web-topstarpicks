// CelebImage.jsx
import React, { useState, useEffect, useCallback, useRef } from 'react';
import {
	ImageContainer,
	StyledImage,
	StyledVideo,
	RankBorder,
	RankScore,
} from './celebImageStyle';

const CelebImage = ({ imgLink, vidLink, name, rank }) => {
	const [isMobile, setIsMobile] = useState(false);
	const [isHovering, setIsHovering] = useState(false);
	const videoRef = useRef(null);

	// 모바일 기기 감지 및 윈도우 리사이즈 이벤트 처리
	useEffect(() => {
		const checkMobile = () => {
			setIsMobile(window.innerWidth <= 768);
		};
		checkMobile();
		window.addEventListener('resize', checkMobile);
		return () => window.removeEventListener('resize', checkMobile);
	}, []);

	// PC에서 호버 시 비디오 재생 처리
	const handleMouseEnter = useCallback(() => {
		if (!isMobile && vidLink) {
			setIsHovering(true);
			if (videoRef.current) {
				videoRef.current.play();
			}
		}
	}, [isMobile, vidLink]);

	// 호버 종료 시 비디오 초기화
	const handleMouseLeave = useCallback(() => {
		if (!isMobile && vidLink) {
			setIsHovering(false);
			if (videoRef.current) {
				videoRef.current.pause();
				videoRef.current.currentTime = 0; // 비디오 시작 지점으로 리셋
			}
		}
	}, [isMobile, vidLink]);

	// 모바일에서 탭 시 비디오 토글 처리
	const handleClick = useCallback(() => {
		if (isMobile && vidLink) {
			setIsHovering((prev) => !prev);
			if (videoRef.current) {
				if (videoRef.current.paused) {
					videoRef.current.play();
				} else {
					videoRef.current.pause();
				}
			}
		}
	}, [isMobile, vidLink]);

	return (
		<RankBorder rank={rank}>
			<ImageContainer
				onMouseEnter={handleMouseEnter}
				onMouseLeave={handleMouseLeave}
				onClick={handleClick}>
				{rank && <RankScore>{rank}</RankScore>}
				<StyledImage
					src={imgLink}
					alt={name}
					style={{ opacity: isHovering && vidLink ? 0 : 1 }}
				/>
				{vidLink && (
					<StyledVideo
						ref={videoRef}
						src={vidLink}
						loop
						muted
						playsInline // iOS에서 인라인 재생 허용
						style={{ opacity: isHovering ? 1 : 0 }}
					/>
				)}
			</ImageContainer>
		</RankBorder>
	);
};

export default CelebImage;
