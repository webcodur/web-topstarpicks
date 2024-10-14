import { openaiModelCheck, openaiChatTest } from 'api/aiApi';
import { useState } from 'react';

const OpenaiApiCheck = () => {
	const [modelTestResult, setModelTestResult] = useState();
	const [chatTestResult, setChatTestResult] = useState();
	const testText = '안녕 넌 누구니';

	const check = async () => {
		const result = await openaiModelCheck();
		setModelTestResult(result.data.data);
	};

	const check2 = async () => {
		const result = await openaiChatTest(testText);
		console.log('result', result);
		setChatTestResult(result.data);
	};

	return (
		<div>
			{/* 모델 확인 */}
			<br />
			<button onClick={check}>모델 확인</button>
			<br />
			{modelTestResult && (
				<>
					<br />
					<br />
					<b>모델 확인 결과:</b>
					{modelTestResult.map((ele) => (
						<div key={ele}>{ele}</div>
					))}
				</>
			)}

			{/* 응답 확인 */}
			<br />
			<hr />
			<br />
			<div>대화: {testText}</div>
			<button onClick={check2}>응답 받기</button>
			{chatTestResult && (
				<>
					<br />
					<br />
					<b>채팅 결과:</b>
					{chatTestResult}
				</>
			)}
		</div>
	);
};

export default OpenaiApiCheck;
