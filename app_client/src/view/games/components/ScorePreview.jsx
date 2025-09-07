import React from 'react';
import { ScoreCalculator } from '../logic/ScoreCalculator';

export const ScorePreview = ({ card, action, currentTopic }) => {
	if (!card || !action) return null;

	const score = ScoreCalculator.calculateScore(card, action, currentTopic);
	const baseScore = card.rankScore;
	const bonusScore = card.bonus[action];
	const topicBonus = action === currentTopic ? 20 : 0;

	return (
		<div className="fixed right-5 top-25 bg-white dark:bg-gray-800 p-4 rounded-lg shadow-lg flex flex-col gap-2.5 min-w-[150px] z-[5]">
			<p className="m-0 text-base font-semibold text-gray-800 dark:text-gray-200">
				예상 점수
			</p>
			<div className="flex flex-col gap-1.5 text-left">
				<p className="m-0 text-sm text-gray-700 dark:text-gray-300">기본 점수: {baseScore}</p>
				<p className="m-0 text-sm text-gray-700 dark:text-gray-300">
					직업 보너스: {bonusScore > 0 ? '+' : ''}
					{bonusScore}
				</p>
				{topicBonus > 0 && (
					<p className="m-0 text-sm text-gray-700 dark:text-gray-300">주제 보너스: +{topicBonus}</p>
				)}
				<p className="m-0 text-lg font-semibold text-gray-800 dark:text-gray-200">
					총점: {score}
				</p>
			</div>
		</div>
	);
};
