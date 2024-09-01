import { styled } from '@mui/material/styles';
import { Paper, TextField, Button } from '@mui/material';

export const StyledPaper = styled(Paper)(({ theme }) => ({
	padding: theme.spacing(3),
	margin: theme.spacing(3, 0),
	display: 'flex',
	flexDirection: 'column',
	alignItems: 'center',
	justifyContent: 'center',
}));

export const StyledForm = styled('form')(({ theme }) => ({
	display: 'flex',
	flexDirection: 'column',
	gap: theme.spacing(2),
	marginBottom: theme.spacing(3),
}));

export const StyledTextField = styled(TextField)({
	minWidth: '400px',
});

export const StyledButton = styled(Button)(({ theme }) => ({
	marginRight: theme.spacing(1),
}));

export const ArticleItem = styled('div')(({ theme }) => ({
	width: '700px',
	wordBreak: 'break-all',
	marginBottom: theme.spacing(2),
	padding: theme.spacing(2),
	border: `1px solid ${theme.palette.divider}`,
	borderRadius: theme.shape.borderRadius,
}));
