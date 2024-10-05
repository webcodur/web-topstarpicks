import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { CircularProgress } from '@mui/material';
import { parseNameFromUrl } from 'utils/urlUtils';
import { fetchPersonInfo } from 'api/celebrityApi';
import { fetchRecommendations } from 'api/recommendationApi';
import TableOfContents from './TableOfContents';
import FloatingMenu from './FloatingMenu';
import RecommendationCard from './RecommendationCard';
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

	useEffect(() => {
		const fetchData = async () => {
			const celebName = parseNameFromUrl(personName);

			try {
				const personData = await fetchPersonInfo(celebName);
				setPersonInfo(Array.isArray(personData) ? personData[0] : personData);

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
	}, [personName, contentName]);

	const scrollToContent = (index) => {
		contentRefs.current[index].current.scrollIntoView({ behavior: 'smooth' });
	};

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

			{/* 셀럽 정보 */}
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
				<PersonName>{personInfo.name}</PersonName>
				<PersonInfoText>출생: {personInfo.birth_date}</PersonInfoText>
				{personInfo.date_of_death && (
					<PersonInfoText>사망: {personInfo.date_of_death}</PersonInfoText>
				)}
				<PersonInfoText>성별: {personInfo.gender}</PersonInfoText>
				<PersonInfoText>국적: {personInfo.nationality}</PersonInfoText>
				<PersonInfoText>직군: {personInfo.profession}</PersonInfoText>
				<PersonInfoText>약력: {personInfo.biography}</PersonInfoText>
			</PersonInfoContainer>

			{/* 상단 목차 */}
			<TableOfContents
				recommendations={recommendations}
				onItemClick={scrollToContent}
			/>

			{/* 추천 컨텐츠 항목 */}
			{recommendations.map((recommendation, index) => (
				<RecommendationCard
					key={index}
					recommendation={recommendation}
					index={index}
					personInfo={personInfo}
					ref={contentRefs.current[index]}
				/>
			))}

			{/* 우측 사이드 메뉴 목차 */}
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
