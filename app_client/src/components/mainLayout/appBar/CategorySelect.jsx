// CategorySelect.jsx
import React, { memo } from 'react';
import { Select, MenuItem } from '@mui/material';
import { useAtom } from 'jotai';
import { contentNameAtom } from 'store/atom';
import { useContentNames } from 'hooks/useContentNames';

const CategorySelect = memo(() => {
	const [contentType, setContentType] = useAtom(contentNameAtom); // 현재 컨텐츠 타입
	const contentNames = useContentNames(); // 전체 컨텐츠 타입

	const handleCategoryChange = (event) => {
		setContentType(event.target.value);
	};

	if (!contentNames) return null;

	return (
		<Select
			value={contentType}
			onChange={handleCategoryChange}
			sx={{ color: 'inherit', mr: 2 }}
			size="small">
			{contentNames.map((ele) => (
				<MenuItem value={ele.name} key={ele.name}>
					{ele.name}
				</MenuItem>
			))}
		</Select>
	);
});

export default CategorySelect;
