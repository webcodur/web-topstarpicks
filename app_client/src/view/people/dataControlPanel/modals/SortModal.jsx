import React, { useState, useEffect, useRef } from 'react';
import {
	Dialog,
	DialogTitle,
	DialogContent,
	DialogActions,
	List,
	ListItem,
	Chip,
	Typography,
	Box,
	Divider,
	Button,
	ToggleButton,
	ToggleButtonGroup,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { ArrowUpward, ArrowDownward, RestartAlt } from '@mui/icons-material';
import { sortIcons } from '../icons/sortIcons';

const StyledDialog = styled(Dialog)(({ theme }) => ({
	'& .MuiDialogContent-root': {
		padding: theme.spacing(3),
	},
	'& .MuiList-root': {
		display: 'flex',
		flexWrap: 'wrap',
		gap: theme.spacing(1),
		padding: theme.spacing(2),
	},
	'& .MuiListItem-root': {
		width: 'auto',
		padding: 0,
	},
}));

const SortSection = styled(Box)(({ theme }) => ({
	marginBottom: theme.spacing(3),
}));

const OrderToggleGroup = styled(ToggleButtonGroup)(({ theme }) => ({
	display: 'flex',
	justifyContent: 'center',
	marginTop: theme.spacing(2),
	'& .MuiToggleButton-root': {
		padding: theme.spacing(1, 3),
	},
}));

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
		<StyledDialog
			open={open}
			onClose={handleCancel}
			maxWidth="sm"
			fullWidth
			disableEnforceFocus
			disableAutoFocus
			keepMounted={false}>
			<DialogTitle>정렬 설정</DialogTitle>
			<DialogContent>
				<Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
					<Button
						startIcon={<RestartAlt />}
						onClick={handleReset}
						color="inherit"
						size="small">
						초기화
					</Button>
				</Box>

				<SortSection>
					<Typography variant="h6" gutterBottom>
						정렬 기준
					</Typography>
					<Divider />
					<List>
						{sortIcons.map(({ value, label, icon: Icon }) => (
							<ListItem key={value}>
								<Chip
									icon={<Icon />}
									label={label}
									onClick={() => handleSortClick(value)}
									color={tempSortCriteria === value ? 'primary' : 'default'}
									variant={tempSortCriteria === value ? 'filled' : 'outlined'}
								/>
							</ListItem>
						))}
					</List>
				</SortSection>

				<SortSection>
					<Typography variant="h6" gutterBottom align="center">
						정렬 순서
					</Typography>
					<Divider />
					<OrderToggleGroup
						value={tempSortOrder}
						exclusive
						onChange={handleOrderChange}
						aria-label="정렬 순서">
						<ToggleButton value="asc" aria-label="오름차순">
							<ArrowUpward sx={{ mr: 1 }} />
							오름차순
						</ToggleButton>
						<ToggleButton value="desc" aria-label="내림차순">
							<ArrowDownward sx={{ mr: 1 }} />
							내림차순
						</ToggleButton>
					</OrderToggleGroup>
				</SortSection>
			</DialogContent>
			<DialogActions>
				<Button onClick={handleCancel} color="inherit">
					취소
				</Button>
				<Button onClick={handleConfirm} color="primary" variant="contained">
					확인
				</Button>
			</DialogActions>
		</StyledDialog>
	);
};

export default SortModal;
