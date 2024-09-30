import React, { useState, useEffect, useCallback } from 'react';
import { Button } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { fetchAllCelebrities } from 'api/celebrityApi';
import {
	fetchAllRecommendations,
	createRecommendation,
	updateRecommendation,
	deleteRecommendation,
	fetchContentTypeNumber,
} from 'api/recommendationApi';
import getRecsColumns from './recsColumns';

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
	const [contentNames, setcontentNames] = useState([]);

	const fetchRecommendations = useCallback(async () => {
		try {
			const recommendations = await fetchAllRecommendations();
			const rowsWithInfo = recommendations.map((recommendation) => ({
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
			const celebs = await fetchAllCelebrities();
			setCelebrities(celebs);
		} catch (error) {
			console.error('Error fetching celebrities:', error);
			showSnackbar('유명인사 정보를 불러오는 데 실패했습니다.');
		}
	}, [showSnackbar]);

	const fetchcontentNames = useCallback(async () => {
		try {
			const types = await fetchContentTypeNumber();
			setcontentNames(types.filter((item) => item.type !== '전체'));
		} catch (error) {
			console.error('Error fetching content types:', error);
			showSnackbar('컨텐츠 타입 정보를 불러오는 데 실패했습니다.');
		}
	}, [showSnackbar]);

	useEffect(() => {
		fetchRecommendations();
		fetchCelebrities();
		fetchcontentNames();
	}, [fetchRecommendations, fetchCelebrities, fetchcontentNames]);

	const handleAddRecommendation = useCallback(() => {
		const newRecommendation = {
			id: `temp_${Date.now()}`,
			celebrity_id: '',
			content_id: '',
			content_name: '',
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
					await deleteRecommendation(id);
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

		// content_name이 변경되었다면 content_id도 업데이트
		if (newRow.content_name !== oldRow.content_name) {
			updatedRow.content_id = contentIdMap[newRow.content_name] || '';
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
					await createRecommendation(recommendationData);
				} else {
					await updateRecommendation(id, recommendationData);
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

	const columns = getRecsColumns(
		celebrities,
		categoriesMap,
		contentIdMap,
		processRowUpdate,
		handleSaveRow,
		handleDeleteRecommendation
	);

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
				processRowUpdate={processRowUpdate}
				experimentalFeatures={{ newEditingApi: true }}
			/>
		</>
	);
};

export default Recs;
