import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { CircularProgress } from '@mui/material';
import { parseNameFromUrl } from 'utils/urlUtils';
import { fetchPersonInfo } from 'api/celebrityApi';
import { fetchRecommendations } from 'api/recommendationApi';
import {
	StyledCard,
	StyledCardContent,
	StyledTitle,
	QuoteContainer,
	QuoteText,
	StyledImage,
	StyledBookImage,
	ImageContainer,
	PageContainer,
	PersonInfoContainer,
	PersonName,
	ErrorMessage,
	AffiliateLink,
} from './ContentsStyle';
import { Link } from 'react-router-dom';

const ContentPage = () => {
	const { personName, contentType } = useParams();
	const [recommendations, setRecommendations] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const [personInfo, setPersonInfo] = useState(null);

	useEffect(() => {
		const fetchData = async () => {
			const celebName = parseNameFromUrl(personName);

			try {
				const personData = await fetchPersonInfo(celebName);
				setPersonInfo(personData);

				const recommendationsData = await fetchRecommendations(
					celebName,
					contentType
				);
				setRecommendations(recommendationsData);
			} catch (err) {
				console.error('데이터 가져오기 오류:', err);
				setError(err.message);
			} finally {
				setLoading(false);
			}
		};

		fetchData();
	}, [personName, contentType]);

	if (loading) return <CircularProgress />;
	if (error) return <ErrorMessage>{error}</ErrorMessage>;
	if (!personInfo) return <ErrorMessage>인물을 찾을 수 없습니다.</ErrorMessage>;

	return (
		<PageContainer>
			<PersonInfoContainer>
				<ImageContainer>
					<StyledImage
						src={
							personInfo.img_link ||
							`https://via.placeholder.com/150?text=${encodeURIComponent(
								personInfo.name
							)}`
						}
						alt={personInfo.name}
					/>
				</ImageContainer>
				<PersonName>
					{personInfo.name}의 {contentType}
				</PersonName>
			</PersonInfoContainer>

			{recommendations.map((recommendation, index) => (
				<StyledCard key={index}>
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
			))}
		</PageContainer>
	);
};

export default ContentPage;
