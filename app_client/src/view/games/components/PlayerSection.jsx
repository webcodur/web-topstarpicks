import React from 'react';
import { JobEffectTooltip } from './JobEffectTooltip';

export const PlayerSection = ({ isOpponent, health, cards = [] }) => {
	return (
		<div className={`flex flex-col gap-4 p-4 rounded-lg ${isOpponent ? 'bg-red-50 dark:bg-red-900/20' : 'bg-blue-50 dark:bg-blue-900/20'}`}>
			<div>
				<div className="text-xl font-semibold mb-2">
					{isOpponent ? '상대방' : '플레이어'}
				</div>
				<div className="text-gray-700 dark:text-gray-300 mb-2">체력: {health}</div>
				<div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-4 overflow-hidden">
					<div 
						className="h-full bg-green-500 transition-all duration-300" 
						style={{ width: `${(health / 100) * 100}%` }}
					/>
				</div>
			</div>
			{isOpponent && cards && (
				<div className="flex flex-wrap gap-2">
					{cards.map((card, index) => (
						<div key={index} className="w-16 h-24 bg-gray-600 rounded-lg flex flex-col items-center justify-center text-white relative group">
							{!card.isEmpty && (
								<>
									<div className="absolute -top-8 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity">
										<JobEffectTooltip jobType={card.type} />
									</div>
									<div className="text-xs font-medium text-center">{card.type}</div>
								</>
							)}
						</div>
					))}
				</div>
			)}
		</div>
	);
};
