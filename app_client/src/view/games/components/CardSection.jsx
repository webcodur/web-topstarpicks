import React from 'react';
import { JobEffectTooltip } from './JobEffectTooltip';

export const CardSection = ({
	cards,
	selectedCard,
	onCardSelect,
	removingIndex,
	newCardIndices,
}) => {
	return (
		<div className="flex flex-wrap gap-4 p-4 justify-center">
			{cards.map((card, index) => (
				<div
					key={`${card.id}-${index}`}
					data-card-index={index}
					className={`
						relative bg-white rounded-lg p-4 shadow-lg cursor-pointer transition-all duration-300
						${selectedCard && selectedCard.id === card.id 
							? 'ring-4 ring-blue-500 transform scale-105' 
							: 'hover:shadow-xl hover:transform hover:scale-102'
						}
						${removingIndex === index ? 'opacity-50 animate-pulse' : ''}
						${newCardIndices.includes(index) ? 'ring-2 ring-green-400 animate-bounce' : ''}
						${card.isEmpty ? 'bg-gray-100 cursor-default' : ''}
					`}
					onClick={() => !card.isEmpty && onCardSelect(card)}
				>
					{!card.isEmpty && (
						<>
							<JobEffectTooltip jobType={card.type} />
							<h4 className="text-xl font-bold text-gray-800 mb-2">{card.name}</h4>
							<p className="text-gray-600 mb-1">{card.type}</p>
							<p className="text-blue-600 font-semibold">{card.rank}등급</p>
						</>
					)}
				</div>
			))}
		</div>
	);
};