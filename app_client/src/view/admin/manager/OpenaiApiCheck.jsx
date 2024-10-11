import React from 'react';
import { openaiCheck } from 'api/openaiApiCheckApi';

const OpenaiApiCheck = () => {
	const check = () => {
		openaiCheck();
	};

	return (
		<div>
			<button onClick={check}>check</button>
		</div>
	);
};

export default OpenaiApiCheck;
