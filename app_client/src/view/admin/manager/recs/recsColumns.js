import React from 'react';
import { Select, MenuItem } from '@mui/material';
import { GridActionsCellItem } from '@mui/x-data-grid';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckIcon from '@mui/icons-material/Check';

const getRecsColumns = (
	celebrities,
	categoriesMap,
	contentIdMap,
	processRowUpdate,
	handleSaveRow,
	handleDeleteRecommendation
) => [
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

export default getRecsColumns;
