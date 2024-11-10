import React, { useState } from 'react';
import { useTheme } from '@emotion/react';
import * as S from './styles/mainMenuStyles';
import { Typography } from '@mui/material';
import LoadingScreen from './LoadingScreen';

export const MainMenu = ({ onStartGame, onShowManual, onShowSettings }) => {
	const theme = useTheme();
	const [isLoading, setIsLoading] = useState(false);

	const handleStartGame = async () => {
		setIsLoading(true);
		// 잠시 대기 후 게임 시작
		setTimeout(() => {
			setIsLoading(false);
			onStartGame();
		}, 2000); // 2초 후 게임 시작
	};

	return (
		<S.MainMenuContainer>
			{isLoading && <LoadingScreen />}
			<S.BackgroundOverlay />

			<S.TitleSection>
				<div>
					<S.GameTitle variant="h2" component="h1">
						천하쟁패
					</S.GameTitle>
					{/* <S.SubTitle variant="h5" color="textSecondary">
						1:1 카드 전략 대전
					</S.SubTitle>					 */}
					<S.SubTitle variant="h5" color="textSecondary">
						게임은 현재 제작중에 있습니다
					</S.SubTitle>
				</div>
			</S.TitleSection>

			<S.MenuSection>
				<S.MenuButton onClick={handleStartGame}>게임 시작</S.MenuButton>
				<S.MenuButton onClick={onShowManual}>플레이 방법</S.MenuButton>
				<S.MenuButton onClick={onShowSettings}>게임 설정</S.MenuButton>
			</S.MenuSection>

			<S.VersionInfo>v1.0.0</S.VersionInfo>
		</S.MainMenuContainer>
	);
};
