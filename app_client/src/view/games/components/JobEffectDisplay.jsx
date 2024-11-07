import React from 'react';
import * as S from '../styles';

const jobEffects = {
	지도자: {
		name: '카리스마',
		description: '같은 턴에 출전한 아군 카드들의 점수 +10',
	},
	정치인: {
		name: '외교술',
		description: '상대방의 점수가 더 높을 경우, 그 차이의 50%만큼 감소',
	},
	// ... 나머지 직군 효과들
};

export const JobEffectDisplay = ({ jobType, isActive }) => {
	const effect = jobEffects[jobType];
	if (!effect) return null;

	return (
		<S.EffectContainer isActive={isActive}>
			<S.EffectTitle>{effect.name}</S.EffectTitle>
			<S.EffectDescription>{effect.description}</S.EffectDescription>
		</S.EffectContainer>
	);
};
