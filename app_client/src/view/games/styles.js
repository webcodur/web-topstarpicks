// styles.js
import styled from '@emotion/styled';
import { Box, Modal, Paper, Button, LinearProgress } from '@mui/material';
import { keyframes } from '@emotion/react';

export const drawToPlayer = keyframes`
  from {
    transform: translate(0, 0) rotate(0deg);
  }
  to {
    transform: translate(-200px, 200px) rotate(360deg);
  }
`;

export const drawToOpponent = keyframes`
  from {
    transform: translate(0, 0) rotate(0deg);
  }
  to {
    transform: translate(200px, -200px) rotate(360deg);
  }
`;

export const GameContainer = styled.div`
	position: relative;
	width: 100%;
	max-width: 1200px;
	margin: 0 auto;
	padding: 20px;
	min-height: 100vh;
	background: #f5f5f5;
	display: flex;
	flex-direction: column;
	gap: 20px;
`;

export const TopicSection = styled.div`
	display: flex;
	justify-content: center;
	gap: 40px;
	margin-top: 40px;
`;

export const PlayerSection = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 20px;
	background: ${
		(props) =>
			props.isOpponent
				? 'rgba(244, 67, 54, 0.05)' // 더 밝은 빨간색
				: 'rgba(33, 150, 243, 0.05)' // 더 밝은 파란색 배경
	};
	border-radius: 8px;
	box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

export const HealthBar = styled.div`
	width: 200px;
	height: 10px;
	background-color: #e0e0e0;
	border-radius: 5px;
	overflow: hidden;
	position: relative;
`;

export const HealthBarFill = styled.div`
	position: absolute;
	left: 0;
	top: 0;
	height: 100%;
	width: ${(props) => props.value}%;
	background-color: ${(props) =>
		props.value > 70 ? '#4caf50' : props.value > 30 ? '#ff9800' : '#f44336'};
	transition: width 0.5s ease-out, background-color 0.5s ease-out;
`;

export const HealthChange = styled.span`
	position: absolute;
	top: -20px;
	right: 0;
	color: ${(props) => (props.isHealing ? '#4caf50' : '#f44336')};
	font-weight: bold;
	font-size: 1.2rem;
	animation: floatAndFade 1s ease-out forwards;

	@keyframes floatAndFade {
		0% {
			opacity: 0;
			transform: translateY(10px);
		}
		20% {
			opacity: 1;
			transform: translateY(0);
		}
		80% {
			opacity: 1;
			transform: translateY(-10px);
		}
		100% {
			opacity: 0;
			transform: translateY(-20px);
		}
	}
`;

export const HandSection = styled(Box)`
	display: flex;
	gap: 10px;
	justify-content: center;
	flex-wrap: wrap;
	margin: 20px 0;
`;

export const PlayerCard = styled(Paper, {
	shouldForwardProp: (prop) =>
		!['shouldTransform', 'isRemoving', 'isSelected', 'isNew'].includes(prop),
})`
	width: 120px;
	height: 180px;
	padding: 10px;
	display: flex;
	flex-direction: column;
	align-items: center;
	cursor: pointer;
	transition: all 0.3s ease;
	position: relative;
	opacity: ${(props) => (props.isRemoving ? 0 : 1)};
	border: ${(props) => (props.isSelected ? '2px solid #2196f3' : 'none')};
	box-shadow: ${(props) =>
		props.isSelected
			? '0 0 10px rgba(33, 150, 243, 0.5)'
			: '0 2px 4px rgba(0, 0, 0, 0.1)'};

	${(props) =>
		props.isNew &&
		`
		animation: fadeInCard 0.5s ease-out;
		@keyframes fadeInCard {
			from {
				opacity: 0;
				transform: translateY(20px);
			}
			to {
				opacity: 1;
				transform: translateY(0);
			}
		}
	`}

	&:hover {
		box-shadow: ${(props) =>
			props.isRemoving
				? 'none'
				: props.isSelected
				? '0 0 12px rgba(33, 150, 243, 0.6)'
				: '0 4px 8px rgba(0, 0, 0, 0.2)'};

		.effect-tooltip {
			opacity: 1;
		}
	}
`;

export const ActionSection = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	gap: 20px;
`;

export const ActionButtonGroup = styled(Box)`
	display: flex;
	gap: 10px;
	justify-content: center;
