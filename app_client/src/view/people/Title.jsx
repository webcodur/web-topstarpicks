import React from 'react';
import { PageTitle } from './People.styles';

const Title = ({ menu }) => (
	<>
		<PageTitle
			variant="h3"
			component="h1"
			align="center"
			sx={{
				fontSize: {
					xs: '1.8rem',
					sm: '2.2rem',
					md: '2.5rem',
				},
			}}>
			{menu === '추천정보' && '유명인사 추천정보'}
			{menu.includes('도감') && menu}
		</PageTitle>

		<PageTitle
			variant="h5"
			component="h3"
			align="center"
			sx={{
				fontSize: {
					xs: '1rem',
					sm: '1.2rem',
					md: '1.4rem',
				},
				lineHeight: 1.6,
			}}>
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
		</PageTitle>
	</>
);

export default Title;
