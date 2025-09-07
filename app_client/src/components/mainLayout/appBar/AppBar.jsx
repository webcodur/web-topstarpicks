import React, { memo, useState } from 'react';
import { motion } from 'framer-motion';
import { Menu, Settings, Wrench } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import SettingsModal from './SettingsModal';
import AdminLoginModal from './AdminLoginModal';
import { Link } from 'react-router-dom';
import { useAtom } from 'jotai';
import { isSidebarOpenAtom } from '../../../store/atom';
import { Button } from '../../ui/button';

/**
 * 애플리케이션의 상단 네비게이션 바 컴포넌트
 *
 * @component
 * @param {Object} props
 * @param {Function} props.toggleSidebar - 사이드바 토글 함수
 *
 * @returns {React.ReactElement} 렌더링된 AppBar 컴포넌트
 */
const AppBar = memo(({ toggleSidebar }) => {
	const [openSettings, setOpenSettings] = useState(false);
	const [openAdminLogin, setOpenAdminLogin] = useState(false);
	const { t } = useTranslation();
	const [, setIsSidebarOpen] = useAtom(isSidebarOpenAtom);

	const handleOpenSettings = () => setOpenSettings(true);
	const handleCloseSettings = () => setOpenSettings(false);

	const handleOpenAdminLogin = () => setOpenAdminLogin(true);
	const handleCloseAdminLogin = () => setOpenAdminLogin(false);

	const handleToggleSidebar = () => {
		setIsSidebarOpen((prev) => !prev);
	};

	return (
		<motion.header 
			className="bg-primary-main text-white shadow-md sticky top-0 z-40"
			initial={{ y: -100 }}
			animate={{ y: 0 }}
			transition={{ type: "spring", stiffness: 100 }}
		>
			<div className="flex items-center justify-between h-16 px-4">
				{/* Menu Button */}
				<div className="flex items-center">
					<Button
						variant="ghost"
						size="icon"
						className="text-white hover:bg-white/10"
						onClick={handleToggleSidebar}
						aria-label="menu"
					>
						<Menu className="h-6 w-6" />
					</Button>
				</div>

				{/* Logo */}
				<Link to="/" className="flex items-center">
					<img 
						src="/logo.png" 
						alt={t('app_name')} 
						className="h-10 w-auto"
					/>
				</Link>

				{/* Settings and Admin Buttons */}
				<div className="flex items-center space-x-2">
					<Button
						variant="ghost"
						size="icon"
						className="text-white hover:bg-white/10"
						onClick={handleOpenSettings}
						aria-label="settings"
					>
						<Settings className="h-5 w-5" />
					</Button>

					<Button
						variant="ghost"
						size="icon"
						className="text-white hover:bg-white/10"
						onClick={handleOpenAdminLogin}
						aria-label="admin"
					>
						<Wrench className="h-5 w-5" />
					</Button>
				</div>

				<SettingsModal open={openSettings} onClose={handleCloseSettings} />
				<AdminLoginModal
					open={openAdminLogin}
					onClose={handleCloseAdminLogin}
				/>
			</div>
		</motion.header>
	);
});

export default AppBar;