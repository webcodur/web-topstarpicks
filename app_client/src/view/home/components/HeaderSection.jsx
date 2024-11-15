import React from 'react';
import { Typography,  } from '@mui/material';
import { HeaderContainer } from '../styles/HeaderSectionStyles';

const HeaderSection = () => {
	return (
		<HeaderContainer>
			<Typography
				variant="h4"
				component="h1"
				fontFamily="Song Myung"
				sx={{
					color: '#FFD700',
					fontWeight: 700,
					textShadow: '0px 2px 4px rgba(0, 0, 0, 0.2)',
					fontSize: { xs: '2rem', sm: '2.5rem' },
				}}>
				TopStarPicks
			</Typography>
			<Typography
				variant="subtitle1"
				fontFamily="Song Myung"
				sx={{
					color: '#FFE55C',
					marginTop: '0.5rem',
					textShadow: '0 1px 2px rgba(0,0,0,0.2)',
					fontSize: { xs: '1rem', sm: '1.25rem' },
				}}>
				영감을 주는 셀럽들의 인사이트
			</Typography>
		</HeaderContainer>
	);
};

export default HeaderSection;
