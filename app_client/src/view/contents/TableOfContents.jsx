import React, { useState } from 'react';
import {
	TableOfContents,
	TOCItem,
	TOCHeader,
	TOCContent,
	TOCTitle,
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
			<TOCHeader onClick={toggleExpand}>
				<TOCTitle>목차</TOCTitle>
				<IconButton size="small">
					{isExpanded ? <ExpandLess /> : <ExpandMore />}
				</IconButton>
			</TOCHeader>
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
