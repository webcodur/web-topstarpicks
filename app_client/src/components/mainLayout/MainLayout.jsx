import React, { useCallback, useEffect } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { useAtom } from 'jotai';
import { motion, AnimatePresence } from 'framer-motion';
import {
	profDataLoadedAtom,
	isSidebarOpenAtom,
	isAppBarOpenAtom,
} from 'store/atom';
import AppBar from './appBar/AppBar';
import Drawer from './drawer/Drawer';
import { cn } from '../../lib/utils';
import { Sheet, SheetContent } from '../ui/sheet';

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
		<div className="min-h-screen bg-gray-50 dark:bg-gray-900">
			{/* AppBar */}
			<AnimatePresence>
				{isAppBarOpen && <AppBar toggleSidebar={toggleSidebar} />}
			</AnimatePresence>

			{/* Content Wrapper */}
			<div className={cn(
				"flex relative",
				isAppBarOpen ? "pt-16" : ""
			)}>
				{/* Sidebar Sheet */}
				<Sheet open={isSidebarOpen} onOpenChange={setIsSidebarOpen}>
					<SheetContent side="left" className="w-64 p-0">
						<Drawer isOpen={isSidebarOpen} closeMenu={closeMenu} />
					</SheetContent>
				</Sheet>

				{/* Main Content */}
				<motion.main 
					className="flex-1 w-full"
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ duration: 0.3 }}
				>
					<div className="container mx-auto px-4 py-6">
						<Outlet />
					</div>
				</motion.main>
			</div>
		</div>
	);
});

export default MainLayout;