import React, { useState, useCallback, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { styles } from './MainLayoutStyles';
import Navbar from './Navbar';
import Drawer from './Drawer';

const MainLayout = React.memo(() => {
	const [isSidebarOpen, setIsSidebarOpen] = useState(false);
	const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

	const toggleSidebar = useCallback(() => {
		setIsSidebarOpen((prev) => !prev);
	}, []);

	const closeMenu = useCallback(() => {
		if (isMobile) {
			setIsSidebarOpen(false);
		}
	}, [isMobile]);

	useEffect(() => {
		const handleResize = () => {
			setIsMobile(window.innerWidth < 768);
		};

		window.addEventListener('resize', handleResize);
		return () => window.removeEventListener('resize', handleResize);
	}, []);

	return (
		<styles.container>
			<Navbar toggleSidebar={toggleSidebar} />
			<styles.contentWrapper>
				<Drawer isOpen={isSidebarOpen} closeMenu={closeMenu} />
				<styles.mainContent sidebarOpen={isSidebarOpen && !isMobile}>
					<Outlet />
				</styles.mainContent>
			</styles.contentWrapper>
		</styles.container>
	);
});

export default MainLayout;
