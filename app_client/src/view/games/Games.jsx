import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ThemeProvider } from '@emotion/react';
import { createTheme } from '@mui/material/styles';
import { MainMenu } from './components/MainMenu';

const theme = createTheme({
	palette: {
		primary: { main: '#2196f3', dark: '#1976d2' },
		error: { main: '#f44336', dark: '#d32f2f' },
		warning: { main: '#ff9800', dark: '#f57c00' },
		info: { main: '#03a9f4', dark: '#0288d1' },
		success: { main: '#4caf50', dark: '#388e3c' },
	},
});

const Games = () => {
	const navigate = useNavigate();

	const handleStartGame = () => {
		navigate('/games/play');
	};

	const handleShowManual = () => {
		navigate('/games/manual');
	};

	const handleShowSettings = () => {
		navigate('/games/settings');
	};

	return (
		<ThemeProvider theme={theme}>
			<MainMenu
				onStartGame={handleStartGame}
				onShowManual={handleShowManual}
				onShowSettings={handleShowSettings}
			/>
		</ThemeProvider>
	);
};

export default Games;
