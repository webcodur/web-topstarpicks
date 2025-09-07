import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useAtom } from 'jotai';
import { QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';

import { darkModeAtom } from 'store/atom';
import { queryClient } from './queryClient';
import { routes } from './routes';

import MainLayout from 'components/mainLayout/MainLayout';

import './App.css';

function App() {
	const [darkMode] = useAtom(darkModeAtom);

	useEffect(() => {
		if (darkMode) {
			document.documentElement.classList.add('dark');
		} else {
			document.documentElement.classList.remove('dark');
		}
	}, [darkMode]);

	return (
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
	);
}

export default App;
