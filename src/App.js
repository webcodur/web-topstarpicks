import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { useAtom } from 'jotai';
import { QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';

import { darkModeAtom } from 'store/atom';
import { queryClient } from './queryClient';
import { lightTheme, darkTheme } from './theme';
import { routes } from './routes';

import MainLayout from 'components/mainLayout/MainLayout';

import './App.css';

function App() {
	const [darkMode] = useAtom(darkModeAtom);

	const theme = darkMode ? darkTheme : lightTheme;

	return (
		<ThemeProvider theme={theme}>
			<CssBaseline />
			<BrowserRouter>
				<QueryClientProvider client={queryClient}>
					<Routes>
						<Route element={<MainLayout />}>
							{routes.map((route) => (
								<Route
									key={route.path}
									path={route.path}
									element={route.element}
								/>
							))}
						</Route>
					</Routes>
					<ReactQueryDevtools initialIsOpen={false} />
				</QueryClientProvider>
			</BrowserRouter>
		</ThemeProvider>
	);
}

export default App;
