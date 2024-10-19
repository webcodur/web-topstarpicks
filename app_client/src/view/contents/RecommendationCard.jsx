import React, { forwardRef } from 'react';
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
	({ recommendation, index, personInfo }, ref) => {
		// 개행 문자를 <br /> 태그로 변환하는 함수
		const formatText = (text) => {
			return text.split('\n').map((line, i) => (
				<React.Fragment key={i}>
					{line}
					<br />
				</React.Fragment>
			));
		};

		return (
			<StyledCard ref={ref}>
				<StyledCardContent>
					<StyledTitle>
						NO {index + 1}: &nbsp; {recommendation.title}
					</StyledTitle>

					<div>
						<p style={{ fontSize: '17px' }}>
							{recommendation.creator || '작가 미상'}
							{' ('}
							{recommendation.release_date
								? new Date(recommendation.release_date).toLocaleDateString()
								: '작성일 미상'}
							{')'}
						</p>
						<br />
					</div>

					{recommendation.img_link.length > 0 && (
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
					)}

					{recommendation.reason.length > 1 && (
						<QuoteContainer>
							<div style={{ textAlign: 'center', margin: '10px' }}>
								<b>추천사 / 콘텐츠 수용 경로</b>
							</div>
							<QuoteText>{formatText(recommendation.reason)}</QuoteText>
							<SourceLink to={recommendation.recommendation_source}>
								{' '}
								(소스)
							</SourceLink>
						</QuoteContainer>
					)}

					{recommendation.mediaDescription.length > 0 && (
						<MediaDescContainer>
							<div style={{ textAlign: 'center', margin: '10px' }}>
								<b>내용</b>
							</div>
							{formatText(recommendation.mediaDescription)}
						</MediaDescContainer>
					)}

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
		);
	}
);

export default RecommendationCard;
