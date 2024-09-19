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
	margin-bottom: 40px;
`;

export const PersonInfoText = styled.p`
	margin: 5px 0;
	color: ${(props) => props.theme.palette.text.secondary};
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
	width: 400px;
	object-fit: cover;
	margin-bottom: 50px;
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

export const TableOfContents = styled.div`
	text-align: center;
	background-color: ${(props) => props.theme.palette.background.paper};
	padding: 20px;
	border-radius: 4px;
	margin-bottom: 30px;
	box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

export const TOCItem = styled.div`
	cursor: pointer;
	text-align: center;
	padding: 8px 0;
	&:hover {
		color: ${(props) => props.theme.palette.primary.main};
	}
`;

export const FloatingMenuButton = styled.div`
	position: fixed;
	bottom: 20px;
	right: 20px;
	z-index: 1000;
`;

export const FloatingMenu = styled.div`
	position: fixed;
	top: 50%;
	right: 20px;
	transform: translateY(-50%);
	background-color: ${(props) => props.theme.palette.background.paper};
	padding: 20px;
	border-radius: 4px;
	box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
	z-index: 999;
`;

export const FloatingMenuItem = styled.div`
	cursor: pointer;
	padding: 8px 0;
	&:hover {
		color: ${(props) => props.theme.palette.primary.main};
	}
`;
