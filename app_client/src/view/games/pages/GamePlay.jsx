import React from 'react';
import { useNavigate } from 'react-router-dom';
import GameUI from '../components/GameUI';
import { Button } from '../../../components/ui/button';

const GamePlay = () => {
	const navigate = useNavigate();

	return (
		<div className="w-full min-h-screen bg-gray-900 relative">
			<div className="absolute top-5 left-5 z-[100]">
				<Button
					onClick={() => navigate('/games')}
					variant="outline"
					className="bg-white/10 text-white border-white/30 hover:bg-white/20 hover:border-white/50"
				>
					게임 종료
				</Button>
			</div>
			<GameUI />
		</div>
	);
};

export default GamePlay;
