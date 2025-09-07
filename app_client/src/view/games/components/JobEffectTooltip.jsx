import React from 'react';
import { JOB_EFFECTS } from '../constants/jobEffects';

export const JobEffectTooltip = ({ jobType }) => {
	const effect = JOB_EFFECTS[jobType];
	if (!effect) return null;

	return (
		<div className="effect-tooltip bg-gray-800 text-white p-2 rounded-lg shadow-lg z-10 min-w-max">
			<div className="font-semibold text-sm mb-1">{effect.name}</div>
			<div className="text-xs text-gray-200">{effect.description}</div>
		</div>
	);
};
