import React, { forwardRef, useState } from 'react';
import { useTheme } from '@mui/material/styles';
import { Paper, Fade, Snackbar } from '@mui/material';
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
	CardWrapper,
	NavigationArea,
} from './RecommendationCardStyle';

const RecommendationCard = forwardRef(
	(
		{ recommendation, index, totalCount, personInfo, onPrevious, onNext },
		ref
	) => {
		const theme = useTheme();
		const [snackbarOpen, setSnackbarOpen] = useState(false);
		const [snackbarMessage, setSnackbarMessage] = useState('');

		const handleNavigation = (direction) => {
			if (direction === 'left' && index === 0) {
				setSnackbarMessage('첫 번째 항목입니다.');
				setSnackbarOpen(true);
			} else if (direction === 'right' && index === totalCount - 1) {
				setSnackbarMessage('마지막 항목입니다.');
				setSnackbarOpen(true);
			} else if (direction === 'left') {
				onPrevious();
			} else {
				onNext();
			}
		};

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
				<CardWrapper ref={ref}>
					<NavigationArea
						direction="left"
						onClick={() => handleNavigation('left')}
						disabled={index === 0}
					/>
					<Paper
						elevation={3}
						sx={{
							backgroundColor: theme.palette.background.paper,
							borderRadius: 0,
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
								fontColor: 'black',
								fontWeight: '600',
								fontFamily: 'Noto Serif KR',
							}}>
							<StyledTitle>
								NO {index + 1}: &nbsp;{recommendation.title}
							</StyledTitle>

							<Fade
								in={true}
								timeout={500}
								style={{ transitionDelay: '200ms' }}>
								<div>
									<p style={{ fontSize: '17px', fontFamily: 'Noto Serif KR' }}>
										{recommendation.creator || '작가 미상'}
										{' ('}
										{recommendation.release_date
											? new Date(
													recommendation.release_date
											  ).toLocaleDateString()
											: '작성일 미상'}
										{')'}
									</p>
									<br />
								</div>
							</Fade>

							{recommendation.img_link &&
								recommendation.img_link.length > 0 && (
									<Fade
										in={true}
										timeout={500}
										style={{ transitionDelay: '400ms' }}>
										<ImageContainer>
											<StyledBookImage
												src={recommendation.img_link}
												alt={recommendation.title}
											/>
										</ImageContainer>
									</Fade>
								)}

							{recommendation.reason && recommendation.reason.length > 1 && (
								<Fade
									in={true}
									timeout={500}
									style={{ transitionDelay: '600ms' }}>
									<QuoteContainer>
										<div style={{ textAlign: 'center', margin: '10px' }}>
											<b>추천사 / 콘텐츠 수용 경로</b>{' '}
											<SourceLink to={recommendation.recommendation_source}>
												(소스)
											</SourceLink>
										</div>
										<QuoteText>{formatText(recommendation.reason)}</QuoteText>
									</QuoteContainer>
								</Fade>
							)}

							{recommendation.mediaDescription &&
								recommendation.mediaDescription.length > 0 && (
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
					<NavigationArea
						direction="right"
						onClick={() => handleNavigation('right')}
						disabled={index === totalCount - 1}
					/>
					<Snackbar
						anchorOrigin={{
							vertical: 'bottom',
							horizontal: 'center',
						}}
						open={snackbarOpen}
						autoHideDuration={3000}
						onClose={() => setSnackbarOpen(false)}
						message={snackbarMessage}
					/>
				</CardWrapper>
			</Fade>
		);
	}
);

export default RecommendationCard;
