import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { CircularProgress } from '@mui/material';
import { parseNameFromUrl } from 'utils/urlUtils';
import { fetchPersonInfo } from 'api/celebrityApi';
import { fetchRecommendations } from 'api/recommendationApi';
import TableOfContents from './tableOfContents/TableOfContents';
import FloatingMenu from './floatingMenu/FloatingMenu';
import RecommendationCard from './card/RecommendationCard';
import Title from './Title';

import {
	PageContainer,
	PersonInfoContainer,
	PersonName,
	ErrorMessage,
	StyledImage,
	ImageContainer,
	PersonInfoText,
} from './ContentsStyle';

const ContentPage = () => {
	const { personName, contentName } = useParams();
	const [recommendations, setRecommendations] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const [personInfo, setPersonInfo] = useState(null);
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const contentRefs = useRef([]);

	const countryNames = new Intl.DisplayNames(['ko'], { type: 'region' });

	useEffect(() => {
		const fetchData = async () => {
			const celebName = parseNameFromUrl(personName);

			try {
				const personData = await fetchPersonInfo(celebName);
				const processPersonData = (data) => ({
					...data,
					nationality: countryNames.of(data.nationality),
				});

				const processedPersonData = Array.isArray(personData)
					? personData.map(processPersonData)
					: processPersonData(personData);

				setPersonInfo(
					Array.isArray(processedPersonData)
						? processedPersonData[0]
						: processedPersonData
				);

				const recommendationsData = await fetchRecommendations(
					celebName,
					contentName
				);

				setRecommendations(recommendationsData);
				contentRefs.current = recommendationsData.map(() => React.createRef());
			} catch (err) {
				console.error('데이터 가져오기 오류:', err);
				setError(err.message);
			} finally {
				setLoading(false);
			}
		};

		fetchData();
	}, [personName, contentName, countryNames]);

	const scrollToContent = useCallback((index) => {
		if (contentRefs.current[index] && contentRefs.current[index].current) {
			contentRefs.current[index].current.scrollIntoView({
				behavior: 'smooth',
				block: 'start',
			});
		}
	}, []);

	const toggleMenu = () => {
		setIsMenuOpen(!isMenuOpen);
	};

	if (loading) return <CircularProgress />;
	if (error) return <ErrorMessage>{error}</ErrorMessage>;
	if (!personInfo) return <ErrorMessage>인물을 찾을 수 없습니다.</ErrorMessage>;

	return (
		<PageContainer>
			<Title
				name={personInfo.name}
				length={recommendations.length}
				contentName={contentName}
			/>

			<PersonInfoContainer>
				<ImageContainer>
					<StyledImage src={personInfo.img_link} alt={personInfo.name} />
				</ImageContainer>
				<PersonName>{personInfo.name}</PersonName>

				<PersonInfoText>
					({personInfo.birth_date || '???'}) ~ ({personInfo.death_date || '???'}
					)
				</PersonInfoText>
				<PersonInfoText>
					{personInfo.nationality} {personInfo.profession}
				</PersonInfoText>
				<PersonInfoText>{personInfo.biography}</PersonInfoText>
			</PersonInfoContainer>

			<TableOfContents
				recommendations={recommendations}
				onItemClick={scrollToContent}
			/>

			{recommendations.map((recommendation, index) => (
				<RecommendationCard
					key={index}
					recommendation={recommendation}
					index={index}
					totalCount={recommendations.length}
					ref={contentRefs.current[index]}
					onPrevious={() => scrollToContent(Math.max(0, index - 1))}
					onNext={() =>
						scrollToContent(Math.min(recommendations.length - 1, index + 1))
					}
				/>
			))}

			<FloatingMenu
				isOpen={isMenuOpen}
				onToggle={toggleMenu}
				recommendations={recommendations}
				onItemClick={scrollToContent}
			/>
		</PageContainer>
	);
};

export default ContentPage;
