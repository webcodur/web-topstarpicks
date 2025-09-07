import React from 'react';
import { Loader2 } from 'lucide-react';

const LoadingScreen = () => {
	return (
		<div className="fixed top-0 left-0 w-full h-screen flex flex-col items-center justify-center z-50 overflow-hidden">
			{/* Background */}
			<div className="absolute top-0 left-0 w-full h-full bg-black/85 z-0"></div>
			
			{/* Left Curtain */}
			<div className="absolute top-0 left-0 w-1/2 h-full bg-black z-10 animate-[curtain-left_1.5s_cubic-bezier(0.8,0,0.2,1)_forwards]"></div>
			
			{/* Right Curtain */}
			<div className="absolute top-0 right-0 w-1/2 h-full bg-black z-10 animate-[curtain-right_1.5s_cubic-bezier(0.8,0,0.2,1)_forwards]"></div>
			
			{/* Content */}
			<div className="flex flex-col items-center justify-center z-20 opacity-0 animate-[fade-in_0.5s_ease-out_1s_forwards]">
				<Loader2 
					size={70}
					className="animate-spin text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]"
				/>
				<p className="text-white mt-5 font-serif text-2xl shadow-[2px_2px_4px_rgba(0,0,0,0.5)]">
					데모 게임 생성중입니다...
				</p>
			</div>
		</div>
	);
};

export default LoadingScreen;
