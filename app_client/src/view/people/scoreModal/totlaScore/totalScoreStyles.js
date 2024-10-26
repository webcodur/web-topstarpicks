import styled from '@emotion/styled';

export const Container = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	padding: ${({ theme }) => theme.spacing(3)};
	border: 1px solid ${({ theme }) => theme.palette.divider};
	border-radius: ${({ theme }) => theme.shape.borderRadius};
	background-color: ${({ theme }) => theme.palette.background.paper};
`;

export const ScoreContainer = styled.div`
	display: flex;
	align-items: baseline;
	margin-bottom: ${({ theme }) => theme.spacing(3)};
`;

export const Score = styled.h3`
	font-weight: bold;
	margin-right: ${({ theme }) => theme.spacing(2)};
`;
export const GradeExplanation = styled.div`
	text-align: center;
	background-color: ${({ theme }) => theme.palette.background.default};
	padding: ${({ theme }) => theme.spacing(2)};
	border-radius: ${({ theme }) => theme.shape.borderRadius};
`;

export const ExplanationTitle = styled.h6`
	font-weight: bold;
	margin-bottom: ${({ theme }) => theme.spacing(1)};
`;

export const ExplanationText = styled.p`
	font-size: 0.9rem;
`;

export const RankLetter = styled.span`
	font-family: 'Permanent Marker', cursive;
	margin-right: 4px;
	font-size: 40px;
`;
