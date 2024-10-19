import styled from '@emotion/styled';

export const FloatingMenuButton = styled.div`
	position: fixed;
	bottom: 20px;
	right: 20px;
	z-index: 1000;
	transition: transform 0.3s ease;

	&:hover {
		transform: scale(1.1);
	}
`;
