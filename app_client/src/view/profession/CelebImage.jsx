import React, { useState, useEffect, useCallback } from 'react';
import {
	ImageContainer,
	StyledImage,
	OverlayContainer,
	OverlayButton,
} from './ProfessionStyles';

const CelebImage = ({ imgLink, name, contentTypes, onContentTypeClick }) => {
	const [showOverlay, setShowOverlay] = useState(false);
	const [isMobile, setIsMobile] = useState(false);

	useEffect(() => {
		const checkMobile = () => {
			setIsMobile(window.innerWidth <= 768); // 768px을 모바일 기준으로 설정
		};

		checkMobile();
		window.addEventListener('resize', checkMobile);

		return () => window.removeEventListener('resize', checkMobile);
	}, []);

	const handleImageInteraction = useCallback(() => {
		if (isMobile) {
			setShowOverlay((prev) => !prev);
		}
	}, [isMobile]);

	const handleMouseEnter = useCallback(() => {
		if (!isMobile) {
			setShowOverlay(true);
		}
	}, [isMobile]);

	const handleMouseLeave = useCallback(() => {
		if (!isMobile) {
			setShowOverlay(false);
		}
	}, [isMobile]);

	return (
		<ImageContainer
			onMouseEnter={handleMouseEnter}
			onMouseLeave={handleMouseLeave}
			onClick={handleImageInteraction}>
			<StyledImage
				src={
					imgLink ||
					`https://via.placeholder.com/150?text=${encodeURIComponent(name)}`
				}
				alt={name}
			/>
			{showOverlay && (
				<OverlayContainer>
					{contentTypes.map((content) => (
						<OverlayButton
							key={content}
							onClick={(e) => {
								e.stopPropagation();
								onContentTypeClick(content);
							}}>
							{content}
						</OverlayButton>
					))}
				</OverlayContainer>
			)}
		</ImageContainer>
	);
};

export default CelebImage;
