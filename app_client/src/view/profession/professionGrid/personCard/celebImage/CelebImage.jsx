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

	useEffect(() => {
		const checkMobile = () => {
			setIsMobile(window.innerWidth <= 768);
		};

		checkMobile();
		window.addEventListener('resize', checkMobile);

		return () => window.removeEventListener('resize', checkMobile);
	}, []);

	const handleMouseEnter = useCallback(() => {
		if (!isMobile && vidLink) {
			setIsHovering(true);
			if (videoRef.current) {
				videoRef.current.play();
			}
		}
	}, [isMobile, vidLink]);

	const handleMouseLeave = useCallback(() => {
		if (!isMobile && vidLink) {
			setIsHovering(false);
			if (videoRef.current) {
				videoRef.current.pause();
				videoRef.current.currentTime = 0;
			}
		}
	}, [isMobile, vidLink]);

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
						playsInline
						style={{ opacity: isHovering ? 1 : 0 }}
					/>
				)}
			</ImageContainer>
		</RankBorder>
	);
};

export default CelebImage;
