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
	border: 1px solid lightGray;
	border-radius: 10px;
	padding: 5px;
	margin-bottom: ${(props) => props.theme.spacing(2)};
`;

export const ErrorMessage = styled.p`
	color: red;
`;

export const AffiliateLink = styled(Link)`
	color: red;
`;

export const FloatingMenuButton = styled.div`
	position: fixed;
	bottom: 20px;
	right: 20px;
	z-index: 1000;
`;

export const FloatingMenuItem = styled.div`
	cursor: pointer;
	padding: 8px 0;
	&:hover {
		color: ${(props) => props.theme.palette.primary.main};
	}
`;

export const TableOfContents = styled.div`
	background-color: ${(props) => props.theme.palette.background.paper};
	padding: 20px;
	border-radius: 4px;
	margin-bottom: 30px;
	box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
	border-radius: 10px;
`;

export const TOCHeader = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	cursor: pointer;
`;

export const TOCTitle = styled.h2`
	margin: 0;
	flex-grow: 1;
	text-align: center;
`;

export const TOCContent = styled.div`
	max-height: ${(props) => (props.$isExpanded ? 'none' : '0')};
	overflow: hidden;
	transition: max-height 0.3s ease-in-out, opacity 0.3s ease-in-out;
	opacity: ${(props) => (props.$isExpanded ? '1' : '0')};
`;

export const TOCItem = styled.div`
	cursor: pointer;
	text-align: center;
	padding: 8px 0;
	&:hover {
		color: ${(props) => props.theme.palette.primary.main};
	}
`;

export const FloatingMenu = styled.div`
	position: fixed;
	top: 20px;
	right: 20px;
	max-height: calc(100vh - 40px);
	background-color: ${(props) => props.theme.palette.background.paper};
	padding: 20px;
	border-radius: 4px;
	box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
	z-index: 999;
	overflow-y: auto;

	.floating-menu-content {
		display: flex;
		flex-direction: column;
	}
`;

export const QuoteContainer = styled.div`
	max-width: 400px;
	border: 1px solid lightgray;
	border-radius: 10px;
	padding: 10px;
	margin-top: 10px;
	margin-bottom: 15px;
`;

export const SourceLink = styled(Link)`
	color: orange;
	text-decoration: none;

	&:hover {
		text-decoration: underline;
	}
`;

export const QuoteText = styled.span`
	margin-left: 5px;
`;
