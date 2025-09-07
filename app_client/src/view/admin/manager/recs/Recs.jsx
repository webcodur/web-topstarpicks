import React, { useState, useEffect, useCallback } from 'react';
import { fetchAllCelebrities } from 'api/celebrityApi';
import {
	fetchAllRecommendations,
	updateRecommendation,
	deleteRecommendation,
} from 'api/recommendationApi';
import { RecsTableRow } from './recsColumns';

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

	useEffect(() => {
		fetchRecommendations();
		fetchCelebrities();
	}, [fetchRecommendations, fetchCelebrities]);

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

	const handleUpdateRow = useCallback((id, newData) => {
		setRows((prevRows) =>
			prevRows.map((row) =>
				row.id === id ? { ...row, ...newData, isEdited: true } : row
			)
		);
	}, []);

	const handleSaveRow = useCallback(
		async (id) => {
			const row = rows.find((r) => r.id === id);
			if (!row || (!row.isNew && !row.isEdited)) return;

			try {
				const { isNew, isEdited, ...recommendationData } = row;

				await updateRecommendation(id, recommendationData);

				showSnackbar('추천 정보가 저장되었습니다.');
				await fetchRecommendations();
			} catch (error) {
				console.error('Error saving recommendation:', error);
				showSnackbar('추천 정보 저장에 실패했습니다.');
			}
		},
		[rows, fetchRecommendations, showSnackbar]
	);

	return (
		<div className="w-full overflow-x-auto">
			<table className="w-full border border-gray-300 bg-white text-sm">
				<thead className="bg-gray-50">
					<tr>
						<th className="p-3 text-left font-semibold text-gray-900 border-b">
							유명인사
						</th>
						<th className="p-3 text-left font-semibold text-gray-900 border-b">
							컨텐츠 타입
						</th>
						<th className="p-3 text-left font-semibold text-gray-900 border-b">
							제목
						</th>
						<th className="p-3 text-left font-semibold text-gray-900 border-b">
							제작자
						</th>
						<th className="p-3 text-left font-semibold text-gray-900 border-b">
							출시일
						</th>
						<th className="p-3 text-left font-semibold text-gray-900 border-b">
							추천 이유
						</th>
						<th className="p-3 text-left font-semibold text-gray-900 border-b">
							출처
						</th>
						<th className="p-3 text-left font-semibold text-gray-900 border-b">
							이미지 링크
						</th>
						<th className="p-3 text-left font-semibold text-gray-900 border-b">
							제휴 링크
						</th>
						<th className="p-3 text-left font-semibold text-gray-900 border-b">
							미디어 설명
						</th>
						<th className="p-3 text-left font-semibold text-gray-900 border-b">
							작업
						</th>
					</tr>
				</thead>
				<tbody>
					{rows.map((row) => (
						<RecsTableRow
							key={row.id}
							row={row}
							celebrities={celebrities}
							categoriesMap={categoriesMap}
							contentIdMap={contentIdMap}
							onSave={handleSaveRow}
							onDelete={handleDeleteRecommendation}
							onUpdate={handleUpdateRow}
						/>
					))}
				</tbody>
			</table>
			{rows.length === 0 && (
				<div className="p-8 text-center text-gray-500">
					추천 정보가 없습니다.
				</div>
			)}
		</div>
	);
};

export default Recs;