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
} from './ContentsStyle';

const RecommendationCard = forwardRef(
	({ recommendation, index, personInfo }, ref) => (
		<StyledCard ref={ref}>
			<StyledCardContent>
				<StyledTitle>
					NO {index + 1}: &nbsp; {recommendation.title}
				</StyledTitle>

				<p>
					{recommendation.creator},{' '}
					{new Date(recommendation.release_date).toLocaleDateString()}
				</p>
				<br />
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

				<QuoteContainer>
					<QuoteText>
						"{recommendation.reason}" - {personInfo.name}
					</QuoteText>
					<p>
						소스:{' '}
						<Link to={recommendation.recommendation_source}>
							{recommendation.recommendation_source}
						</Link>
					</p>
				</QuoteContainer>

				<p>{recommendation.mediaDescription}</p>

				{recommendation.affiliate_link && (
					<AffiliateLink
						to={recommendation.affiliate_link}
						target="_blank"
						rel="noopener noreferrer">
						구매 링크
					</AffiliateLink>
				)}
			</StyledCardContent>
		</StyledCard>
	)
);

export default RecommendationCard;
