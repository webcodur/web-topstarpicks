import React, { useState } from 'react';
import {
	TableOfContents,
	TOCItem,
	TOCHeader,
	TOCContent,
	TOCTitle,
	TOCControls,
} from './ContentsStyle';
import { IconButton } from '@mui/material';
import { ExpandMore, ExpandLess } from '@mui/icons-material';

const TableOfContentsComponent = ({ recommendations, onItemClick }) => {
	const [isExpanded, setIsExpanded] = useState(false);

	const toggleExpand = () => {
		setIsExpanded(!isExpanded);
	};

	return (
		<TableOfContents>
			{/* 타이틀 및 열기/닫기 버튼 */}
			<TOCHeader>
				<TOCTitle>목차</TOCTitle>
				<TOCControls>
					<p style={{ color: 'gray', marginRight: '8px' }}>
						{isExpanded ? '열림' : '접힘'}
					</p>
					<IconButton size="small" onClick={toggleExpand}>
						{isExpanded ? <ExpandLess /> : <ExpandMore />}
					</IconButton>
				</TOCControls>
			</TOCHeader>

			{/* 목차 내 목록 */}
			<TOCContent $isExpanded={isExpanded}>
				{recommendations.map((recommendation, index) => (
					<TOCItem key={index} onClick={() => onItemClick(index)}>
						{index + 1}. {recommendation.title} / {recommendation.creator}
					</TOCItem>
				))}
			</TOCContent>
		</TableOfContents>
	);
};

export default TableOfContentsComponent;
