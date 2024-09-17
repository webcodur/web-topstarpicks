import styled from '@emotion/styled';
import { Card, CardContent } from '@mui/material';
import { Link } from 'react-router-dom';

export const PageContainer = styled.div`
	max-width: 800px;
	margin: 0 auto;
	padding: 2rem 0;
`;

export const PersonInfoContainer = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	margin-bottom: 100px;
`;

export const PersonName = styled.h1`
	text-align: center;
`;

export const StyledCard = styled(Card)`
	margin-bottom: 100px;
`;

export const StyledCardContent = styled(CardContent)`
	display: flex;
	flex-direction: column;
	align-items: center;
`;

export const StyledTitle = styled.h2`
	margin-bottom: 24px;
	text-align: center;
`;

export const QuoteContainer = styled.div`
	background-color: ${(props) =>
		props.theme.palette.mode === 'dark'
			? props.theme.palette.grey[800]
			: props.theme.palette.grey[100]};
	padding: 20px;
	border-radius: 4px;
	margin-bottom: 20px;
`;

export const QuoteText = styled.p`
	color: ${(props) => props.theme.palette.text.secondary};
	font-style: italic;
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

export const ErrorMessage = styled.p`
	color: red;
`;

export const AffiliateLink = styled(Link)`
	color: red;
`;
