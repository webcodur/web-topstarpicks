import styled from '@emotion/styled';
import { Link } from 'react-router-dom';

export const TableOfContents = styled.div`
	background-color: ${(props) => props.theme.palette.background.paper};
	padding: 20px;
	border-radius: 4px;
	margin-bottom: 30px;
	box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
	border-radius: 10px;
	transition: box-shadow 0.3s ease;

	&:hover {
		box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
	}
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
	transition: color 0.3s ease;

	&:hover {
		color: ${(props) => props.theme.palette.primary.main};
	}
`;

export const SourceLink = styled(Link)`
	color: ${(props) => props.theme.palette.warning.main};
	text-decoration: none;
	transition: color 0.3s ease;
	&:hover {
		color: ${(props) => props.theme.palette.warning.dark};
		text-decoration: underline;
	}
`;

export const TOCHeader = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	position: relative;
`;

export const TOCTitle = styled.h2`
	font-family: 'Song Myung', serif;
	margin: 0;
	text-align: center;
`;

export const TOCControls = styled.div`
	display: flex;
	align-items: center;
	position: absolute;
	right: 0;
`;
