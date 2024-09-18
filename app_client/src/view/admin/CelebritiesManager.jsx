import React, { useState, useEffect, useCallback } from 'react';
import { Button, IconButton } from '@mui/material';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckIcon from '@mui/icons-material/Check';
import axios from 'axios';

const API_BASE_URL = 'http://localhost:4000/api';

const CelebritiesManager = ({ showSnackbar }) => {
	const [rows, setRows] = useState([]);

	const fetchCelebrities = useCallback(async () => {
		try {
			const response = await axios.get(`${API_BASE_URL}/celebrities/all`);
			const rowsWithInfo = response.data.data.map((celebrity) => ({
				...celebrity,
				id: celebrity.id || `temp_${Date.now()}_${Math.random()}`,
				isNew: false,
				isEdited: false,
			}));
			setRows(rowsWithInfo);
		} catch (error) {
			console.error('Error fetching celebrities:', error);
			showSnackbar('유명인사 정보를 불러오는 데 실패했습니다.');
		}
	}, [showSnackbar]);

	useEffect(() => {
		fetchCelebrities();
	}, [fetchCelebrities]);

	const handleAddCelebrity = useCallback(() => {
		const newCelebrity = {
			id: `temp_${Date.now()}`,
			name: '',
			profession: '',
			gender: '',
			nationality: '',
			birth_date: '',
			biography: '',
			img_link: '',
			isNew: true,
			isEdited: false,
		};
		setRows((prev) => [...prev, newCelebrity]);
	}, []);

	const handleDeleteCelebrity = useCallback(
		async (id) => {
			try {
				if (!id.toString().startsWith('temp_')) {
					await axios.delete(`${API_BASE_URL}/celebrities/${id}`);
				}
				setRows((prev) => prev.filter((row) => row.id !== id));
				showSnackbar('유명인사가 삭제되었습니다.');
			} catch (error) {
				console.error('Error deleting celebrity:', error);
				showSnackbar('유명인사 삭제에 실패했습니다.');
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
				const { isNew, isEdited, ...celebrityData } = row;

				if (isNew) {
					await axios.post(`${API_BASE_URL}/celebrities`, celebrityData);
				} else {
					await axios.put(`${API_BASE_URL}/celebrities/${id}`, celebrityData);
				}

				showSnackbar('유명인사 정보가 저장되었습니다.');
				await fetchCelebrities();
			} catch (error) {
				console.error('Error saving celebrity:', error);
				showSnackbar('유명인사 정보 저장에 실패했습니다.');
			}
		},
		[rows, fetchCelebrities, showSnackbar]
	);

	const columns = [
		{ field: 'name', headerName: '이름', width: 130, editable: true },
		{ field: 'profession', headerName: '직업', width: 130, editable: true },
		{ field: 'gender', headerName: '성별', width: 90, editable: true },
		{ field: 'nationality', headerName: '국적', width: 130, editable: true },
		{ field: 'birth_date', headerName: '생년월일', width: 130, editable: true },
		{ field: 'biography', headerName: '약력', width: 200, editable: true },
		{
			field: 'img_link',
			headerName: '이미지 링크',
			width: 200,
			editable: true,
		},
		{
			field: 'actions',
			headerName: '작업',
			width: 120,
			renderCell: (params) => (
				<>
					{(params.row.isNew || params.row.isEdited) && (
						<IconButton
							onClick={() => handleSaveRow(params.id)}
							color="primary"
							size="small">
							<CheckIcon />
						</IconButton>
					)}
					<IconButton
						onClick={() => handleDeleteCelebrity(params.id)}
						color="secondary"
						size="small">
						<DeleteIcon />
					</IconButton>
				</>
			),
		},
	];

	return (
		<>
			<Button
				onClick={handleAddCelebrity}
				variant="contained"
				style={{ marginBottom: 10, marginRight: 10 }}>
				새 유명인사 추가
			</Button>

			<DataGrid
				rows={rows}
				columns={columns}
				pageSize={5}
				components={{
					Toolbar: GridToolbar,
				}}
				processRowUpdate={processRowUpdate}
			/>
		</>
	);
};

export default CelebritiesManager;
