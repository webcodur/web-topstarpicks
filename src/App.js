// src/App.js
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';

// COPMPONENTS
import MainLayout from 'components/mainLayout/MainLayout';
import Home from 'pages/Home';
import Login from 'pages/Login';
import About from 'pages/About';
import Articles from 'pages/Articles';
import Articles2 from 'pages/Articles2';
import Dummy from 'pages/Dummy';

// react-query
import { QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { queryClient } from './queryClient';

function App() {
	return (
		<BrowserRouter>
			<QueryClientProvider client={queryClient}>
				<Routes>
					<Route path="/" element={<MainLayout />}>
						<Route index element={<Home />} />
						<Route path="/login" element={<Login />} />
						<Route path="/about" element={<About />} />
						<Route path="/articles" element={<Articles />} />
						<Route path="/articles2" element={<Articles2 />} />
						<Route path="/dummy" element={<Dummy />} />
					</Route>
				</Routes>
				<ReactQueryDevtools initialIsOpen={false} />
			</QueryClientProvider>
		</BrowserRouter>
	);
}

export default App;
