import React from 'react';

const Title = ({ menu }) => (
	<>
		<h1 className="mt-8 mb-8 font-bold text-center font-serif break-keep text-2xl sm:text-4xl md:text-5xl">
			{menu === '추천정보' && '유명인사 추천정보'}
			{menu.includes('도감') && menu}
		</h1>

		<h3 className="mt-8 mb-8 font-bold text-center font-serif break-keep leading-relaxed text-base sm:text-lg md:text-xl">
			{menu === '추천정보' && (
				<>
					인물별 컨텐츠
					<br />
					추천정보를 확인하세요!
				</>
			)}
			{menu.includes('도감') && (
				<>
					인물별 능력치를 확인하고
					<br />
					카드 게임에 활용하세요!
				</>
			)}
		</h3>
	</>
);

export default Title;
