import React from 'react';
import { TRANSLATIONS } from '../constants';

export const TopicSection = ({ currentTopic, nextTopic }) => {
	return (
		<div className="flex justify-center gap-10 mt-10">
			<div className="text-center">
				<p className="m-0 text-sm text-gray-600 dark:text-gray-400">현재 주제</p>
				<p className="m-0 text-xl text-primary-main dark:text-primary-light">
					{TRANSLATIONS[currentTopic]}
				</p>
			</div>
			<div className="text-center">
				<p className="m-0 text-sm text-gray-600 dark:text-gray-400">다음 주제</p>
				<p className="m-0 text-xl text-red-500 dark:text-red-400">
					{TRANSLATIONS[nextTopic]}
				</p>
			</div>
		</div>
	);
};
