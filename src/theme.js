// src/theme.js
import { createTheme } from '@mui/material/styles';

const lightTheme = createTheme({
	palette: {
		mode: 'light',
		primary: {
			main: '#3f51b5',
		},
		secondary: {
			main: '#f50057',
		},
		background: {
			default: '#f8f9fa',
			paper: '#ffffff',
		},
	},
});

const darkTheme = createTheme({
	palette: {
		mode: 'dark',
		primary: {
			main: '#90caf9',
		},
		secondary: {
			main: '#f48fb1',
		},
		background: {
			default: '#303030',
			paper: '#424242',
		},
	},
});

export { lightTheme, darkTheme };
