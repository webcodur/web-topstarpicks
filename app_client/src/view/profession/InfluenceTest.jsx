import React, { useState } from 'react';
import { fetchInfluenceIndex } from 'api/celebrityApi';

const InfluenceTest = () => {
	const [testName, setTestName] = useState('test');

	const handleChange = (e) => {
		setTestName(e.target.value);
	};

	const api호출 = async () => {
		const result = await fetchInfluenceIndex(testName);
		console.log('result', result);
	};

	return (
		<div>
			{/* 인물 별로 영향력 지표 만들기 테스트 */}
			<input type="text" value={testName} onChange={handleChange} />
			<button onClick={api호출}>
				<b>BUTTON</b>
			</button>
			<br />
			<br />
		</div>
	);
};

export default InfluenceTest;

// 사용 예정
