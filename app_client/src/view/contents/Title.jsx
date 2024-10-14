import React from 'react';
import { get이가 } from 'josa-complete';

const unitBycontentName = {
	책: '권',
	영화: '편',
	맛집: '곳',
	애니: '편',
	게임: '편',
	음악: '곡',
};

const Title = ({ name, contentName, length }) => {
	return (
		<h1
			style={{
				textAlign: 'center ',
				marginBottom: '35px',
				fontFamily: 'Song Myung',
			}}>
			{name}
			{get이가(name)} 추천하는 {contentName} {length}
			{unitBycontentName[contentName]}
		</h1>
	);
};

export default Title;
