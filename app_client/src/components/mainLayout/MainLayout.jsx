import React, { useState, useCallback, useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import AppBar from './appBar/AppBar';
import Drawer from './drawer/Drawer';
import {
	RootContainer,
	ContentWrapper,
	MainContent,
	StyledDrawer,
} from './MainLayoutStyles';

const MainLayout = React.memo(() => {
	const [isSidebarOpen, setIsSidebarOpen] = useState(false);
	const navigate = useNavigate();

	const toggleSidebar = useCallback(() => {
		setIsSidebarOpen((prev) => !prev);
	}, []);

	const closeMenu = useCallback(() => {
		setIsSidebarOpen((prev) => !prev);
	}, []);

	useEffect(() => {
		const handleKeyDown = (event) => {
			if (event.ctrlKey && event.key === 'q') {
				event.preventDefault();
				navigate('/admin');
			}
			if (event.ctrlKey && event.key === 'g') {
				event.preventDefault();
				navigate('/');
			}
		};

		window.addEventListener('keydown', handleKeyDown);

		return () => {
			window.removeEventListener('keydown', handleKeyDown);
		};
	}, [navigate]);

	return (
		<RootContainer>
			<AppBar toggleSidebar={toggleSidebar} />
			<ContentWrapper>
				<StyledDrawer open={isSidebarOpen}>
					<Drawer isOpen={isSidebarOpen} closeMenu={closeMenu} />
				</StyledDrawer>
				<MainContent open={isSidebarOpen}>
					<Outlet />
				</MainContent>
			</ContentWrapper>
		</RootContainer>
	);
});

export default MainLayout;
