import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ThemeProvider } from '@emotion/react';
import { createTheme } from '@mui/material/styles';
import GameUI from '../components/GameUI';
import * as S from './styles/gamePlayStyles';

const theme = createTheme({
	palette: {
		primary: { main: '#2196f3', dark: '#1976d2' },
		error: { main: '#f44336', dark: '#d32f2f' },
		warning: { main: '#ff9800', dark: '#f57c00' },
		info: { main: '#03a9f4', dark: '#0288d1' },
		success: { main: '#4caf50', dark: '#388e3c' },
	},
});

const GamePlay = () => {
	const navigate = useNavigate();

	return (
		<ThemeProvider theme={theme}>
			<S.GamePlayContainer>
				<S.Header>
					<S.BackButton onClick={() => navigate('/games')}>
						게임 종료
					</S.BackButton>
				</S.Header>
				<GameUI />
			</S.GamePlayContainer>
		</ThemeProvider>
	);
};

export default GamePlay;
