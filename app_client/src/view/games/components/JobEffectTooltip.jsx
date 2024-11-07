import React from 'react';
import { JOB_EFFECTS } from '../constants/jobEffects';
import * as S from '../styles';

export const JobEffectTooltip = ({ jobType }) => {
	const effect = JOB_EFFECTS[jobType];
	if (!effect) return null;

	return (
		<S.EffectTooltip className="effect-tooltip">
			<S.EffectTitle>{effect.name}</S.EffectTitle>
			<S.EffectDescription>{effect.description}</S.EffectDescription>
		</S.EffectTooltip>
	);
};
