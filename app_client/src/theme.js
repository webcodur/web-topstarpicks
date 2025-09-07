// src/theme.js
// Tailwind CSS theme configuration - colors used in tailwind.config.js

export const colors = {
	light: {
		primary: {
			main: '#3f51b5',
			light: '#6573c3',
			dark: '#2c3e8c',
		},
		secondary: {
			main: '#f50057',
			light: '#f73378',
			dark: '#ab003c',
		},
		background: {
			default: '#f8f9fa',
			paper: '#ffffff',
		},
		text: {
			primary: '#212529',
			secondary: '#6c757d',
		},
	},
	dark: {
		primary: {
			main: '#90caf9',
			light: '#afd8fb',
			dark: '#648dae',
		},
		secondary: {
			main: '#f48fb1',
			light: '#f6a5c0',
			dark: '#aa647b',
		},
		background: {
			default: '#303030',
			paper: '#424242',
		},
		text: {
			primary: '#ffffff',
			secondary: '#b3b3b3',
		},
	},
};

// Helper functions for theme usage
export const getThemeColor = (darkMode, colorPath) => {
	const theme = darkMode ? colors.dark : colors.light;
	const paths = colorPath.split('.');
	return paths.reduce((obj, path) => obj?.[path], theme);
};