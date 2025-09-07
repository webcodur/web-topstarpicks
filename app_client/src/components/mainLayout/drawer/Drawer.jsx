import React, { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAtom } from 'jotai';
import { menuInfoAtom } from 'store/atom';
import { cn } from '../../../lib/utils';

import navi_contents from './navigationIcons_contents';
import navi_service from './navigationIcons_service';

const Drawer = React.memo(({ closeMenu }) => {
	const [, setMenuInfo] = useAtom(menuInfoAtom);
	const navigate = useNavigate();
	
	const handleNavigate = useCallback(
		(to, text) => {
			setMenuInfo(text);
			navigate(`${to}`);
			closeMenu();
		},
		[navigate, closeMenu, setMenuInfo]
	);

	return (
		<div className="flex flex-col h-full bg-white dark:bg-gray-800">
			{/* 컨텐츠 메뉴 */}
			<div className="flex-1">
				<div className="py-4">
					{navi_contents.map(({ text, to, icon }) => (
						<button
							key={`${text}-${to}`}
							onClick={() => handleNavigate(to, text)}
							className={cn(
								"w-full flex items-center px-6 py-3",
								"text-gray-700 dark:text-gray-200",
								"hover:bg-gray-100 dark:hover:bg-gray-700",
								"transition-colors duration-200"
							)}
						>
							<span className="mr-4 text-gray-600 dark:text-gray-400">
								{icon}
							</span>
							<span className="text-base font-medium">{text}</span>
						</button>
					))}
				</div>
				
				{/* 구분선 */}
				<div className="mx-6 my-2">
					<hr className="border-gray-300 dark:border-gray-600" />
				</div>

				{/* 안내 메뉴 */}
				<div className="py-4">
					{navi_service.map(({ text, to, icon }) => (
						<button
							key={`${text}-${to}`}
							onClick={() => handleNavigate(to, text)}
							className={cn(
								"w-full flex items-center px-6 py-3",
								"text-gray-700 dark:text-gray-200",
								"hover:bg-gray-100 dark:hover:bg-gray-700",
								"transition-colors duration-200"
							)}
						>
							<span className="mr-4 text-gray-600 dark:text-gray-400">
								{icon}
							</span>
							<span className="text-base font-medium">{text}</span>
						</button>
					))}
				</div>
			</div>
		</div>
	);
});

Drawer.displayName = 'Drawer';

export default Drawer;