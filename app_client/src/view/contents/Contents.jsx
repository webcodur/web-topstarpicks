import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Typography, Container, Box, CircularProgress } from '@mui/material';
import { parseNameFromUrl } from 'utils/urlUtils';
import {
	StyledCard,
	StyledCardContent,
	StyledTitle,
	QuoteContainer,
	QuoteText,
	QuoteIconStart,
	QuoteIconEnd,
	StyledImage,
	StyledBookImage,
	ImageContainer,
} from './ContentsStyle';
import { Link } from 'react-router-dom';

const API_BASE_URL = 'http://localhost:4000'; // API 서버의 기본 URL을 여기에 설정하세요

const ContentPage = () => {
	const { personName, contentType } = useParams();
	const [recommendations, setRecommendations] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const [personInfo, setPersonInfo] = useState(null);

	useEffect(() => {
		const fetchData = async () => {
			setLoading(true);
			try {
				// 인물 정보 가져오기
				const personResponse = await fetch(
					`${API_BASE_URL}/api/celebrities?name=${encodeURIComponent(
						parseNameFromUrl(personName)
					)}`
				);
				if (!personResponse.ok) {
					const errorText = await personResponse.text();
					throw new Error(
						`인물 정보를 가져오는데 실패했습니다. 상태: ${personResponse.status}, 응답: ${errorText}`
					);
				}
				const personData = await personResponse.json();
				setPersonInfo(personData.data[0]);

				// 추천 정보 가져오기
				const recommendationsResponse = await fetch(
					`${API_BASE_URL}/api/recommendations?celebrity_name=${encodeURIComponent(
						parseNameFromUrl(personName)
					)}&content_type=${encodeURIComponent(contentType)}`
				);
				if (!recommendationsResponse.ok) {
					const errorText = await recommendationsResponse.text();
					throw new Error(
						`추천 정보를 가져오는데 실패했습니다. 상태: ${recommendationsResponse.status}, 응답: ${errorText}`
					);
				}
				const recommendationsData = await recommendationsResponse.json();
				setRecommendations(recommendationsData.data);
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
	if (error) return <Typography color="error">{error}</Typography>;
	if (!personInfo) return <Typography>인물을 찾을 수 없습니다.</Typography>;

	return (
		<Container maxWidth="md" sx={{ mt: 4 }}>
			<Box
				sx={{
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
					mb: 4,
					marginBottom: '100px',
				}}>
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
				<Typography variant="h4" gutterBottom align="center">
					{personInfo.name}의 {contentType}
				</Typography>
			</Box>

			{recommendations.map((recommendation, index) => (
				<StyledCard key={index} sx={{ mb: 3 }}>
					<StyledCardContent>
						<StyledTitle variant="h5" align="center">
							NO {index + 1}: &nbsp; {recommendation.title}
						</StyledTitle>

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
							<QuoteIconStart />
							<QuoteText variant="body1">{recommendation.reason}</QuoteText>
							<QuoteIconEnd />
						</QuoteContainer>

						<Typography variant="body1" paragraph>
							작성자/감독: {recommendation.creator}, 출시일:{' '}
							{new Date(recommendation.release_date).toLocaleDateString()}
						</Typography>

						{recommendation.affiliate_link && (
							<Link
								to={recommendation.affiliate_link}
								style={{ color: 'red' }}
								target="_blank"
								rel="noopener noreferrer">
								구매 링크
							</Link>
						)}
					</StyledCardContent>
				</StyledCard>
			))}
		</Container>
	);
};

export default ContentPage;
