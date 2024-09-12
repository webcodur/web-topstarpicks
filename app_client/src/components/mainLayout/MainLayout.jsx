import React, { useState, useCallback } from 'react';
import { Outlet } from 'react-router-dom';
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

	const toggleSidebar = useCallback(() => {
		setIsSidebarOpen((prev) => !prev);
	}, []);

	const closeMenu = useCallback(() => {
		// setIsSidebarOpen((prev) => !prev);
	}, []);

	return (
		<RootContainer>
			<AppBar toggleSidebar={toggleSidebar} />
			<ContentWrapper>
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
