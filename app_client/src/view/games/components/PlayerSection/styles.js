import styled from '@emotion/styled';

export const PlayerContainer = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 10px;
	width: 100%;
`;

export const HandContainer = styled.div`
	display: flex;
	flex-direction: row;
	gap: 10px;
	justify-content: center;
	width: 100%;
`;

export const Card = styled.div`
	width: 60px;
	height: 80px;
	background-color: ${(props) => (props.isOpponent ? '#666' : '#fff')};
	border: 1px solid #ccc;
	border-radius: 5px;
	display: flex;
	justify-content: center;
	align-items: center;
`;
