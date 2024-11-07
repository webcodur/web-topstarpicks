import styled from '@emotion/styled';

export const GamePlayContainer = styled.div`
	width: 100%;
	min-height: 100vh;
	background: #1a1a1a;
	position: relative;
`;

export const Header = styled.div`
	position: absolute;
	top: 20px;
	left: 20px;
	z-index: 100;
`;

export const BackButton = styled.button`
	padding: 8px 16px;
	background: rgba(255, 255, 255, 0.1);
	color: white;
	border: 1px solid rgba(255, 255, 255, 0.3);
	border-radius: 4px;
	cursor: pointer;
	font-size: 0.9rem;
	transition: all 0.2s;

	&:hover {
		background: rgba(255, 255, 255, 0.2);
		border-color: rgba(255, 255, 255, 0.5);
	}
`;
