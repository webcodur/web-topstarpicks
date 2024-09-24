import React, { useState, useEffect, useCallback } from 'react';
import { Button } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import {
	fetchAllCelebrities,
	createCelebrity,
	updateCelebrity,
	deleteCelebrity,
} from 'api/celebrityApi';
import getCelebColumns from './celebColumns';

const Celeb = ({ showSnackbar }) => {
	const [rows, setRows] = useState([]);

	const fetchCelebrities = useCallback(async () => {
		try {
			const celebrities = await fetchAllCelebrities();
			const rowsWithInfo = celebrities.map((celebrity) => ({
				...celebrity,
				id: celebrity.id || `temp_${Date.now()}_${Math.random()}`,
				isNew: false,
				isEdited: false,
			}));
			setRows(rowsWithInfo);
		} catch (error) {
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
					await deleteCelebrity(id);
				}
				setRows((prev) => prev.filter((row) => row.id !== id));
				showSnackbar('유명인사가 삭제되었습니다.');
			} catch (error) {
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
					await createCelebrity(celebrityData);
				} else {
					await updateCelebrity(id, celebrityData);
				}

				showSnackbar('유명인사 정보가 저장되었습니다.');
				await fetchCelebrities();
			} catch (error) {
				showSnackbar('유명인사 정보 저장에 실패했습니다.');
			}
		},
		[rows, fetchCelebrities, showSnackbar]
	);

	const columns = getCelebColumns(handleSaveRow, handleDeleteCelebrity);

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
				processRowUpdate={processRowUpdate}
			/>
		</>
	);
};

export default Celeb;
