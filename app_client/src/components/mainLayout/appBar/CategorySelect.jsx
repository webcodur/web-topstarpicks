// CategorySelect.jsx
import React, { memo } from 'react';
import { Select, MenuItem } from '@mui/material';
import { useAtom } from 'jotai';
import { contentNameAtom } from 'store/atom';
import { useContentNames } from 'hooks/useContentNames';
import { useContentNumbers } from 'hooks/useContentNumbers';

const CategorySelect = memo(() => {
	const [contentType, setContentType] = useAtom(contentNameAtom); // 현재 컨텐츠 타입
	const contentNames = useContentNames(); // 전체 컨텐츠 타입
	const contentNumbers = useContentNumbers(); // 각 컨텐츠별 숫자

	const handleCategoryChange = (event) => {
		setContentType(event.target.value);
		// 여기서 필터링 로직 전개
	};

	const getNumber = (type) => {
		if (JSON.stringify(contentNumbers) === JSON.stringify({})) return <></>;
		const targetObj = contentNumbers.find((ele) => ele.name === type);
		return targetObj ? targetObj.count : 0;
	};

	if (!contentNames || !contentNumbers) return null;

	return (
		<Select
			value={contentType}
			onChange={handleCategoryChange}
			sx={{ color: 'inherit', mr: 2 }}
			size="small">
			{contentNames.map((ele) => (
				<MenuItem value={ele.name} key={ele.name}>
					{ele.name} ({getNumber(ele.name)})
				</MenuItem>
			))}
		</Select>
	);
});

export default CategorySelect;
