import styled from '@emotion/styled';
import { Card, Accordion } from '@mui/material';

// Styled Header Component
export const StyledHeader = styled.div`
	position: relative;
	background: ${(props) => props.theme.palette.primary.dark};
	color: white;
	overflow: hidden;

	&::before {
		content: '';
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background: radial-gradient(
			circle at 50% 50%,
			rgba(255, 255, 255, 0.1) 1px,
			transparent 1px
		);
		background-size: 20px 20px;
		opacity: 0.3;
	}

	&::after {
		content: '';
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background: linear-gradient(
			to bottom,
			transparent,
			${(props) => props.theme.palette.primary.dark}
		);
	}
`;

// Header Content Component
export const HeaderContent = styled.div`
	position: relative;
	z-index: 1;
	padding: 80px 0;
	text-align: center;
`;

// Feature Card Component
export const FeatureCard = styled(Card)`
	height: 100%;
	transition: transform 0.3s ease, box-shadow 0.3s ease;
	background: ${(props) => props.theme.palette.background.paper};

	&:hover {
		transform: translateY(-5px);
		box-shadow: ${(props) => props.theme.shadows[10]};
	}
`;

// Styled Accordion Component
export const StyledAccordion = styled(Accordion)`
	background: ${(props) => props.theme.palette.background.paper};
	margin-bottom: 8px;
	border-radius: 8px !important;

	&::before {
		display: none;
	}

	&.Mui-expanded {
		margin: 8px 0;
	}
`;
