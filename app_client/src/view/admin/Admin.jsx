import React, { useState, useEffect, useCallback } from 'react';
import { Button, IconButton, Snackbar } from '@mui/material';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckIcon from '@mui/icons-material/Check';
import { StyledBox } from './AdminStyles';
import axios from 'axios';

const API_BASE_URL = 'http://localhost:4000/api';

const Admin = () => {
	const [rows, setRows] = useState([]);
	const [snackbarOpen, setSnackbarOpen] = useState(false);
	const [snackbarMessage, setSnackbarMessage] = useState('');

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
			setSnackbarMessage('유명인사 정보를 불러오는 데 실패했습니다.');
			setSnackbarOpen(true);
		}
	}, []);

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
			isEdited: true,
		};
		setRows((prev) => [...prev, newCelebrity]);
	}, []);

	const handleDeleteCelebrity = useCallback(async (id) => {
		try {
			if (!id.toString().startsWith('temp_')) {
				await axios.delete(`${API_BASE_URL}/celebrities/${id}`);
			}
			setRows((prev) => prev.filter((row) => row.id !== id));
			setSnackbarMessage('유명인사가 삭제되었습니다.');
			setSnackbarOpen(true);
		} catch (error) {
			console.error('Error deleting celebrity:', error);
			setSnackbarMessage('유명인사 삭제에 실패했습니다.');
			setSnackbarOpen(true);
		}
	}, []);

	const processRowUpdate = useCallback((newRow, oldRow) => {
		const updatedRow = { ...newRow, isEdited: true };
		setRows((prev) =>
			prev.map((row) => (row.id === newRow.id ? updatedRow : row))
		);
		return updatedRow;
	}, []);

	const handleSaveRow = useCallback(
		async (id) => {
			const row = rows.find((r) => r.id === id);
			if (!row || (!row.isNew && !row.isEdited)) return;

			try {
				const { isNew, isEdited, ...celebrityData } = row;
				let savedCelebrity;

				if (isNew) {
					const response = await axios.post(
						`${API_BASE_URL}/celebrities`,
						celebrityData
					);
					savedCelebrity = response.data.data;
				} else {
					const response = await axios.put(
						`${API_BASE_URL}/celebrities/${id}`,
						celebrityData
					);
					savedCelebrity = response.data.data;
				}

				setSnackbarMessage('유명인사 정보가 저장되었습니다.');
				setSnackbarOpen(true);
				await fetchCelebrities();
			} catch (error) {
				console.error('Error saving celebrity:', error);
				setSnackbarMessage('유명인사 정보 저장에 실패했습니다.');
				setSnackbarOpen(true);
			}
		},
		[rows, fetchCelebrities]
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
		<StyledBox>
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

			<Snackbar
				open={snackbarOpen}
				autoHideDuration={6000}
				onClose={() => setSnackbarOpen(false)}
				message={snackbarMessage}
			/>
		</StyledBox>
	);
};

export default Admin;
