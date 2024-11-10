import styled from '@emotion/styled';
import { Paper } from '@mui/material';
import { motion } from 'framer-motion';

// motion 컴포넌트 생성
const MotionPaper = motion.create(Paper);
const MotionDiv = motion.create('div');

export const ManualContainer = styled.div`
	min-height: 100vh;
	padding: 40px 0;
	background: #f5f5f5;
`;

export const Header = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin-bottom: 40px;
`;

export const TitleWrapper = styled(MotionDiv)`
	display: flex;
	flex-direction: column;
	gap: 8px;
`;

export const BackButton = styled.button`
	padding: 12px 24px;
	background: #2196f3;
	color: white;
	border: none;
	border-radius: 4px;
	cursor: pointer;
	font-size: 1rem;
	transition: all 0.2s;

	&:hover {
		background: #1976d2;
	}
`;

export const ContentGrid = styled(MotionDiv)`
	display: grid;
	grid-template-columns: repeat(auto-fit, minmax(500px, 1fr));
	gap: 24px;
`;

export const ManualCard = styled(MotionPaper)`
	padding: 24px;
	height: 100%;
	display: flex;
	flex-direction: column;

	&:hover {
		transform: translateY(-4px);
		transition: transform 0.2s ease;
	}
`;

export const CardHeader = styled.div`
	display: flex;
	align-items: center;
	gap: 16px;
	margin-bottom: 24px;
	padding-bottom: 16px;
	border-bottom: 2px solid #eee;
`;

export const IconWrapper = styled.div`
	font-size: 2rem;
`;

export const CardContent = styled.div`
	flex: 1;
`;

export const FeatureList = styled.ul`
	margin: 0;
	padding-left: 20px;

	li {
		margin-bottom: 8px;
		line-height: 1.5;
	}
`;

export const RankTable = styled.div`
	margin-top: 20px;
	border: 1px solid #eee;
	border-radius: 8px;
	overflow: hidden;
`;

export const TableHeader = styled.div`
	display: grid;
	grid-template-columns: 1fr 1fr;
	background: #f5f5f5;
	padding: 12px;
	font-weight: bold;
	text-align: center;
`;

export const TableRow = styled.div`
	display: grid;
	grid-template-columns: 1fr 1fr;
	padding: 12px;
	border-top: 1px solid #eee;
	text-align: center;
`;

export const RankCell = styled.div`
	color: ${(props) => {
		switch (props.rank) {
			case 'S':
				return '#FF4081';
			case 'A':
				return '#FF9100';
			case 'B':
				return '#2196F3';
			case 'C':
				return '#4CAF50';
			case 'D':
				return '#757575';
			default:
				return 'inherit';
		}
	}};
	font-weight: bold;
`;

export const ActionGrid = styled.div`
	display: grid;
	grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
	gap: 16px;
`;

export const ActionBox = styled.div`
	padding: 16px;
	border-radius: 8px;
	background: ${(props) => {
		switch (props.type) {
			case 'rule':
				return 'rgba(33, 150, 243, 0.1)';
			case 'diplomacy':
				return 'rgba(76, 175, 80, 0.1)';
			case 'battle':
				return 'rgba(244, 67, 54, 0.1)';
			case 'strategy':
				return 'rgba(255, 152, 0, 0.1)';
			default:
				return 'inherit';
		}
	}};
	border: 2px solid
		${(props) => {
			switch (props.type) {
				case 'rule':
					return '#2196F3';
				case 'diplomacy':
					return '#4CAF50';
				case 'battle':
					return '#F44336';
				case 'strategy':
					return '#FF9800';
				default:
					return '#ddd';
			}
		}};
	text-align: center;
`;

export const ActionEffect = styled.div`
	margin-top: 8px;
	font-size: 0.875rem;
	color: #666;
`;

export const TopicInfo = styled.div`
	display: grid;
	grid-template-columns: 1fr auto;
	gap: 24px;
`;

export const TopicExample = styled.div`
	padding: 16px;
	background: #fff;
	border-radius: 8px;
	border: 1px solid #eee;
`;

export const TopicBox = styled.div`
	padding: 8px 16px;
	margin-bottom: 8px;
	border-radius: 4px;
	background: ${(props) =>
		props.next ? 'rgba(244, 67, 54, 0.1)' : 'rgba(33, 150, 243, 0.1)'};
	color: ${(props) => (props.next ? '#F44336' : '#2196F3')};
	font-weight: bold;

	&:last-child {
		margin-bottom: 0;
	}
`;

export const JobBonusGrid = styled.div`
	display: grid;
	grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
	gap: 20px;
	margin-top: 10px;
`;

export const JobBonusBox = styled.div`
	background: #f8f9fa;
	border-radius: 8px;
	padding: 15px;
	box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);

	h6 {
		margin-bottom: 10px;
		color: #1976d2;
	}
`;

export const BonusList = styled.ul`
	list-style: none;
	padding: 0;
	margin: 0;

	li {
		padding: 4px 0;
		font-size: 0.9rem;
		color: #666;
		display: flex;
		align-items: center;

		&:before {
			content: '•';
			color: #1976d2;
			margin-right: 8px;
		}
	}
`;

export const BonusTable = styled.div`
	width: 100%;
	border-collapse: collapse;
	font-family: monospace;
	background: #2c3e50;
	color: #ecf0f1;
	border-radius: 8px;
	overflow: hidden;
	box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`;

export const BonusTableRow = styled.div`
	display: grid;
	grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
	text-align: center;
	border-bottom: 1px solid #34495e;

	& > div {
		padding: 8px;
		border-right: 1px solid #34495e;

		&:last-child {
			border-right: none;
		}
	}
`;

export const BonusCell = styled.div`
	color: ${(props) => {
		if (props.children === '---') return '#95a5a6';
		if (props.children.includes('+')) return '#2ecc71';
		if (props.children.includes('-')) return '#e74c3c';
		return '#ecf0f1';
	}};
	font-weight: 500;
`;

export const JobEffectGrid = styled.div`
	display: grid;
	grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
	gap: 16px;
	padding: 16px 0;
`;

export const JobEffectBox = styled.div`
	background: #f8f9fa;
	border-radius: 8px;
	padding: 16px;
	border: 1px solid #e9ecef;
	transition: all 0.2s ease;

	&:hover {
		transform: translateY(-2px);
		box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
	}
`;

export const JobTitle = styled.h4`
	margin: 0 0 8px 0;
	color: ${(props) => props.theme.palette.primary.main};
	font-size: 1.1rem;
	font-weight: 600;
`;

export const EffectName = styled.h5`
	margin: 0 0 4px 0;
	color: ${(props) => props.theme.palette.secondary.main};
	font-size: 1rem;
	font-weight: 500;
`;

export const EffectDescription = styled.p`
	margin: 0;
	color: #666;
	font-size: 0.9rem;
	line-height: 1.4;
`;
