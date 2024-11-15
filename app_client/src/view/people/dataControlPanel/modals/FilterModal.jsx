import React, { useState, useEffect, useRef } from 'react';
import {
	Dialog,
	DialogTitle,
	DialogContent,
	DialogActions,
	List,
	ListItem,
	ListItemIcon,
	Chip,
	Typography,
	Box,
	Divider,
	Button,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { useAtom } from 'jotai';
import { professionNameAtom, contentNameAtom, timesNameAtom } from 'store/atom';

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

const FilterSection = styled(Box)(({ theme }) => ({
	marginBottom: theme.spacing(3),
}));

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
		<StyledDialog
			open={open}
			onClose={handleCancel}
			maxWidth="md"
			fullWidth
			// 포커스 트랩 관련 props 추가
			disableEnforceFocus
			disableAutoFocus
			keepMounted={false}>
			<DialogTitle>필터 설정</DialogTitle>
			<DialogContent>
				<FilterSection>
					<Typography variant="h6" gutterBottom>
						직군
					</Typography>
					<Divider />
					<List>
						{professionList?.map((item) => (
							<ListItem key={item.value}>
								<Chip
									icon={item.icon}
									label={item.label}
									onClick={() => handleProfessionClick(item.value)}
									color={tempProfession === item.value ? 'primary' : 'default'}
									variant={
										tempProfession === item.value ? 'filled' : 'outlined'
									}
								/>
							</ListItem>
						))}
					</List>
				</FilterSection>

				{menuInfo === '추천정보' && (
					<FilterSection>
						<Typography variant="h6" gutterBottom>
							컨텐츠
						</Typography>
						<Divider />
						<List>
							{contentList?.map((item) => (
								<ListItem key={item.value}>
									<Chip
										label={item.label}
										onClick={() => handleContentClick(item.value)}
										color={tempContent === item.value ? 'primary' : 'default'}
										variant={tempContent === item.value ? 'filled' : 'outlined'}
									/>
								</ListItem>
							))}
						</List>
					</FilterSection>
				)}

				<FilterSection>
					<Typography variant="h6" gutterBottom>
						시대
					</Typography>
					<Divider />
					<List>
						{eraList?.map((item) => (
							<ListItem key={item.value}>
								<Chip
									label={item.label}
									onClick={() => handleEraClick(item.value)}
									color={tempEra === item.value ? 'primary' : 'default'}
									variant={tempEra === item.value ? 'filled' : 'outlined'}
								/>
							</ListItem>
						))}
					</List>
				</FilterSection>

				{(menuInfo === '인물도감' || menuInfo === '전설도감') && (
					<FilterSection>
						<Typography variant="h6" gutterBottom>
							인물 유형
						</Typography>
						<Divider />
						<List>
							{personTypeList?.map((item) => (
								<ListItem key={item.value}>
									<Chip
										label={item.label}
										onClick={() => handlePersonTypeClick(item.value)}
										color={
											tempPersonType === item.value ? 'primary' : 'default'
										}
										variant={
											tempPersonType === item.value ? 'filled' : 'outlined'
										}
									/>
								</ListItem>
							))}
						</List>
					</FilterSection>
				)}
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

export default FilterModal;
