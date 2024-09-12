// CategorySelect.jsx
import React, { memo } from 'react';
import { Select, MenuItem } from '@mui/material';
import { useAtom } from 'jotai';
import { contentTypeAtom } from 'store/atom';
import { countContentTypes } from 'utils/countContentTypes';
import { recommendationData } from 'store/content/recommendationData';

const CategorySelect = memo(() => {
	const [contentType, setContentType] = useAtom(contentTypeAtom);
	const handleCategoryChange = (event) => {
		setContentType(event.target.value);
	};
	const res = countContentTypes(recommendationData);

	return (
		<Select
			value={contentType}
			onChange={handleCategoryChange}
			sx={{ color: 'inherit', mr: 2 }}
			size="small">
			<MenuItem value="전체">전체 분류({res.all})</MenuItem>
			<MenuItem value="책">책({res.book})</MenuItem>
			<MenuItem value="영화">영화({res.movie})</MenuItem>
			<MenuItem value="게임">게임({res.game})</MenuItem>
			<MenuItem value="음악">음악({res.music})</MenuItem>
			<MenuItem value="웹툰">웹툰({res.webtoon})</MenuItem>
			<MenuItem value="애니">애니({res.anime})</MenuItem>
			<MenuItem value="맛집">맛집({res.restaurant})</MenuItem>
		</Select>
	);
});

export default CategorySelect;
