// CategorySelect.jsx
import React, { memo } from 'react';
import { Select, MenuItem } from '@mui/material';
import { useAtom } from 'jotai';
import { contentTypeAtom } from 'store/atom';

const CategorySelect = memo(() => {
	const [contentType, setContentType] = useAtom(contentTypeAtom);
	const handleCategoryChange = (event) => {
		setContentType(event.target.value);
	};

	return (
		<Select
			value={contentType}
			onChange={handleCategoryChange}
			sx={{ color: 'inherit', mr: 2 }}
			size="small">
			<MenuItem value="전체">전체</MenuItem>
			<MenuItem value="책">책</MenuItem>
			<MenuItem value="영화">영화</MenuItem>
			<MenuItem value="게임">게임</MenuItem>
			<MenuItem value="음악">음악</MenuItem>
			<MenuItem value="웹툰">웹툰</MenuItem>
			<MenuItem value="애니">애니</MenuItem>
		</Select>
	);
});

export default CategorySelect;
