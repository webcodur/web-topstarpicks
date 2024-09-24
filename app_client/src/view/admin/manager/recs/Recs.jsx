import React, { useState, useEffect, useCallback } from 'react';
import { Button, MenuItem, Select } from '@mui/material';
import { DataGrid, GridToolbar, GridActionsCellItem } from '@mui/x-data-grid';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckIcon from '@mui/icons-material/Check';
import axios from 'axios';

const API_BASE_URL = 'http://localhost:4000/api';

const categoriesMap = {
	book: '책',
	movie: '영화',
	game: '게임',
	music: '음악',
	webtoon: '웹툰',
	anime: '애니',
	restaurant: '맛집',
};

const contentIdMap = Object.keys(categoriesMap).reduce((acc, key, index) => {
	acc[categoriesMap[key]] = index + 1;
	return acc;
}, {});

const Recs = ({ showSnackbar }) => {
	const [rows, setRows] = useState([]);
	const [celebrities, setCelebrities] = useState([]);
	const [contentTypes, setContentTypes] = useState([]);

	const fetchRecommendations = useCallback(async () => {
		try {
			const response = await axios.get(`${API_BASE_URL}/recommendations/all`);
			const rowsWithInfo = response.data.data.map((recommendation) => ({
				...recommendation,
				id: recommendation.id || `temp_${Date.now()}_${Math.random()}`,
				isNew: false,
				isEdited: false,
			}));
			setRows(rowsWithInfo);
		} catch (error) {
			console.error('Error fetching recommendations:', error);
			showSnackbar('추천 정보를 불러오는 데 실패했습니다.');
		}
	}, [showSnackbar]);

	const fetchCelebrities = useCallback(async () => {
		try {
			const response = await axios.get(`${API_BASE_URL}/celebrities/all`);
			setCelebrities(response.data.data);
		} catch (error) {
			console.error('Error fetching celebrities:', error);
			showSnackbar('유명인사 정보를 불러오는 데 실패했습니다.');
		}
	}, [showSnackbar]);

	const fetchContentTypes = useCallback(async () => {
		try {
			const response = await axios.get(
				`${API_BASE_URL}/recommendations/number`
			);
			setContentTypes(
				response.data.data.filter((item) => item.type !== '전체')
			);
		} catch (error) {
			console.error('Error fetching content types:', error);
			showSnackbar('컨텐츠 타입 정보를 불러오는 데 실패했습니다.');
		}
	}, [showSnackbar]);

	useEffect(() => {
		fetchRecommendations();
		fetchCelebrities();
		fetchContentTypes();
	}, [fetchRecommendations, fetchCelebrities, fetchContentTypes]);

	const handleAddRecommendation = useCallback(() => {
		const newRecommendation = {
			id: `temp_${Date.now()}`,
			celebrity_id: '',
			content_id: '',
			content_type: '',
			title: '',
			creator: '',
			release_date: '',
			recommendation_text: '',
			recommendation_source: '',
			img_link: '',
			affiliate_link: '',
			mediaDescription: '',
			isNew: true,
			isEdited: false,
		};
		setRows((prev) => [...prev, newRecommendation]);
	}, []);

	const handleDeleteRecommendation = useCallback(
		async (id) => {
			try {
				if (!id.toString().startsWith('temp_')) {
					await axios.delete(`${API_BASE_URL}/recommendations/${id}`);
				}
				setRows((prev) => prev.filter((row) => row.id !== id));
				showSnackbar('추천 정보가 삭제되었습니다.');
			} catch (error) {
				console.error('Error deleting recommendation:', error);
				showSnackbar('추천 정보 삭제에 실패했습니다.');
			}
		},
		[showSnackbar]
	);

	const processRowUpdate = useCallback((newRow, oldRow) => {
		const hasChanged = Object.keys(newRow).some(
			(field) => newRow[field] !== oldRow[field] && field !== 'isEdited'
		);

		const updatedRow = hasChanged
			? { ...newRow, isEdited: true }
			: { ...newRow, isEdited: oldRow.isEdited };

		// content_type이 변경되었다면 content_id도 업데이트
		if (newRow.content_type !== oldRow.content_type) {
			updatedRow.content_id = contentIdMap[newRow.content_type] || '';
		}

		setRows((prevRows) =>
			prevRows.map((row) => (row.id === updatedRow.id ? updatedRow : row))
		);

		return updatedRow;
	}, []);

	const handleSaveRow = useCallback(
		async (id) => {
			const row = rows.find((r) => r.id === id);
			if (!row || (!row.isNew && !row.isEdited)) return;

			try {
				const { isNew, isEdited, ...recommendationData } = row;

				if (isNew) {
					await axios.post(
						`${API_BASE_URL}/recommendations`,
						recommendationData
					);
				} else {
					await axios.put(
						`${API_BASE_URL}/recommendations/${id}`,
						recommendationData
					);
				}

				showSnackbar('추천 정보가 저장되었습니다.');
				await fetchRecommendations();
			} catch (error) {
				console.error('Error saving recommendation:', error);
				showSnackbar('추천 정보 저장에 실패했습니다.');
			}
		},
		[rows, fetchRecommendations, showSnackbar]
	);

	const columns = [
		{
			field: 'celebrity_id',
			headerName: '유명인사',
			width: 150,
			editable: true,
			renderCell: (params) => (
				<Select
					value={params.value}
					onChange={(e) => {
						const updatedRow = { ...params.row, celebrity_id: e.target.value };
						processRowUpdate(updatedRow, params.row);
					}}
					fullWidth>
					{celebrities.map((celebrity) => (
						<MenuItem key={celebrity.id} value={celebrity.id}>
							{celebrity.name}
						</MenuItem>
					))}
				</Select>
			),
		},
		{
			field: 'content_type',
			headerName: '컨텐츠 타입',
			width: 150,
			editable: true,
			renderCell: (params) => (
				<Select
					value={params.value}
					onChange={(e) => {
						const updatedRow = {
							...params.row,
							content_type: e.target.value,
							content_id: contentIdMap[e.target.value] || '',
						};
						processRowUpdate(updatedRow, params.row);
					}}
					fullWidth>
					{Object.values(categoriesMap).map((type) => (
						<MenuItem key={type} value={type}>
							{type}
						</MenuItem>
					))}
				</Select>
			),
		},
		{ field: 'title', headerName: '제목', width: 200, editable: true },
		{ field: 'creator', headerName: '제작자', width: 150, editable: true },
		{ field: 'release_date', headerName: '출시일', width: 120, editable: true },
		{
			field: 'recommendation_text',
			headerName: '추천 이유',
			width: 200,
			editable: true,
		},
		{
			field: 'recommendation_source',
			headerName: '출처',
			width: 150,
			editable: true,
		},
		{
			field: 'img_link',
			headerName: '이미지 링크',
			width: 200,
			editable: true,
		},
		{
			field: 'affiliate_link',
			headerName: '제휴 링크',
			width: 200,
			editable: true,
		},
		{
			field: 'mediaDescription',
			headerName: '미디어 설명',
			width: 200,
			editable: true,
		},
		{
			field: 'actions',
			type: 'actions',
			headerName: '작업',
			width: 120,
			getActions: (params) => [
				...(params.row.isNew || params.row.isEdited
					? [
							<GridActionsCellItem
								icon={<CheckIcon />}
								label="Save"
								onClick={() => handleSaveRow(params.id)}
							/>,
					  ]
					: []),
				<GridActionsCellItem
					icon={<DeleteIcon />}
					label="Delete"
					onClick={() => handleDeleteRecommendation(params.id)}
				/>,
			],
		},
	];

	return (
		<>
			<Button
				onClick={handleAddRecommendation}
				variant="contained"
				style={{ marginBottom: 10, marginRight: 10 }}>
				새 추천 정보 추가
			</Button>

			<DataGrid
				rows={rows}
				columns={columns}
				pageSize={5}
				components={{
					Toolbar: GridToolbar,
				}}
				processRowUpdate={processRowUpdate}
				experimentalFeatures={{ newEditingApi: true }}
			/>
		</>
	);
};

export default Recs;
