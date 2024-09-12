import { styled } from '@mui/material/styles';
import { List, ListItemButton } from '@mui/material';

export const StyledList = styled(List)(({ theme }) => ({
	width: '100%',
	padding: theme.spacing(2, 0),
}));

export const StyledListItemButton = styled(ListItemButton)(({ theme }) => ({
	padding: theme.spacing(1, 2),
	'&:hover': {
		backgroundColor: theme.palette.action.hover,
	},
	'& .MuiListItemIcon-root': {
		minWidth: 40,
		color: theme.palette.primary.main,
	},
	'& .menu-text': {
		marginLeft: theme.spacing(2),
	},
}));
