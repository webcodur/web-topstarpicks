import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

const TableOfContentsComponent = ({ recommendations, onItemClick }) => {
	const [isExpanded, setIsExpanded] = useState(false);

	const toggleExpand = () => {
		setIsExpanded(!isExpanded);
	};

	return (
		<div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg mb-6 overflow-hidden">
			{/* 타이틀 및 열기/닫기 버튼 */}
			<div className="flex justify-between items-center p-4 bg-gray-50 dark:bg-gray-700 border-b border-gray-200 dark:border-gray-600">
				<h3 className="text-lg font-semibold text-gray-900 dark:text-white">목차</h3>
				<div className="flex items-center gap-2">
					<p className="text-gray-500 dark:text-gray-400 text-sm mr-2">
						{isExpanded ? '열림' : '접힘'}
					</p>
					<button 
						onClick={toggleExpand}
						className="p-1 hover:bg-gray-200 dark:hover:bg-gray-600 rounded transition-colors duration-200"
					>
						{isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
					</button>
				</div>
			</div>

			{/* 목차 내 목록 */}
			<div className={`transition-all duration-300 overflow-hidden ${isExpanded ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
				<div className="p-4 space-y-2">
					{recommendations.map((recommendation, index) => (
						<div 
							key={index} 
							onClick={() => onItemClick(index)}
							className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded cursor-pointer transition-colors duration-200 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
						>
							{index + 1}. {recommendation.title} / {recommendation.creator}
						</div>
					))}
				</div>
			</div>
		</div>
	);
};

export default TableOfContentsComponent;
