import DeleteIcon from '@mui/icons-material/Delete';
import CheckIcon from '@mui/icons-material/Check';
import React from 'react';
import { IconButton } from '@mui/material';

const getCelebColumns = (handleSaveRow, handleDeleteCelebrity) => [
	{ field: 'name', headerName: '이름', width: 130, editable: true },
	{ field: 'profession_kor', headerName: '직군', width: 130, editable: true },
	{ field: 'gender', headerName: '성별', width: 90, editable: true },
	{ field: 'nationality', headerName: '국적', width: 130, editable: true },
	{ field: 'birth_date', headerName: '출생', width: 130, editable: true },
	{ field: 'death_date', headerName: '사망', width: 130, editable: true },
	{ field: 'biography', headerName: '약력', width: 200, editable: true },
	{
		field: 'img_link',
		headerName: '이미지 링크',
		width: 200,
		editable: true,
	},
	{
		field: 'vid_link',
		headerName: '비디오 링크',
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

export default getCelebColumns;
