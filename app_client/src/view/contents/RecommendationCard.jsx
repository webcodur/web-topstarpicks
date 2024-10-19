import React, { forwardRef } from 'react';
import { Link } from 'react-router-dom';
import {
	StyledCard,
	StyledCardContent,
	StyledTitle,
	QuoteContainer,
	QuoteText,
	StyledBookImage,
	ImageContainer,
	AffiliateLink,
	SourceLink,
	MediaDescContainer,
} from './ContentsStyle';

const RecommendationCard = forwardRef(
	({ recommendation, index, personInfo }, ref) => (
		<StyledCard ref={ref}>
			<StyledCardContent>
				<StyledTitle>
					NO {index + 1}: &nbsp; {recommendation.title}
				</StyledTitle>

				<div>
					<p style={{ fontSize: '20px' }}>
						{recommendation.creator && <span>{recommendation.creator}</span>}
						{recommendation.release_date && (
							<>
								{' - '}
								{new Date(recommendation.release_date).toLocaleDateString()}
							</>
						)}
					</p>
					<br />
				</div>

				<ImageContainer>
					<StyledBookImage
						src={
							recommendation.img_link ||
							`https://via.placeholder.com/150?text=${encodeURIComponent(
								recommendation.title
							)}`
						}
						alt={recommendation.title}
					/>
				</ImageContainer>

				{recommendation.reason.length > 1 && (
					<QuoteContainer>
						<b>추천사 / 독서경위</b>:
						<QuoteText>{recommendation.reason}</QuoteText>
						<SourceLink to={recommendation.recommendation_source}>
							{' '}
							(소스)
						</SourceLink>
					</QuoteContainer>
				)}

				<MediaDescContainer>
					<b>내용</b>: {recommendation.mediaDescription}
				</MediaDescContainer>
				<br />

				{recommendation.affiliate_link && (
					<AffiliateLink
						to={recommendation.affiliate_link}
						target="_blank"
						rel="noopener noreferrer">
						yes24 링크
					</AffiliateLink>
				)}
			</StyledCardContent>
		</StyledCard>
	)
);

export default RecommendationCard;
