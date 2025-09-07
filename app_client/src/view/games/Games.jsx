import React from 'react';
import { useNavigate } from 'react-router-dom';
import { MainMenu } from './components/MainMenu';

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
		<MainMenu
			onStartGame={handleStartGame}
			onShowManual={handleShowManual}
			onShowSettings={handleShowSettings}
		/>
	);
};

export default Games;
