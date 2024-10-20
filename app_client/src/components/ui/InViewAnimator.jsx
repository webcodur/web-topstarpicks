import React, { useEffect, useRef, useState, memo } from 'react';
import { animations, keyframes } from './animations';

const InViewAnimator = memo(
	({
		children,
		animationType = 'fade',
		duration = 1,
		delay = 0,
		threshold = 0.1,
	}) => {
		const [isVisible, setIsVisible] = useState(false);
		const ref = useRef(null);

		useEffect(() => {
			const observer = new IntersectionObserver(
				([entry]) => {
					setIsVisible(entry.isIntersecting);
				},
				{ threshold }
			);

			const currentRef = ref.current;
			if (currentRef) observer.observe(currentRef);

			return () => {
				if (currentRef) observer.unobserve(currentRef);
			};
		}, [threshold]);

		return (
			<>
				<style>{keyframes}</style>
				<div
					ref={ref}
					style={{
						transition: `all ${duration}s ease ${delay}s`,
						...animations[animationType](isVisible),
					}}>
					{children}
				</div>
			</>
		);
	}
);

InViewAnimator.displayName = 'InViewAnimator';

export default InViewAnimator;
