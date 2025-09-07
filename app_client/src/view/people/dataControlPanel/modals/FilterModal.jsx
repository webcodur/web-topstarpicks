import React, { useState, useEffect, useRef } from 'react';
import { useAtom } from 'jotai';
import { professionNameAtom, contentNameAtom, timesNameAtom } from 'store/atom';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from 'components/ui/dialog';
import { Button } from 'components/ui/button';
import { Separator } from 'components/ui/separator';


const FilterModal = ({
	open,
	onClose,
	professionList,
	contentList,
	eraList,
	personTypeList,
	menuInfo,
}) => {
	const [profession, setProfession] = useAtom(professionNameAtom);
	const [contentName, setContentName] = useAtom(contentNameAtom);
	const [timesName, setTimesName] = useAtom(timesNameAtom);

	const [tempProfession, setTempProfession] = useState('');
	const [tempContent, setTempContent] = useState('');
	const [tempEra, setTempEra] = useState('');
	const [tempPersonType, setTempPersonType] = useState('');
	const [personType, setPersonType] = useState('');

	// 모달을 열기 전 포커스된 요소를 저장할 ref
	const previousFocus = useRef(null);

	useEffect(() => {
		if (open) {
			setTempProfession(profession);
			setTempContent(contentName);
			setTempEra(timesName);
			setTempPersonType(personType);
			// 모달이 열릴 때 현재 포커스된 요소 저장
			previousFocus.current = document.activeElement;
		}
	}, [open, profession, contentName, timesName, personType]);

	const handleProfessionClick = (value) => {
		setTempProfession(tempProfession === value ? '' : value);
	};

	const handleContentClick = (value) => {
		setTempContent(tempContent === value ? '' : value);
	};

	const handleEraClick = (value) => {
		setTempEra(tempEra === value ? '' : value);
	};

	const handlePersonTypeClick = (value) => {
		setTempPersonType(tempPersonType === value ? '' : value);
	};

	const handleCancel = () => {
		// 모달이 닫힐 때 이전에 포커스된 요소로 포커스 반환
		if (previousFocus.current) {
			previousFocus.current.focus();
		}
		onClose();
	};

	const handleConfirm = () => {
		setProfession(tempProfession);
		setContentName(tempContent);
		setTimesName(tempEra);
		setPersonType(tempPersonType);
		// 모달이 닫힐 때 이전에 포커스된 요소로 포커스 반환
		if (previousFocus.current) {
			previousFocus.current.focus();
		}
		onClose();
	};

	return (
		<Dialog open={open} onOpenChange={(isOpen) => !isOpen && handleCancel()}>
			<DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
				<DialogHeader>
					<DialogTitle>필터 설정</DialogTitle>
				</DialogHeader>

				{/* 직군 섹션 */}
				<div className="mb-6">
					<h3 className="text-lg font-semibold mb-2">직군</h3>
					<Separator className="mb-4" />
					<div className="flex flex-wrap gap-2 p-2">
						{professionList?.map((item) => (
							<button
								key={item.value}
								onClick={() => handleProfessionClick(item.value)}
								className={`inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
									tempProfession === item.value
										? 'bg-blue-600 text-white hover:bg-blue-700'
										: 'bg-gray-100 text-gray-700 border border-gray-300 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-700'
								}`}
							>
								{item.icon && <span className="mr-1">{item.icon}</span>}
								{item.label}
							</button>
						))}
					</div>
				</div>

				{/* 컨텐츠 섹션 */}
				{menuInfo === '추천정보' && (
					<div className="mb-6">
						<h3 className="text-lg font-semibold mb-2">컨텐츠</h3>
						<Separator className="mb-4" />
						<div className="flex flex-wrap gap-2 p-2">
							{contentList?.map((item) => (
								<button
									key={item.value}
									onClick={() => handleContentClick(item.value)}
									className={`inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
										tempContent === item.value
											? 'bg-blue-600 text-white hover:bg-blue-700'
											: 'bg-gray-100 text-gray-700 border border-gray-300 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-700'
									}`}
								>
									{item.label}
								</button>
							))}
						</div>
					</div>
				)}

				{/* 시대 섹션 */}
				<div className="mb-6">
					<h3 className="text-lg font-semibold mb-2">시대</h3>
					<Separator className="mb-4" />
					<div className="flex flex-wrap gap-2 p-2">
						{eraList?.map((item) => (
							<button
								key={item.value}
								onClick={() => handleEraClick(item.value)}
								className={`inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
									tempEra === item.value
										? 'bg-blue-600 text-white hover:bg-blue-700'
										: 'bg-gray-100 text-gray-700 border border-gray-300 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-700'
								}`}
							>
								{item.label}
							</button>
						))}
					</div>
				</div>

				{/* 인물 유형 섹션 */}
				{(menuInfo === '인물도감' || menuInfo === '전설도감') && (
					<div className="mb-6">
						<h3 className="text-lg font-semibold mb-2">인물 유형</h3>
						<Separator className="mb-4" />
						<div className="flex flex-wrap gap-2 p-2">
							{personTypeList?.map((item) => (
								<button
									key={item.value}
									onClick={() => handlePersonTypeClick(item.value)}
									className={`inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
										tempPersonType === item.value
											? 'bg-blue-600 text-white hover:bg-blue-700'
											: 'bg-gray-100 text-gray-700 border border-gray-300 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-700'
									}`}
								>
									{item.label}
								</button>
							))}
						</div>
					</div>
				)}

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

export default FilterModal;
