import styled from '@emotion/styled';
import { Paper } from '@mui/material';

export const SettingsContainer = styled.div`
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

export const BackButton = styled.button`
	padding: 12px 24px;
	background: #2196f3;
	color: white;
	border: none;
	border-radius: 4px;
	cursor: pointer;
	font-size: 1rem;
	transition: background 0.2s;

	&:hover {
		background: #1976d2;
	}
`;

export const SettingsContent = styled(Paper)`
	padding: 32px;
	border-radius: 8px;
`;

export const SettingSection = styled.div`
	margin-bottom: 32px;

	&:last-child {
		margin-bottom: 0;
	}
`;

export const ButtonGroup = styled.div`
	display: flex;
	justify-content: flex-end;
	margin-top: 40px;
`;

export const SaveButton = styled.button`
	padding: 12px 32px;
	background: #4caf50;
	color: white;
	border: none;
	border-radius: 4px;
	cursor: pointer;
	font-size: 1rem;
	transition: background 0.2s;

	&:hover {
		background: #388e3c;
	}
`;
