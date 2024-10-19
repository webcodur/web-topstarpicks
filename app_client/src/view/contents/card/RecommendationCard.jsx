import React, { forwardRef } from 'react';
import { useTheme } from '@mui/material/styles';
import { IconButton, Paper, Fade } from '@mui/material';
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
} from './RecommendationCardStyle';

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
			<Fade in={true} timeout={500}>
				<Paper
					ref={ref}
					elevation={3}
					sx={{
						backgroundColor: theme.palette.background.paper,
						marginBottom: theme.spacing(4),
						borderRadius: theme.shape.borderRadius,
						overflow: 'hidden',
						transition:
							'box-shadow 0.3s ease-in-out, transform 0.3s ease-in-out',
						'&:hover': {
							boxShadow: theme.shadows[6],
							transform: 'translateY(-5px)',
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
							<IconButton onClick={onPrevious} disabled={index === 0}>
								<ChevronLeft />
							</IconButton>
							<StyledTitle>
								NO {index + 1}: &nbsp; {recommendation.title}
							</StyledTitle>
							<IconButton onClick={onNext} disabled={index === totalCount - 1}>
								<ChevronRight />
							</IconButton>
						</NavigationContainer>

						<Fade in={true} timeout={500} style={{ transitionDelay: '200ms' }}>
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
						</Fade>

						{recommendation.img_link.length > 0 && (
							<Fade
								in={true}
								timeout={500}
								style={{ transitionDelay: '400ms' }}>
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
							</Fade>
						)}

						{recommendation.reason.length > 1 && (
							<Fade
								in={true}
								timeout={500}
								style={{ transitionDelay: '600ms' }}>
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
							</Fade>
						)}

						{recommendation.mediaDescription.length > 0 && (
							<Fade
								in={true}
								timeout={500}
								style={{ transitionDelay: '800ms' }}>
								<MediaDescContainer>
									<div style={{ textAlign: 'center', margin: '10px' }}>
										<b>내용</b>
									</div>
									{formatText(recommendation.mediaDescription)}
								</MediaDescContainer>
							</Fade>
						)}

						{recommendation.affiliate_link && (
							<Fade
								in={true}
								timeout={500}
								style={{ transitionDelay: '1000ms' }}>
								<AffiliateLink
									to={recommendation.affiliate_link}
									target="_blank"
									rel="noopener noreferrer">
									yes24 링크
								</AffiliateLink>
							</Fade>
						)}
					</StyledCardContent>
				</Paper>
			</Fade>
		);
	}
);

export default RecommendationCard;
