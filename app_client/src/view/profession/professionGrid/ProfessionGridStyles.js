import styled from '@emotion/styled';
import { Typography } from '@mui/material';

export const StencilTypography = styled(Typography)`
	text-align: center;
	font-family: fantasy;
	font-weight: bold;
	color: black;
	text-shadow: -1px -1px 0 #fff, 1px -1px 0 #fff, -1px 1px 0 #fff,
		1px 1px 0 #fff;
	letter-spacing: 2px;
	text-transform: uppercase;
	font-size: 1.5rem;

	@media (min-width: 600px) {
		font-size: 2rem;
	}

	@media (min-width: 960px) {
		font-size: 2.5rem;
	}
`;