`;

export const ActionButton = styled(Button, {
	shouldForwardProp: (prop) =>
		!['isActive', 'isSubmit', 'isCurrentTopic'].includes(prop),
})`
	&& {
		padding: 10px 20px;
		min-width: 80px;
		color: white;
		text-transform: none;
		position: relative;
		background-color: ${(props) =>
			props.disabled
				? '#e0e0e0'
				: props.isActive
				? '#2196f3'
				: props.isSubmit
				? '#4caf50'
				: '#90a4ae'};

		${(props) =>
			props.isCurrentTopic &&
			!props.disabled &&
			`
			border: 2px solid #ffd700;
			box-shadow: 0 0 10px rgba(255, 215, 0, 0.3);
			
			&::after {
				content: '주제';
				position: absolute;
				top: -10px;
				right: -10px;
				background: #ffd700;
				color: #000;
				padding: 2px 6px;
				border-radius: 4px;
				font-size: 0.7rem;
				font-weight: bold;
			}
		`}

		&:hover {
			background-color: ${(props) =>
				props.disabled
					? '#e0e0e0'
					: props.isActive
					? '#1976d2'
					: props.isSubmit
					? '#388e3c'
					: '#78909c'};
		}
	}
`;

export const LibraryButton = styled.button`
	padding: 8px 16px;
	background: ${(props) => props.theme.palette.primary.main};
	color: white;
	border: none;
	border-radius: 4px;
	cursor: pointer;
	font-size: 14px;
	transition: background-color 0.2s;

	&:hover {
		background: ${(props) => props.theme.palette.primary.dark};
	}
`;

export const CloseButton = styled.button`
	position: absolute;
	top: 8px;
	right: 8px;
	width: 30px;
	height: 30px;
	background: ${(props) => props.theme.palette.grey[200]};
	border: none;
	border-radius: 50%;
	cursor: pointer;
	display: flex;
	align-items: center;
	justify-content: center;
	font-size: 18px;

	&:hover {
		background: ${(props) => props.theme.palette.grey[300]};
	}
`;

export const CardListModal = styled(Modal)`
	display: flex;
	align-items: center;
	justify-content: center;
`;

export const ModalContent = styled(Box)`
	background: white;
	padding: 20px;
	border-radius: 8px;
	max-width: 800px;
	max-height: 80vh;
	overflow-y: auto;
	position: relative;
`;

export const CardGrid = styled(Box)`
	display: grid;
	grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
	gap: 16px;
	padding: 20px;
`;

export const TurnIndicator = styled.div`
	position: absolute;
	top: 20px;
	left: 20px;
	padding: 10px 20px;
	background: rgba(0, 0, 0, 0.5);
	border-radius: 8px;
`;

// InfoText 컴포넌트 수정
export const InfoText = styled.p`
	margin: ${(props) => props.margin || '0'};
	font-size: ${(props) => props.fontSize || '1rem'};
	font-weight: ${(props) => props.fontWeight || 'normal'};
	color: ${(props) =>
		props.color === 'white' ? '#333' : props.color || '#333'};
	text-align: ${(props) => props.align || 'left'};
`;

export const ResultModal = styled(Box)`
	position: fixed;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	background: white;
	padding: 20px;
	border-radius: 8px;
	box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
	z-index: 1000;
	min-width: 300px;
	max-width: 80%;
	display: flex;
	flex-direction: column;
	gap: 16px;

	animation: fadeIn 0.3s ease-in-out;

	@keyframes fadeIn {
		from {
			opacity: 0;
			transform: translate(-50%, -40%);
		}
		to {
			opacity: 1;
			transform: translate(-50%, -50%);
		}
	}
`;

export const DeckInfo = styled(Box)`
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	gap: 4px;
`;

export const DeckCount = styled(Box)`
	position: absolute;
	bottom: 10px;
	left: 50%;
	transform: translateX(-50%);
	color: white;
	font-size: 18px;
	font-weight: bold;
	background: rgba(0, 0, 0, 0.3);
	padding: 2px 8px;
	border-radius: 4px;
`;

export const DeckSection = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
`;

