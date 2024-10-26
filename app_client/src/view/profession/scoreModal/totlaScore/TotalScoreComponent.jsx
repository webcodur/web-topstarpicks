import React from 'react';
import {
	Container,
	ScoreContainer,
	Score,
	RankLetter,
	GradeExplanation,
	ExplanationTitle,
	ExplanationText,
} from './totalScoreStyles';

const TotalScoreComponent = ({ person }) => {
	return (
		<Container>
			<ScoreContainer>
				<Score>{person.total_score}점:</Score>
				<RankLetter>{person.grade}</RankLetter>
			</ScoreContainer>
			<GradeExplanation>
				<ExplanationTitle>등급 기준</ExplanationTitle>
				<ExplanationText>
					70점 이상: Stellar 랭크
					<br />
					60점 이상: Authority 랭크
					<br />
					50점 이상: Beacon 랭크
					<br />
					40점 이상: Crystal 랭크
					<br />
					30점 이상: Dignity 랭크
				</ExplanationText>
			</GradeExplanation>
		</Container>
	);
};

export default TotalScoreComponent;
