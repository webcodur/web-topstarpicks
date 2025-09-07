// CelebImage.jsx
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { getRankBorderStyle } from './celebImageStyle';

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

	const rankBorderClass = getRankBorderStyle(rank);

	return (
		<div className={`relative p-4 rounded-lg ${rankBorderClass}`}>
			<div
				className="relative w-full pt-[180%] overflow-hidden rounded-md cursor-pointer"
				onMouseEnter={handleMouseEnter}
				onMouseLeave={handleMouseLeave}
				onClick={handleClick}>
				{rank && (
					<div 
						className="absolute top-1 left-1 bg-black/70 text-white px-2 py-1 rounded-md z-10 font-['Permanent_Marker'] text-xl transform -rotate-3"
						style={{ textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)' }}
					>
						{rank}
					</div>
				)}
				<img
					src={imgLink}
					alt={name}
					className={`absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-300 ${
						isHovering && vidLink ? 'opacity-0' : 'opacity-100'
					}`}
				/>
				{vidLink && (
					<video
						ref={videoRef}
						src={vidLink}
						loop
						muted
						playsInline
						className={`absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-300 ${
							isHovering ? 'opacity-100' : 'opacity-0'
						}`}
					/>
				)}
			</div>
		</div>
	);
};

export default CelebImage;
