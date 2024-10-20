import React, { useMemo } from 'react';
import InViewAnimator from './InViewAnimator';

const animationTypes = [
	{ type: 'fade', label: '페이드' },
	{ type: 'slideUp', label: '위로 슬라이드' },
	{ type: 'slideDown', label: '아래로 슬라이드' },
	{ type: 'slideLeft', label: '왼쪽에서 슬라이드' },
	{ type: 'slideRight', label: '오른쪽에서 슬라이드' },
	{ type: 'scale', label: '스케일' },
	{ type: 'rotate', label: '회전' },
	{ type: 'flip', label: '뒤집기' },
	{ type: 'bounce', label: '튀기기' },
	{ type: 'swing', label: '흔들기' },
	{ type: 'zoomIn', label: '확대' },
	{ type: 'pulse', label: '펄스' },
];

const AnimationItem = React.memo(({ type, label }) => (
	<div style={{ marginBottom: '10rem' }}>
		<InViewAnimator animationType={type} duration={0.5} delay={0.2}>
			<div
				style={{
					backgroundColor: 'blue',
					color: 'white',
					padding: '1rem',
					borderRadius: '0.25rem',
				}}>
				{label} 애니메이션
			</div>
		</InViewAnimator>
	</div>
));

AnimationItem.displayName = 'AnimationItem';

const AnimationTest = () => {
	const animationItems = useMemo(
		() =>
			animationTypes.map((item, index) => (
				<AnimationItem key={index} type={item.type} label={item.label} />
			)),
		[]
	);

	return <div style={{ padding: '1rem' }}>{animationItems}</div>;
};

export default AnimationTest;
