import React, { useState, useEffect, useRef } from 'react';
import { ArrowUp, ArrowDown, RotateCcw } from 'lucide-react';
import { sortIcons } from '../icons/sortIcons';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from 'components/ui/dialog';
import { Button } from 'components/ui/button';
import { Separator } from 'components/ui/separator';


// 기본 정렬 설정
const DEFAULT_SORT = {
	criteria: 'influence',
	order: 'desc',
};

const SortModal = ({
	open,
	onClose,
	sortCriteria,
	setSortCriteria,
	sortOrder,
	setSortOrder,
}) => {
	const [tempSortCriteria, setTempSortCriteria] = useState(sortCriteria);
	const [tempSortOrder, setTempSortOrder] = useState(sortOrder);

	const previousFocus = useRef(null);

	useEffect(() => {
		if (open) {
			previousFocus.current = document.activeElement;
		}
	}, [open]);

	useEffect(() => {
		if (open) {
			setTempSortCriteria(sortCriteria);
			setTempSortOrder(sortOrder);
		}
	}, [open, sortCriteria, sortOrder]);

	const handleSortClick = (value) => {
		setTempSortCriteria(value);
	};

	const handleOrderChange = (_, newOrder) => {
		if (newOrder !== null) {
			setTempSortOrder(newOrder);
		}
	};

	const handleReset = () => {
		setTempSortCriteria(DEFAULT_SORT.criteria);
		setTempSortOrder(DEFAULT_SORT.order);
	};

	const handleCancel = () => {
		if (previousFocus.current) {
			previousFocus.current.focus();
		}
		onClose();
	};

	const handleConfirm = () => {
		setSortCriteria(tempSortCriteria);
		setSortOrder(tempSortOrder);
		if (previousFocus.current) {
			previousFocus.current.focus();
		}
		onClose();
	};

	return (
		<Dialog open={open} onOpenChange={(isOpen) => !isOpen && handleCancel()}>
			<DialogContent className="max-w-md">
				<DialogHeader>
					<DialogTitle>정렬 설정</DialogTitle>
				</DialogHeader>

				<div className="flex justify-end mb-4">
					<Button
						variant="outline"
						size="sm"
						onClick={handleReset}
						className="flex items-center gap-2"
					>
						<RotateCcw className="w-4 h-4" />
						초기화
					</Button>
				</div>

				{/* 정렬 기준 섹션 */}
				<div className="mb-6">
					<h3 className="text-lg font-semibold mb-2">정렬 기준</h3>
					<Separator className="mb-4" />
					<div className="flex flex-wrap gap-2 p-2">
						{sortIcons.map(({ value, label, icon: Icon }) => (
							<button
								key={value}
								onClick={() => handleSortClick(value)}
								className={`inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
									tempSortCriteria === value
										? 'bg-blue-600 text-white hover:bg-blue-700'
										: 'bg-gray-100 text-gray-700 border border-gray-300 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-700'
								}`}
							>
								<Icon className="w-4 h-4 mr-1" />
								{label}
							</button>
						))}
					</div>
				</div>

				{/* 정렬 순서 섹션 */}
				<div className="mb-6">
					<h3 className="text-lg font-semibold mb-2 text-center">정렬 순서</h3>
					<Separator className="mb-4" />
					<div className="flex justify-center gap-2 mt-2">
						<button
							onClick={() => setTempSortOrder('asc')}
							className={`flex items-center px-4 py-2 rounded-lg font-medium transition-colors ${
								tempSortOrder === 'asc'
									? 'bg-blue-600 text-white hover:bg-blue-700'
									: 'bg-gray-100 text-gray-700 border border-gray-300 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-700'
							}`}
							aria-label="오름차순"
						>
							<ArrowUp className="w-4 h-4 mr-2" />
							오름차순
						</button>
						<button
							onClick={() => setTempSortOrder('desc')}
							className={`flex items-center px-4 py-2 rounded-lg font-medium transition-colors ${
								tempSortOrder === 'desc'
									? 'bg-blue-600 text-white hover:bg-blue-700'
									: 'bg-gray-100 text-gray-700 border border-gray-300 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-700'
							}`}
							aria-label="내림차순"
						>
							<ArrowDown className="w-4 h-4 mr-2" />
							내림차순
						</button>
					</div>
				</div>

				<DialogFooter>
					<Button variant="outline" onClick={handleCancel}>
						취소
					</Button>
					<Button onClick={handleConfirm}>
						확인
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
};

export default SortModal;
