import { openaiCheck } from 'api/aiApi';
import { useState } from 'react';

const OpenaiApiCheck = () => {
	const [apiRes, setApiRes] = useState();

	const check = async () => {
		const result = await openaiCheck();
		setApiRes(result.data.data);
	};

	return (
		<div>
			<button onClick={check}>모델 확인</button>

			{apiRes && (
				<>
					<br />
					<br />
					<b>모델 확인 결과:</b>
					{apiRes.map((ele) => (
						<div key={ele}>{ele}</div>
					))}
				</>
			)}
		</div>
	);
};

export default OpenaiApiCheck;
