import React from 'react';

const HeaderSection = () => {
	return (
		<div className="flex flex-col items-center justify-center text-center">
			<h1 
				className="text-4xl sm:text-5xl font-bold text-yellow-400 shadow-[0_2px_4px_rgba(0,0,0,0.2)]"
				style={{ fontFamily: 'Song Myung' }}
			>
				TopStarPicks
			</h1>
			<p 
				className="text-yellow-300 mt-2 text-base sm:text-xl shadow-[0_1px_2px_rgba(0,0,0,0.2)]"
				style={{ fontFamily: 'Song Myung' }}
			>
				영감을 주는 셀럽들의 인사이트
			</p>
		</div>
	);
};

export default HeaderSection;
