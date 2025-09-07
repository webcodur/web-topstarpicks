import React from 'react';
import { Grid3X3, List, UserCircle } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from 'components/ui/dialog';
import { Button } from 'components/ui/button';


const ViewTypeModal = ({
	open,
	onClose,
	currentViewType,
	onViewTypeChange,
}) => {
	const handleViewTypeSelect = (viewType) => {
		onViewTypeChange(viewType);
		onClose();
	};

	return (
		<Dialog open={open} onOpenChange={(isOpen) => !isOpen && onClose()}>
			<DialogContent className="max-w-2xl">
				<DialogHeader>
					<DialogTitle>보기 방식 선택</DialogTitle>
				</DialogHeader>

				<div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4">
					{/* 초상화 그리드 */}
					<button
						onClick={() => handleViewTypeSelect('grid')}
						className={`w-full h-32 flex flex-col items-center justify-center gap-2 p-4 rounded-lg border-2 transition-all ${
							currentViewType === 'grid'
								? 'border-blue-600 bg-blue-50 text-blue-600 dark:bg-blue-950 dark:text-blue-400'
								: 'border-gray-300 text-gray-700 hover:border-gray-400 dark:border-gray-600 dark:text-gray-300 dark:hover:border-gray-500'
						}`}
					>
						<Grid3X3 className="w-10 h-10" />
						<div className="text-base font-medium">초상화 그리드</div>
					</button>

					{/* 아이콘 보기 (비활성화) */}
					<div className="w-full h-32 flex flex-col items-center justify-center gap-1 p-4 rounded-lg border-2 border-gray-200 text-gray-400 opacity-50 dark:border-gray-700 dark:text-gray-600">
						<UserCircle className="w-10 h-10" />
						<div className="text-base font-medium">아이콘 보기</div>
						<div className="text-xs text-gray-400">현재 사용할 수 없습니다</div>
					</div>

					{/* 리스트 보기 (비활성화) */}
					<div className="w-full h-32 flex flex-col items-center justify-center gap-1 p-4 rounded-lg border-2 border-gray-200 text-gray-400 opacity-50 dark:border-gray-700 dark:text-gray-600">
						<List className="w-10 h-10" />
						<div className="text-base font-medium">리스트 보기</div>
						<div className="text-xs text-gray-400">현재 사용할 수 없습니다</div>
					</div>
				</div>

				<DialogFooter>
					<Button variant="outline" onClick={onClose}>
						닫기
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
};

export default ViewTypeModal;
