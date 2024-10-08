import React, { useState, useEffect, useCallback } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import {
	fetchAllCelebrities,
	updateCelebrity,
	deleteCelebrity,
} from 'api/celebrityApi';
import getCelebColumns from './celebColumns';
import { useProfession } from 'hooks/useProfession';

const Celeb = ({ showSnackbar }) => {
	const [rows, setRows] = useState([]);
	const professionNames = useProfession();

	const getCelebrities = useCallback(async () => {
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
		getCelebrities();
	}, [getCelebrities]);

	const handleDeleteCelebrity = useCallback(
		async (id) => {
			try {
				if (!id.toString().startsWith('temp_')) {
					await deleteCelebrity(id);
				}
				setRows((prev) => prev.filter((row) => row.id !== id));
				showSnackbar('인물 삭제 성공.');
			} catch (error) {
				showSnackbar('인물 삭제 실패.');
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
				let { isNew, isEdited, profession_kor, ...celebrityData } = row;

				const getProfession = (job) => {
					const found = professionNames.find((ele) => ele.name === job);
					return found.id;
				};

				const profession_id = getProfession(profession_kor);
				celebrityData = { ...celebrityData, profession_id };

				await updateCelebrity(id, celebrityData);

				showSnackbar('유명인사 정보가 저장되었습니다.');
				await getCelebrities();
			} catch (error) {
				showSnackbar('유명인사 정보 저장에 실패했습니다.');
			}
		},
		[rows, getCelebrities, showSnackbar, professionNames]
	);

	const columns = getCelebColumns(handleSaveRow, handleDeleteCelebrity);

	return (
		<DataGrid
			rows={rows}
			columns={columns}
			pageSize={5}
			processRowUpdate={processRowUpdate}
			scrollbarSize={0}
		/>
	);
};

export default Celeb;