export const Deck = styled(Box)`
	width: 100px;
	height: 140px;
	background: ${(props) => props.theme.palette.primary.main};
	border-radius: 8px;
	position: relative;
	cursor: pointer;
	transition: transform 0.2s;
	box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);

	&:hover {
		transform: translateY(-5px);
	}

	&::before {
		content: '${(props) => props.count}';
		position: absolute;
		bottom: 10px;
		left: 50%;
		transform: translateX(-50%);
		color: white;
		font-size: 18px;
		font-weight: bold;
		background: rgba(0, 0, 0, 0.3);
		padding: 2px 8px;
		border-radius: 4px;
	}
`;

export const DrawnCard = styled(Box)`
	position: absolute;
	width: 100px;
	height: 140px;
	background: white;
	border-radius: 8px;
	box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
	transform-origin: center;
	animation: ${(props) => (props.isPlayer ? drawToPlayer : drawToOpponent)} 1s
		ease-out forwards;
	backface-visibility: hidden;
	perspective: 1000px;
	transform-style: preserve-3d;
`;

export const CardBack = styled(Box)`
	width: 100px;
	height: 140px;
	background: linear-gradient(45deg, #1a237e, #3949ab);
	border-radius: 8px;
	box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
	transition: transform 0.2s;
	position: relative;
	display: flex;
	align-items: center;
	justify-content: center;

	&:hover {
		transform: translateY(-5px);

		.effect-tooltip {
			opacity: 1;
		}
	}
`;

export const CardBackText = styled.div`
	color: rgba(255, 255, 255, 0.8);
	font-size: 0.9rem;
	text-align: center;
	padding: 4px 8px;
	background: rgba(255, 255, 255, 0.1);
	border-radius: 4px;
	backdrop-filter: blur(2px);
`;

export const ScorePreview = styled(Box)`
	position: fixed;
	right: 20px;
	top: 100px;
	background: white;
	padding: 15px;
	border-radius: 8px;
	box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
	display: flex;
	flex-direction: column;
	gap: 10px;
	min-width: 150px;
	z-index: 5;

	& > div {
		display: flex;
		flex-direction: column;
		gap: 5px;
		text-align: left;
	}
`;

export const OpponentCards = styled.div`
	display: flex;
	justify-content: center;
	gap: 10px;
	perspective: 1000px;
	margin: 10px 0;
	min-height: 140px;
	flex-wrap: wrap;

	& > div {
		transition: transform 0.2s ease;

		&:hover {
			transform: translateY(-10px) rotateY(10deg);
		}
	}
`;

export const BattleOverlay = styled.div`
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	background: rgba(0, 0, 0, 0.7);
	display: flex;
	align-items: center;
	justify-content: center;
	z-index: 1000;
	perspective: 1000px;
`;

export const BattleContainer = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	gap: 3rem;
	animation: fadeIn 0.5s ease-in-out;

	@keyframes fadeIn {
		from {
			opacity: 0;
		}
		to {
			opacity: 1;
		}
	}
`;

export const BattleCard = styled.div`
	width: 300px;
	background: white;
	border-radius: 12px;
	padding: 20px;
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 10px;
	box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
	transition: all 0.5s ease-in-out;
	opacity: ${(props) =>
		props.phase === 'result' && !props.isWinner ? 0.6 : 1};
	transform: ${(props) =>
		props.phase === 'result' && props.isWinner ? 'scale(1.1)' : 'scale(1)'};
`;

export const BattleVS = styled.div`
	font-size: 3rem;
	font-weight: bold;
	color: white;
	text-shadow: 0 0 10px rgba(255, 255, 255, 0.5);
	opacity: ${(props) => (props.phase === 'clash' ? 1 : 0)};
	transition: opacity 0.3s ease-in-out;
`;

export const ScoreText = styled.div`
	font-size: 1.5rem;
	font-weight: bold;
	color: ${(props) => props.theme.palette.primary.main};
	margin-top: auto;
`;

export const TopButtonSection = styled.div`
	display: flex;
	align-items: center;
	gap: 20px;
	position: absolute;
	top: 20px;
	right: 20px;
	z-index: 10;
`;

export const EffectContainer = styled.div`
	padding: 8px;
	border-radius: 4px;
	background-color: ${(props) =>
		props.isActive ? 'rgba(33, 150, 243, 0.1)' : 'transparent'};
	border: 1px solid ${(props) => (props.isActive ? '#2196f3' : '#ddd')};
	margin: 4px 0;
	transition: all 0.3s ease;
