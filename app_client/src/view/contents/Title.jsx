import React from 'react';
import { get이가 } from 'josa-complete';

const unitByContentType = {
	책: '권',
	영화: '편',
	맛집: '곳',
	애니: '편',
	게임: '편',
	음악: '곡',
};

const Title = ({ name, contentType, length }) => {
	return (
		<h1 style={{ textAlign: 'center ', marginBottom: '35px' }}>
			{name}
			{get이가(name)} 추천하는 {contentType} {length}
			{unitByContentType[contentType]}
		</h1>
	);
};

export default Title;
