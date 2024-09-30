// CategorySelect.jsx
import React, { memo, useEffect, useState } from 'react';
import { Select, MenuItem } from '@mui/material';
import { useAtom } from 'jotai';
import { contentNameAtom, contentNameNumberAtom } from 'store/atom';
import { fetchContentTypeNumber } from 'api/recommendationApi';

const CategorySelect = memo(() => {
	const [contentType, setContentType] = useAtom(contentNameAtom);
	const [contentTypeNumbers, setContentTypeNumbers] = useState(
		contentNameNumberAtom
	);

	const handleCategoryChange = (event) => {
		setContentType(event.target.value);
		// 여기서 필터링 로직 전개
	};

	const getNumber = (type) => {
		if (JSON.stringify(contentTypeNumbers) === JSON.stringify({})) return <></>;
		const targetObj = contentTypeNumbers.find((ele) => ele.type === type);
		return targetObj ? targetObj.count : 0;
	};

	useEffect(() => {
		const fetchData = async () => {
			try {
				const result = await fetchContentTypeNumber();
				setContentTypeNumbers(result);
				// console.log('Content type numbers:', result);
			} catch (error) {
				console.error('Error fetching content type numbers:', error);
			}
		};
		fetchData();
	}, []);

	if (!contentTypeNumbers) return <></>;
	return (
		<Select
			value={contentType}
			onChange={handleCategoryChange}
			sx={{ color: 'inherit', mr: 2 }}
			size="small">
			<MenuItem value="전체">전체 ({getNumber('전체')})</MenuItem>
			<MenuItem value="책">책 ({getNumber('책')})</MenuItem>
			<MenuItem value="영화">영화 ({getNumber('영화')})</MenuItem>
			<MenuItem value="게임">게임 ({getNumber('게임')})</MenuItem>
			<MenuItem value="음악">음악 ({getNumber('음악')})</MenuItem>
			<MenuItem value="웹툰">웹툰 ({getNumber('웹툰')})</MenuItem>
			<MenuItem value="애니">애니 ({getNumber('애니')})</MenuItem>
			<MenuItem value="맛집">맛집 ({getNumber('맛집')})</MenuItem>
		</Select>
	);
});

export default CategorySelect;
