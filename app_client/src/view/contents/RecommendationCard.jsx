import React, { forwardRef } from 'react';
import { useTheme } from '@mui/material/styles';
import { IconButton, Paper } from '@mui/material';
import { ChevronLeft, ChevronRight } from '@mui/icons-material';
import {
	StyledCardContent,
	StyledTitle,
	QuoteContainer,
	QuoteText,
	StyledBookImage,
	ImageContainer,
	AffiliateLink,
	SourceLink,
	MediaDescContainer,
	NavigationContainer,
} from './ContentsStyle';

const RecommendationCard = forwardRef(
	(
		{ recommendation, index, totalCount, personInfo, onPrevious, onNext },
		ref
	) => {
		const theme = useTheme();

		const formatText = (text) => {
			return text.split('\n').map((line, i) => (
				<React.Fragment key={i}>
					{line}
					<br />
				</React.Fragment>
			));
		};

		return (
			<Paper
				ref={ref}
				elevation={3}
				sx={{
					backgroundColor: theme.palette.background.paper,
					marginBottom: theme.spacing(4),
					borderRadius: theme.shape.borderRadius,
					overflow: 'hidden',
					transition: 'box-shadow 0.3s ease-in-out',
					'&:hover': {
						boxShadow: theme.shadows[6],
					},
				}}>
				<StyledCardContent
					sx={{
						backgroundColor:
							theme.palette.mode === 'dark'
								? theme.palette.grey[800]
								: theme.palette.grey[100],
						padding: theme.spacing(3),
					}}>
					<NavigationContainer>
						{index > 0 ? (
							<IconButton onClick={onPrevious}>
								<ChevronLeft />
							</IconButton>
						) : (
							<div style={{ width: 48, height: 48 }} /> // Placeholder to maintain layout
						)}
						<StyledTitle>
							NO {index + 1}: &nbsp; {recommendation.title}
						</StyledTitle>
						{index < totalCount - 1 ? (
							<IconButton onClick={onNext}>
								<ChevronRight />
							</IconButton>
						) : (
							<div style={{ width: 48, height: 48 }} /> // Placeholder to maintain layout
						)}
					</NavigationContainer>

					{/* Rest of the component remains the same */}
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
			</Paper>
		);
	}
);

export default RecommendationCard;
