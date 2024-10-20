export const keyframes = `
  @keyframes bounce {
    0%, 20%, 50%, 80%, 100% {transform: translateY(0);}
    40% {transform: translateY(-30px);}
    60% {transform: translateY(-15px);}
  }

  @keyframes swing {
    20% {transform: rotate(15deg);}
    40% {transform: rotate(-10deg);}
    60% {transform: rotate(5deg);}
    80% {transform: rotate(-5deg);}
    100% {transform: rotate(0deg);}
  }

  @keyframes pulse {
    0% {transform: scale(1);}
    50% {transform: scale(1.1);}
    100% {transform: scale(1);}
  }
`;

export const animations = {
	fade: (isVisible) => ({
		opacity: isVisible ? 1 : 0,
	}),
	slideUp: (isVisible) => ({
		transform: isVisible ? 'translateY(0)' : 'translateY(50px)',
		opacity: isVisible ? 1 : 0,
	}),
	slideDown: (isVisible) => ({
		transform: isVisible ? 'translateY(0)' : 'translateY(-50px)',
		opacity: isVisible ? 1 : 0,
	}),
	slideLeft: (isVisible) => ({
		transform: isVisible ? 'translateX(0)' : 'translateX(50px)',
		opacity: isVisible ? 1 : 0,
	}),
	slideRight: (isVisible) => ({
		transform: isVisible ? 'translateX(0)' : 'translateX(-50px)',
		opacity: isVisible ? 1 : 0,
	}),
	scale: (isVisible) => ({
		transform: isVisible ? 'scale(1)' : 'scale(0.5)',
		opacity: isVisible ? 1 : 0,
	}),
	rotate: (isVisible) => ({
		transform: isVisible ? 'rotate(0deg)' : 'rotate(180deg)',
		opacity: isVisible ? 1 : 0,
	}),
	flip: (isVisible) => ({
		transform: isVisible
			? 'perspective(400px) rotateY(0deg)'
			: 'perspective(400px) rotateY(90deg)',
		opacity: isVisible ? 1 : 0,
	}),
	bounce: (isVisible) => ({
		animation: isVisible ? 'bounce 1s' : 'none',
	}),
	swing: (isVisible) => ({
		animation: isVisible ? 'swing 1s' : 'none',
	}),
	zoomIn: (isVisible) => ({
		transform: isVisible ? 'scale(1)' : 'scale(0.1)',
		opacity: isVisible ? 1 : 0,
	}),
	pulse: (isVisible) => ({
		animation: isVisible ? 'pulse 1s infinite' : 'none',
	}),
};
