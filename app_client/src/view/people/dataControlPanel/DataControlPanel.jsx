import React, { useState } from 'react';
import { Box, IconButton, Tooltip } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useAtom } from 'jotai';
import { menuInfoAtom, viewTypeAtom } from 'store/atom';
import {
	GridView,
	ViewList,
	ViewModule,
	FilterList,
	Sort,
	Visibility,
	Search as SearchIcon,
} from '@mui/icons-material';
import FilterModal from './modals/FilterModal';
import useCelebNumbers from 'hooks/useCelebNumbers';
import { useContentNames } from 'hooks/useContentNames';
import professionIcons from './icons/professionIcons';
import SortModal from './modals/SortModal';
import ViewTypeModal from './modals/ViewTypeModal';
import SearchModal from './modals/SearchModal';

const ControlsContainer = styled(Box)(({ theme }) => ({
	display: 'flex',
	gap: '8px',
	justifyContent: 'center',
	alignItems: 'center',
	padding: '20px',
}));

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
		<ControlsContainer>
			<Tooltip title="필터">
				<IconButton onClick={() => setActiveModal('filter')}>
					<FilterList />
				</IconButton>
			</Tooltip>

			<Tooltip title="정렬">
				<IconButton onClick={() => setActiveModal('sort')}>
					<Sort />
				</IconButton>
			</Tooltip>

			<Tooltip title="보기 방식">
				<IconButton
					disabled={isChanging}
					onClick={() => setActiveModal('viewType')}
					color="default">
					<Visibility />
				</IconButton>
			</Tooltip>

			<Tooltip title="검색">
				<IconButton onClick={() => setActiveModal('search')}>
					<SearchIcon />
				</IconButton>
			</Tooltip>

			<FilterModal
				open={activeModal === 'filter'}
				onClose={handleCloseModal}
				professionList={professionList}
				contentList={contentList}
				eraList={eraList}
				personTypeList={personTypeList}
				menuInfo={menuInfo}
				keepMounted
				container={document.body}
			/>

			<SortModal
				open={activeModal === 'sort'}
				onClose={handleCloseModal}
				sortCriteria={sortCriteria}
				setSortCriteria={setSortCriteria}
				sortOrder={sortOrder}
				setSortOrder={setSortOrder}
				keepMounted
				container={document.body}
			/>

			<SearchModal open={activeModal === 'search'} onClose={handleCloseModal} />

			<ViewTypeModal
				open={activeModal === 'viewType'}
				onClose={handleCloseModal}
				viewType={viewType}
				onViewTypeChange={handleViewTypeChange}
			/>
		</ControlsContainer>
	);
};

export default FilterControls;
