import React, { useState, useEffect, useCallback } from 'react';
import { styled } from '@mui/material/styles';
import { Box, Button, IconButton, Snackbar } from '@mui/material';
import { DataGrid, GridToolbar, useGridApiRef } from '@mui/x-data-grid';
import DeleteIcon from '@mui/icons-material/Delete';

const StyledBox = styled(Box)(({ theme }) => ({
	height: 400,
	width: '100%',
	'& .actions': {
		color: theme.palette.text.secondary,
	},
	'& .textPrimary': {
		color: theme.palette.text.primary,
	},
}));

const initialRows = [
	{ id: 1, name: '홍길동', age: 20, occupation: '학생' },
	{ id: 2, name: '김철수', age: 30, occupation: '회사원' },
];

const Admin = () => {
	const [rows, setRows] = useState(initialRows);
	const [originalRows, setOriginalRows] = useState(initialRows);
	const [snackbarOpen, setSnackbarOpen] = useState(false);
	const [hasChanges, setHasChanges] = useState(false);
	const apiRef = useGridApiRef();

	useEffect(() => {
		setHasChanges(JSON.stringify(rows) !== JSON.stringify(originalRows));
	}, [rows, originalRows]);

	const handleCellEditCommit = (params) => {
		setRows((prevRows) =>
			prevRows.map((row) =>
				row.id === params.id ? { ...row, [params.field]: params.value } : row
			)
		);
	};

	const handleDeleteClick = (id) => {
		setRows((prevRows) => prevRows.filter((row) => row.id !== id));
	};

	const handleAddRow = useCallback(() => {
		const newId = Math.max(...rows.map((r) => r.id), 0) + 1;
		const newRow = { id: newId, name: '', age: '', occupation: '' };
		setRows((prevRows) => [...prevRows, newRow]);

		// 새 행이 추가된 후 약간의 지연을 두고 편집 모드 활성화
		setTimeout(() => {
			apiRef.current.startCellEditMode({ id: newId, field: 'name' });
			apiRef.current.scrollToIndexes({ rowIndex: rows.length });
		}, 100);
	}, [apiRef, rows]);

	const handleApprove = async () => {
		// 여기에서 API 호출을 수행합니다.
		console.log('Changes to be sent to API:', rows);

		// API 호출이 성공했다고 가정하고 상태를 업데이트합니다.
		setOriginalRows(rows);
		setSnackbarOpen(true);
	};

	const columns = [
		{ field: 'name', headerName: '이름', width: 130, editable: true },
		{
			field: 'age',
			headerName: '나이',
			type: 'number',
			width: 90,
			editable: true,
		},
		{ field: 'occupation', headerName: '직업', width: 160, editable: true },
		{
			field: 'actions',
			headerName: '작업',
			width: 100,
			renderCell: (params) => (
				<IconButton
					onClick={() => handleDeleteClick(params.id)}
					color="secondary"
					size="small">
					<DeleteIcon />
				</IconButton>
			),
		},
	];

	return (
		<StyledBox>
			<Button
				onClick={handleAddRow}
				variant="contained"
				style={{ marginBottom: 10, marginRight: 10 }}>
				새 인물 추가
			</Button>
			<Button
				onClick={handleApprove}
				variant="contained"
				color="secondary"
				style={{ marginBottom: 10 }}
				disabled={!hasChanges}>
				변경사항 승인
			</Button>
			<DataGrid
				rows={rows}
				columns={columns}
				pageSize={5}
				components={{
					Toolbar: GridToolbar,
				}}
				onCellEditCommit={handleCellEditCommit}
				apiRef={apiRef}
			/>
			<Snackbar
				open={snackbarOpen}
				autoHideDuration={6000}
				onClose={() => setSnackbarOpen(false)}
				message="변경사항이 성공적으로 적용되었습니다."
			/>
		</StyledBox>
	);
};

export default Admin;
