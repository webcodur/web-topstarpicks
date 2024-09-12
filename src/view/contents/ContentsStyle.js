import styled from '@emotion/styled';
import { Typography, Card, CardContent } from '@mui/material';
import FormatQuoteIcon from '@mui/icons-material/FormatQuote';

export const StyledCard = styled(Card)`
	margin-bottom: 100px;
`;

export const StyledCardContent = styled(CardContent)`
	display: flex;
	flex-direction: column;
	align-items: center;
`;

export const StyledTitle = styled(Typography)`
	margin-bottom: 24px;
`;

export const QuoteContainer = styled.div`
	background-color: ${(props) =>
		props.theme.palette.mode === 'dark'
			? props.theme.palette.grey[800]
			: props.theme.palette.grey[100]};
	padding: 20px;
	border-radius: 4px;
	margin-bottom: 20px;
	position: relative;
`;

export const QuoteText = styled(Typography)`
	color: ${(props) => props.theme.palette.text.secondary};
	padding-left: 32px;
	padding-right: 32px;
`;

export const QuoteIconStart = styled(FormatQuoteIcon)`
	position: absolute;
	top: -10px;
	left: 10px;
	color: ${(props) => props.theme.palette.primary.main};
	font-size: 40px;
`;

export const QuoteIconEnd = styled(FormatQuoteIcon)`
	position: absolute;
	bottom: -10px;
	right: 10px;
	color: ${(props) => props.theme.palette.primary.main};
	font-size: 40px;
	transform: rotate(180deg);
`;

export const StyledImage = styled.img`
	max-width: 300px;
	height: 400px;
	object-fit: cover;
`;

export const StyledBookImage = styled.img`
	max-width: 200px;
	height: 300px;
	object-fit: cover;
`;

export const ImageContainer = styled.div`
	margin-bottom: ${(props) => props.theme.spacing(2)};
`;
