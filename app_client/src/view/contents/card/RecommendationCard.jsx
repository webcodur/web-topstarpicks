import React, { forwardRef, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useToast } from 'hooks/use-toast';

const RecommendationCard = forwardRef(
	(
		{ recommendation, index, totalCount, personInfo, onPrevious, onNext },
		ref
	) => {
		const { toast } = useToast();

		const handleNavigation = (direction) => {
			if (direction === 'left' && index === 0) {
				toast({
					title: "첫 번째 항목입니다.",
					duration: 3000,
				});
			} else if (direction === 'right' && index === totalCount - 1) {
				toast({
					title: "마지막 항목입니다.",
					duration: 3000,
				});
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
			<div className="relative mb-15 flex items-stretch animate-fade-in" ref={ref}>
				{/* Left Navigation */}
				<button
					className={`
						flex-shrink-0 w-12 flex items-center justify-center cursor-pointer 
						transition-all duration-300 rounded-l-lg
						${index === 0 
							? 'opacity-30 cursor-not-allowed bg-gray-200 dark:bg-gray-700' 
							: 'opacity-70 bg-gray-100 dark:bg-gray-600 hover:opacity-100 hover:bg-gray-200 dark:hover:bg-gray-500'
						}
					`}
					onClick={() => handleNavigation('left')}
					disabled={index === 0}
				>
					<ChevronLeft className={`h-5 w-5 ${index === 0 ? 'opacity-30' : ''}`} />
				</button>

				{/* Main Card Content */}
				<div className="flex-1 bg-white dark:bg-gray-800 rounded-none overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
					<div className="bg-gray-100 dark:bg-gray-800 p-6 flex flex-col items-center font-['Noto_Serif_KR'] font-semibold">
						<h2 className="text-center font-['Song_Myung'] text-2xl mb-4 animate-fade-in">
							NO {index + 1}: &nbsp;{recommendation.title}
						</h2>

						<div className="animate-fade-in" style={{ animationDelay: '200ms' }}>
							<p className="text-lg font-['Noto_Serif_KR'] mb-4">
								{recommendation.creator || '작가 미상'}
								{' ('}
								{recommendation.release_date
									? new Date(recommendation.release_date).toLocaleDateString()
									: '작성일 미상'}
								{')'}
							</p>
						</div>

						{recommendation.img_link && recommendation.img_link.length > 0 && (
							<div className="animate-fade-in border border-gray-300 dark:border-gray-600 rounded-lg p-1 mb-4 overflow-hidden" style={{ animationDelay: '400ms' }}>
								<img 
									src={recommendation.img_link}
									alt={recommendation.title}
									className="max-w-[200px] h-[300px] object-cover transition-transform duration-300 hover:scale-105"
								/>
							</div>
						)}

						{recommendation.reason && recommendation.reason.length > 1 && (
							<div className="animate-fade-in border border-gray-300 dark:border-gray-600 rounded-lg p-4 mt-4 mb-4 bg-gray-50 dark:bg-gray-900 hover:shadow-lg transition-shadow duration-300 w-full" style={{ animationDelay: '600ms' }}>
								<div className="text-center mb-2">
									<b>추천사 / 콘텐츠 수용 경로</b>{' '}
									<Link 
										to={recommendation.recommendation_source}
										className="text-yellow-600 dark:text-yellow-400 no-underline hover:text-yellow-800 dark:hover:text-yellow-300 hover:underline transition-colors duration-300"
									>
										(소스)
									</Link>
								</div>
								<span className="ml-1">{formatText(recommendation.reason)}</span>
							</div>
						)}

						{recommendation.mediaDescription && recommendation.mediaDescription.length > 0 && (
							<div className="animate-fade-in border border-gray-300 dark:border-gray-600 rounded-lg p-4 mt-4 mb-4 bg-gray-50 dark:bg-gray-900 hover:shadow-lg transition-shadow duration-300 w-full" style={{ animationDelay: '800ms' }}>
								<div className="text-center mb-2">
									<b>내용</b>
								</div>
								{formatText(recommendation.mediaDescription)}
							</div>
						)}

						{recommendation.affiliate_link && (
							<div className="animate-fade-in" style={{ animationDelay: '1000ms' }}>
								<Link
									to={recommendation.affiliate_link}
									target="_blank"
									rel="noopener noreferrer"
									className="text-blue-600 dark:text-blue-400 no-underline hover:text-blue-800 dark:hover:text-blue-300 hover:underline transition-colors duration-300"
								>
									yes24 링크
								</Link>
							</div>
						)}
					</div>
				</div>

				{/* Right Navigation */}
				<button
					className={`
						flex-shrink-0 w-12 flex items-center justify-center cursor-pointer 
						transition-all duration-300 rounded-r-lg
						${index === totalCount - 1 
							? 'opacity-30 cursor-not-allowed bg-gray-200 dark:bg-gray-700' 
							: 'opacity-70 bg-gray-100 dark:bg-gray-600 hover:opacity-100 hover:bg-gray-200 dark:hover:bg-gray-500'
						}
					`}
					onClick={() => handleNavigation('right')}
					disabled={index === totalCount - 1}
				>
					<ChevronRight className={`h-5 w-5 ${index === totalCount - 1 ? 'opacity-30' : ''}`} />
				</button>
			</div>
		);
	}
);

export default RecommendationCard;
