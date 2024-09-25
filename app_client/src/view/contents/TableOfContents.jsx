import React from 'react';
import { TableOfContents, TOCItem } from './ContentsStyle';

const TableOfContentsComponent = ({ recommendations, onItemClick }) => (
	<TableOfContents>
		<h2>목차</h2>
		{recommendations.map((recommendation, index) => (
			<TOCItem key={index} onClick={() => onItemClick(index)}>
				{index + 1}. {recommendation.title} / {recommendation.creator}
			</TOCItem>
		))}
	</TableOfContents>
);

export default TableOfContentsComponent;
