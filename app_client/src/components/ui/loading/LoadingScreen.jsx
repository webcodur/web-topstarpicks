import React, { useEffect, useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { useAtom } from 'jotai';
import { profDataLoadedAtom } from 'store/atom';
import {
	LoadingContainer,
	LoadingTextWrapper,
	LoadingText,
	Underline,
} from './Loading.styles';
import { backgroundImages, getLoadingMessage } from './loadingUtils';

const LoadingScreen = ({ menuType = '추천정보' }) => {
	const [profDataLoaded] = useAtom(profDataLoadedAtom);
	const [bgImage, setBgImage] = useState(() => {
		const defaultType = backgroundImages[menuType] ? menuType : '추천정보';
		const isMobile = window.innerWidth <= 768;
		return backgroundImages[defaultType][isMobile ? 'mobile' : 'pc'];
	});
	const [shouldExit, setShouldExit] = useState(false);

	useEffect(() => {
		const handleResize = () => {
			const isMobile = window.innerWidth <= 768;
			const currentType = backgroundImages[menuType] ? menuType : '추천정보';
			const images = backgroundImages[currentType];
			setBgImage(isMobile ? images.mobile : images.pc);
		};
		handleResize();
		window.addEventListener('resize', handleResize);
		return () => window.removeEventListener('resize', handleResize);
	}, [menuType]);

	useEffect(() => {
		let timer;
		if (profDataLoaded) {
			timer = setTimeout(() => {
				setShouldExit(true);
			}, 2000);
		}
		return () => clearTimeout(timer);
	}, [profDataLoaded]);

	return (
		<AnimatePresence>
			{!shouldExit && (
				<LoadingContainer
					style={{ backgroundImage: `url(${bgImage})` }}
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					exit={{ opacity: 0 }}
					transition={{ duration: 1 }}>
					<LoadingTextWrapper
						initial={{ y: 20, opacity: 0 }}
						animate={{ y: 0, opacity: 1 }}
						exit={{ y: -20, opacity: 0 }}
						transition={{ duration: 1 }}>
						<LoadingText>{getLoadingMessage(menuType)}</LoadingText>
						<Underline
							initial={{ scaleX: 0 }}
							animate={{ scaleX: 1 }}
							transition={{
								duration: 0.8,
								ease: 'easeOut',
							}}
						/>
					</LoadingTextWrapper>
				</LoadingContainer>
			)}
		</AnimatePresence>
	);
};

export default LoadingScreen;
