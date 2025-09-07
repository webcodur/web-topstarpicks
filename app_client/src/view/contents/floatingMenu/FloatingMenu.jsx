import React from 'react';
import { Menu, X } from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger } from 'components/ui/sheet';

const FloatingMenuComponent = ({
	isOpen,
	onToggle,
	recommendations,
	onItemClick,
}) => (
	<>
		{/* Floating Action Button */}
		<div className="fixed bottom-6 right-6 z-50">
			<button
				onClick={onToggle}
				className="bg-blue-600 hover:bg-blue-700 text-white rounded-full p-4 shadow-lg hover:shadow-xl transition-all duration-200"
				aria-label="menu"
			>
				<Menu className="h-6 w-6" />
			</button>
		</div>

		{/* Drawer/Sheet */}
		{isOpen && (
			<>
				{/* Overlay */}
				<div 
					className="fixed inset-0 bg-black bg-opacity-50 z-40"
					onClick={onToggle}
				/>
				
				{/* Sheet Content */}
				<div className="fixed top-0 right-0 h-full w-80 bg-white dark:bg-gray-800 shadow-xl z-50 transform transition-transform duration-300">
					<div className="flex flex-col h-full">
						{/* Header */}
						<div className="flex justify-between items-center p-4 border-b border-gray-200 dark:border-gray-600">
							<h3 className="text-lg font-semibold text-gray-900 dark:text-white">목차</h3>
							<button
								onClick={onToggle}
								className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded transition-colors duration-200"
							>
								<X className="h-5 w-5" />
							</button>
						</div>
						
						{/* Content */}
						<div className="flex-1 overflow-y-auto">
							<div className="p-2">
								{recommendations.map((recommendation, index) => (
									<div
										key={index}
										onClick={() => {
											onItemClick(index);
											onToggle();
										}}
										className="p-3 hover:bg-gray-100 dark:hover:bg-gray-700 rounded cursor-pointer transition-colors duration-200 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
									>
										{index + 1}. {recommendation.title}
									</div>
								))}
							</div>
						</div>
					</div>
				</div>
			</>
		)}
	</>
);

export default FloatingMenuComponent;
