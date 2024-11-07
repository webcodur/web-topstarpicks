import React from 'react';
import { useTheme } from '@emotion/react';
import * as S from './styles/mainMenuStyles';

export const MainMenu = ({ onStartGame, onShowManual, onShowSettings }) => {
	const theme = useTheme();

	return (
		<S.MainMenuContainer>
			<S.BackgroundOverlay />

			<S.TitleSection>
				<S.GameTitle>천하삼국</S.GameTitle>
				<S.SubTitle>전략카드대전</S.SubTitle>
			</S.TitleSection>

			<S.MenuSection>
				<S.MenuButton onClick={onStartGame}>게임 시작</S.MenuButton>
				<S.MenuButton onClick={onShowManual}>플레이 방법</S.MenuButton>
				<S.MenuButton onClick={onShowSettings}>게임 설정</S.MenuButton>
			</S.MenuSection>

			<S.VersionInfo>v1.0.0</S.VersionInfo>
		</S.MainMenuContainer>
	);
};
