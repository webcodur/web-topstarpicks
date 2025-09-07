import React, { useState } from 'react';
import { useAtom } from 'jotai';
import { menuInfoAtom, viewTypeAtom } from 'store/atom';
import { Filter, ArrowUpDown, Eye, Search } from 'lucide-react';
import FilterModal from './modals/FilterModal';
import useCelebNumbers from 'hooks/useCelebNumbers';
import { useContentNames } from 'hooks/useContentNames';
import professionIcons from './icons/professionIcons';
import SortModal from './modals/SortModal';
import ViewTypeModal from './modals/ViewTypeModal';
import SearchModal from './modals/SearchModal';

const FilterControls = ({
	sortCriteria,
	setSortCriteria,
	sortOrder,
	setSortOrder,
}) => {
	const [menuInfo] = useAtom(menuInfoAtom);
	const [viewType, setViewType] = useAtom(viewTypeAtom);
	const [activeModal, setActiveModal] = useState(null);
	const [isChanging, setIsChanging] = useState(false);

	const handleViewTypeChange = React.useCallback(
		async (newType) => {
			setIsChanging(true);
			setViewType(newType);
			requestAnimationFrame(() => {
				setIsChanging(false);
			});
		},
		[setViewType]
	);

	const handleCloseModal = () => setActiveModal(null);

	const [celebNumbers] = useCelebNumbers();
	const contentNames = useContentNames();

	const professionList = professionIcons
		.filter(({ text }) => text !== '전체')
		.map(({ text, icon }) => {
			const professionCount =
				celebNumbers?.find((item) => item.name === text)?.profession_count || 0;

			return {
				value: text,
				label: `${text} (${professionCount})`,
				icon: icon,
			};
		});

	const contentList =
		contentNames?.map((ele) => ({
			value: ele.name,
			label: ele.name,
			icon: ele.icon,
		})) || [];

	const eraList = [
		{ value: '역사인물', label: '역사인물' },
		{ value: '현대인물', label: '현대인물' },
	];

	const personTypeList = [
		{ value: 'real', label: '실존인물' },
		{ value: 'legend', label: '가상인물' },
	];

	return (
		<div className="flex gap-2 justify-center items-center p-5">
			<div className="relative group">
				<button 
					onClick={() => setActiveModal('filter')}
					className="p-3 rounded-full bg-white shadow-md hover:shadow-lg transition-shadow duration-200 group-hover:bg-gray-50"
					title="필터"
				>
					<Filter className="w-5 h-5 text-gray-600" />
				</button>
				<div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
					필터
				</div>
			</div>

			<div className="relative group">
				<button 
					onClick={() => setActiveModal('sort')}
					className="p-3 rounded-full bg-white shadow-md hover:shadow-lg transition-shadow duration-200 group-hover:bg-gray-50"
					title="정렬"
				>
					<ArrowUpDown className="w-5 h-5 text-gray-600" />
				</button>
				<div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
					정렬
				</div>
			</div>

			<div className="relative group">
				<button 
					disabled={isChanging}
					onClick={() => setActiveModal('viewType')}
					className={`p-3 rounded-full bg-white shadow-md hover:shadow-lg transition-shadow duration-200 ${
						isChanging 
							? 'opacity-50 cursor-not-allowed' 
							: 'group-hover:bg-gray-50'
					}`}
					title="보기 방식"
				>
					<Eye className="w-5 h-5 text-gray-600" />
				</button>
				<div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
					보기 방식
				</div>
			</div>

			<div className="relative group">
				<button 
					onClick={() => setActiveModal('search')}
					className="p-3 rounded-full bg-white shadow-md hover:shadow-lg transition-shadow duration-200 group-hover:bg-gray-50"
					title="검색"
				>
					<Search className="w-5 h-5 text-gray-600" />
				</button>
				<div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
					검색
				</div>
			</div>

			<FilterModal
				open={activeModal === 'filter'}
				onClose={handleCloseModal}
				professionList={professionList}
				contentList={contentList}
				eraList={eraList}
				personTypeList={personTypeList}
				menuInfo={menuInfo}
			/>

			<SortModal
				open={activeModal === 'sort'}
				onClose={handleCloseModal}
				sortCriteria={sortCriteria}
				setSortCriteria={setSortCriteria}
				sortOrder={sortOrder}
				setSortOrder={setSortOrder}
			/>

			<SearchModal open={activeModal === 'search'} onClose={handleCloseModal} />

			<ViewTypeModal
				open={activeModal === 'viewType'}
				onClose={handleCloseModal}
				viewType={viewType}
				onViewTypeChange={handleViewTypeChange}
			/>
		</div>
	);
};

export default FilterControls;