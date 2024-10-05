import React, { useState, useEffect, useCallback } from 'react';
import {
	ImageContainer,
	StyledImage,
	OverlayContainer,
	OverlayButton,
	RankBorder,
	RankScore,
} from './celebImageStyle';

const CelebImage = ({
	imgLink,
	name,
	rank,
	contentNames,
	oncontentNameClick,
}) => {
	const [showOverlay, setShowOverlay] = useState(false);
	const [isMobile, setIsMobile] = useState(false);
	const [mousePosition, setMousePosition] = useState({ x: 0.5, y: 0.5 });

	useEffect(() => {
		const checkMobile = () => {
			setIsMobile(window.innerWidth <= 768);
		};

		checkMobile();
		window.addEventListener('resize', checkMobile);

		return () => window.removeEventListener('resize', checkMobile);
	}, []);

	const handleMouseMove = useCallback((e) => {
		const rect = e.currentTarget.getBoundingClientRect();
		const x = (e.clientX - rect.left) / rect.width;
		const y = (e.clientY - rect.top) / rect.height;
		setMousePosition({ x, y });
	}, []);

	const handleMouseEnter = useCallback(() => {
		if (!isMobile) {
			setShowOverlay(true);
		}
	}, [isMobile]);

	const handleMouseLeave = useCallback(() => {
		if (!isMobile) {
			setShowOverlay(false);
			setMousePosition({ x: 0.5, y: 0.5 });
		}
	}, [isMobile]);

	const handleImageInteraction = useCallback(() => {
		if (isMobile) {
			setShowOverlay((prev) => !prev);
		}
	}, [isMobile]);

	const transform = `perspective(1000px) rotateX(${
		(mousePosition.y - 0.5) * 10
	}deg) rotateY(${(mousePosition.x - 0.5) * 10}deg)`;

	return (
		<RankBorder
			rank={rank}
			onMouseMove={handleMouseMove}
			onMouseEnter={handleMouseEnter}
			onMouseLeave={handleMouseLeave}
			style={{ transform }}
			mousePosition={mousePosition}>
			<ImageContainer onClick={handleImageInteraction}>
				{rank && <RankScore>{rank}</RankScore>}
				<StyledImage
					src={
						imgLink ||
						`https://via.placeholder.com/150?text=${encodeURIComponent(name)}`
					}
					alt={name}
				/>
				{showOverlay && (
					<OverlayContainer>
						{contentNames.map((content) => (
							<OverlayButton
								key={content}
								onClick={(e) => {
									e.stopPropagation();
									oncontentNameClick(content);
								}}>
								{content}
							</OverlayButton>
						))}
					</OverlayContainer>
				)}
			</ImageContainer>
		</RankBorder>
	);
};

export default CelebImage;
