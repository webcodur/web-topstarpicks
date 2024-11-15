import React, { useState, useCallback, useEffect } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { useAtom } from 'jotai';
import { showContentAtom, profDataLoadedAtom } from '../../store/atom';
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
	const location = useLocation();
	const isHomePage = location.pathname === '/';
	const [showContent] = useAtom(showContentAtom);
	const [profDataLoaded] = useAtom(profDataLoadedAtom);

	useEffect(() => {
		if (isHomePage && isSidebarOpen) {
			setIsSidebarOpen(false);
		}
	}, [location, isHomePage, isSidebarOpen]);

	const toggleSidebar = useCallback(() => {
		setIsSidebarOpen((prev) => !prev);
	}, []);

	const closeMenu = useCallback(() => {
		setIsSidebarOpen((prev) => !prev);
	}, []);

	useEffect(() => {
		const handleKeyDown = (event) => {
			if (event.ctrlKey && event.altKey && event.key === 'q') {
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
			{!isHomePage && showContent && profDataLoaded && (
				<AppBar toggleSidebar={toggleSidebar} />
			)}
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
