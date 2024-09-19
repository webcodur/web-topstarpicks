import React from 'react';
import { TableOfContents, TOCItem } from './ContentsStyle';

const unitByContentType = {
	책: '권',
	영화: '편',
	맛집: '곳',
	애니: '편',
	게임: '편',
	음악: '곡',
};

const TableOfContentsComponent = ({
	recommendations,
	onItemClick,
	personInfo,
	contentType,
}) => (
	<TableOfContents>
		<h2>
			{personInfo.name}가 추천하는 {contentType} {recommendations.length}
			{unitByContentType[contentType]}
		</h2>
		{recommendations.map((recommendation, index) => (
			<TOCItem key={index} onClick={() => onItemClick(index)}>
				{index + 1}. {recommendation.title}
			</TOCItem>
		))}
	</TableOfContents>
);

export default TableOfContentsComponent;
