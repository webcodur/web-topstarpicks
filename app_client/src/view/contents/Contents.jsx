import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { Loader2 } from 'lucide-react';
import { parseNameFromUrl } from 'utils/urlUtils';
import { fetchPersonInfo } from 'api/celebrityApi';
import { fetchRecommendations } from 'api/recommendationApi';
import { getCountryName } from 'utils/countryUtils';
import TableOfContents from './tableOfContents/TableOfContents';
import FloatingMenu from './floatingMenu/FloatingMenu';
import RecommendationCard from './card/RecommendationCard';
import Title from './Title';

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
				const processPersonData = (data) => ({
					...data,
					nationality: getCountryName(data.nationality),
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
	}, [personName, contentName]);

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

	if (loading) return (
		<div className="flex justify-center items-center min-h-screen">
			<Loader2 className="animate-spin h-8 w-8" />
		</div>
	);
	if (error) return (
		<p className="text-red-500 text-center animate-fade-in">{error}</p>
	);
	if (!personInfo) return (
		<p className="text-red-500 text-center animate-fade-in">인물을 찾을 수 없습니다.</p>
	);

	return (
		<div className="max-w-4xl mx-auto py-8 px-4 animate-fade-in">
			<Title
				name={personInfo.name}
				length={recommendations.length}
				contentName={contentName}
			/>

			<div className="flex flex-col items-center mb-10 animate-slide-in">
				<div className="rounded-lg p-1 mb-4 overflow-hidden">
					<img 
						src={personInfo.img_link} 
						alt={personInfo.name}
						className="max-w-sm h-auto object-cover transition-transform duration-300 hover:scale-105 rounded-lg"
					/>
				</div>
				<h1 className="font-['Song_Myung'] text-center text-3xl mb-4 animate-fade-in">{personInfo.name}</h1>

				<p className="my-1 text-gray-600 dark:text-gray-400 transition-colors duration-300">
					({personInfo.birth_date || '???'}) ~ ({personInfo.death_date || '???'})
				</p>
				<p className="my-1 text-gray-600 dark:text-gray-400 transition-colors duration-300">
					{personInfo.nationality} {personInfo.profession}
				</p>
				<p className="my-1 text-gray-600 dark:text-gray-400 transition-colors duration-300 text-center max-w-2xl">
					{personInfo.biography}
				</p>
			</div>

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
		</div>
	);
};

export default ContentPage;
