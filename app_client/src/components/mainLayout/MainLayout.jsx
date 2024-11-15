import React, { useCallback, useEffect } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { useAtom } from 'jotai';
import {
	profDataLoadedAtom,
	isSidebarOpenAtom,
	isAppBarOpenAtom,
} from 'store/atom';
import AppBar from './appBar/AppBar';
import Drawer from './drawer/Drawer';
import {
	RootContainer,
	ContentWrapper,
	MainContent,
	StyledDrawer,
} from './MainLayoutStyles';

const MainLayout = React.memo(() => {
	const navigate = useNavigate();
	const location = useLocation();
	const path = location.pathname;
	const isHomePage = location.pathname === '/';

	const [isSidebarOpen, setIsSidebarOpen] = useAtom(isSidebarOpenAtom);
	const [isAppBarOpen, setIsAppBarOpen] = useAtom(isAppBarOpenAtom);

	const [profDataLoaded] = useAtom(profDataLoadedAtom);

	useEffect(() => {
		if (path.includes('people')) {
			setIsAppBarOpen(profDataLoaded);
		} else if (path === '/') {
			setIsAppBarOpen(false);
		} else{
      setIsAppBarOpen(true);
    }
	}, [profDataLoaded, setIsAppBarOpen, path]);

	useEffect(() => {
		if (isHomePage && isSidebarOpen) {
			setIsSidebarOpen(false);
		}
	}, [location, isHomePage, isSidebarOpen, setIsSidebarOpen]);

	const toggleSidebar = useCallback(() => {
		setIsSidebarOpen((prev) => !prev);
	}, [setIsSidebarOpen]);

	const closeMenu = useCallback(() => {
		setIsSidebarOpen(false);
	}, [setIsSidebarOpen]);

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
			{isAppBarOpen && <AppBar toggleSidebar={toggleSidebar} />}
			<ContentWrapper hasAppBar={isAppBarOpen}>
				<StyledDrawer open={isSidebarOpen}>
					<Drawer isOpen={isSidebarOpen} closeMenu={closeMenu} />
				</StyledDrawer>
				<MainContent>
					<Outlet />
				</MainContent>
			</ContentWrapper>
		</RootContainer>
	);
});

export default MainLayout;
