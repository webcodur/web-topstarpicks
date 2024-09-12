// AppBarStyles.js
import styled from '@emotion/styled';
import { Paper } from '@mui/material';

export const SettingsModalContainer = styled(Paper)(({ theme }) => ({
	position: 'absolute',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	width: 400,
	padding: theme.spacing(4),
	borderRadius: theme.shape.borderRadius,
}));

export const SettingsModalHeader = styled('div')(({ theme }) => ({
	display: 'flex',
	justifyContent: 'space-between',
	alignItems: 'center',
	marginBottom: theme.spacing(2),
}));

export const LanguageSelectWrapper = styled('div')(({ theme }) => ({
	marginTop: theme.spacing(2),
}));