`;

export const EffectTitle = styled.h4`
	margin: 0 0 4px 0;
	color: #2196f3;
	font-size: 1rem;
`;

export const EffectDescription = styled.p`
	margin: 0;
	font-size: 0.875rem;
	color: #666;
`;

export const SubmitButtonContainer = styled.div`
	display: flex;
	justify-content: center;
	margin: 20px 0;
`;

export const EffectTooltip = styled.div`
	position: absolute;
	top: -100px;
	left: 50%;
	transform: translateX(-50%);
	background: rgba(0, 0, 0, 0.9);
	color: white;
	padding: 12px 16px;
	border-radius: 8px;
	font-size: 0.875rem;
	pointer-events: none;
	opacity: 0;
	transition: opacity 0.2s;
	width: max-content;
	max-width: 200px;
	z-index: 1000;
	box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
	border: 1px solid rgba(255, 255, 255, 0.1);

	h4 {
		color: #2196f3;
		margin: 0 0 4px 0;
		font-size: 1rem;
		font-weight: 600;
	}

	p {
		margin: 0;
		color: #ffffff;
		line-height: 1.4;
	}

	&::after {
		content: '';
		position: absolute;
		bottom: -8px;
		left: 50%;
		transform: translateX(-50%) rotate(45deg);
		width: 12px;
		height: 12px;
		background: rgba(0, 0, 0, 0.9);
		border-right: 1px solid rgba(255, 255, 255, 0.1);
		border-bottom: 1px solid rgba(255, 255, 255, 0.1);
	}
`;

export const GameOverOverlay = styled.div`
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	background: rgba(0, 0, 0, 0.8);
	display: flex;
	justify-content: center;
	align-items: center;
	z-index: 1000;
`;

export const GameOverContent = styled.div`
	background: white;
	padding: 2rem;
	border-radius: 8px;
	text-align: center;
	display: flex;
	flex-direction: column;
	gap: 1rem;
`;

export const ModalContainer = styled(Box)`
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	width: 90%;
	max-width: 800px;
	max-height: 90vh;
	background-color: white;
	border-radius: 8px;
	box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
	outline: none;
	display: flex;
	flex-direction: column;
`;

export const ModalHeader = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 16px 24px;
	border-bottom: 1px solid #eee;
`;

export const ManualSection = styled.div`
	padding: 16px 24px;
	overflow-y: auto;

	h6 {
		color: ${(props) => props.theme.palette.primary.main};
		margin-top: 24px;
	}

	p {
		margin: 8px 0;
		line-height: 1.6;
	}
`;

export const EffectList = styled.div`
	display: flex;
	flex-direction: column;
	gap: 4px;
	margin: 8px 0;
	text-align: center;
`;

export const EffectText = styled.div`
	font-size: 0.9rem;
	color: #666;
	padding: 4px;
	background: rgba(0, 0, 0, 0.05);
	border-radius: 4px;

	&:not(:last-child) {
		margin-bottom: 4px;
	}
`;

export const BattlePreview = styled.div`
	background: rgba(0, 0, 0, 0.8);
	padding: 2rem;
	border-radius: 12px;
	text-align: center;
	animation: fadeIn 0.5s ease-in-out;
`;

export const PreviewText = styled.div`
	color: white;
	font-size: 1.5rem;
	margin: 1rem 0;
	text-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
`;

export const ResultText = styled.div`
	font-size: 1.5rem;
	font-weight: bold;
	color: ${(props) => (props.isWinner ? '#4caf50' : '#f44336')};
	margin-top: 1rem;
	text-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
`;

export const NextButton = styled.button`
	margin-top: 20px;
	padding: 12px 24px;
	background: rgba(255, 255, 255, 0.2);
	border: 2px solid rgba(255, 255, 255, 0.5);
	border-radius: 8px;
	color: white;
	font-size: 1.1rem;
	cursor: pointer;
	transition: all 0.2s ease;

	&:hover {
		background: rgba(255, 255, 255, 0.3);
		transform: translateY(-2px);
	}

	&:active {
		transform: translateY(0);
	}
`;
