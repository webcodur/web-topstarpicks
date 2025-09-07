import React, { useState } from 'react';
import { Button } from '../../../components/ui/button';
import LoadingScreen from './LoadingScreen';

export const MainMenu = ({ onStartGame, onShowManual, onShowSettings }) => {
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
		<div className="relative min-h-screen bg-gradient-to-br from-blue-600 via-purple-600 to-blue-800 flex flex-col items-center justify-center p-6">
			{isLoading && <LoadingScreen />}
			
			{/* Background overlay */}
			<div className="absolute inset-0 bg-black/20" />

			{/* Title Section */}
			<div className="relative z-10 text-center mb-12">
				<div className="space-y-4">
					<h1 className="text-4xl md:text-6xl font-bold text-white drop-shadow-lg">
						천하쟁패
					</h1>
					<p className="text-lg md:text-xl text-white/80">
						게임은 현재 제작중에 있습니다
					</p>
				</div>
			</div>

			{/* Menu Section */}
			<div className="relative z-10 space-y-4 w-full max-w-sm">
				<Button 
					onClick={handleStartGame}
					className="w-full py-3 text-lg font-semibold bg-blue-500 hover:bg-blue-600 text-white"
				>
					게임 시작
				</Button>
				<Button 
					onClick={onShowManual}
					variant="outline"
					className="w-full py-3 text-lg font-semibold border-white/30 text-white hover:bg-white/10"
				>
					플레이 방법
				</Button>
				<Button 
					onClick={onShowSettings}
					variant="outline"
					className="w-full py-3 text-lg font-semibold border-white/30 text-white hover:bg-white/10"
				>
					게임 설정
				</Button>
			</div>

			{/* Version Info */}
			<div className="relative z-10 absolute bottom-4 right-4 text-white/60 text-sm">
				v1.0.0
			</div>
		</div>
	);
};
