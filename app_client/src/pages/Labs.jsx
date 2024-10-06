import React, { useState } from 'react';
import { assessInfluence } from 'api/aiApi';

const Labs = () => {
	const [name, setName] = useState('');
	const [result, setResult] = useState(null);
	const [isLoading, setIsLoading] = useState(false);

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (!name.trim()) return;

		setIsLoading(true);

		try {
			const data = await assessInfluence(name);
			setResult(data);
		} catch (error) {
			console.error('Error:', error);
			setResult({
				error: error.message || '평가 중 오류가 발생했습니다.',
			});
		} finally {
			setIsLoading(false);
		}
	};

	const categories = [
		'정치외교',
		'전략안보',
		'기술과학',
		'사회윤리',
		'산업경제',
		'문화예술',
	];

	return (
		<div className="max-w-2xl mx-auto p-4">
			<h1 className="text-2xl font-bold mb-4">인물 영향력 평가</h1>
			<form onSubmit={handleSubmit} className="mb-4">
				<input
					type="text"
					value={name}
					onChange={(e) => setName(e.target.value)}
					className="border border-gray-300 rounded-l-lg p-2 w-full"
					placeholder="인물 이름을 입력하세요..."
				/>
				<button
					type="submit"
					className="bg-blue-500 text-white px-4 py-2 rounded-r-lg mt-2"
					disabled={isLoading}>
					평가하기
				</button>
			</form>
			{isLoading && <div className="text-center">평가 중...</div>}
			{result && (
				<div className="bg-gray-100 p-4 rounded-lg">
					{result.error ? (
						<p className="text-red-500">{result.error}</p>
					) : (
						<>
							<h2 className="text-xl font-bold mb-2">{result.name}</h2>
							<h3 className="font-bold mb-2">카테고리별 점수:</h3>
							<ul>
								{categories.map((category, index) => (
									<li key={index} className="mb-2">
										<span className="font-semibold">{category}:</span>{' '}
										{result.scores[index]}/10
										<p className="text-sm text-gray-600">
											{result.explanations[index]}
										</p>
									</li>
								))}
							</ul>
							<div className="mt-4">
								<h3 className="font-bold mb-2">통시성:</h3>
								<p>{result.transhistoricity}/40</p>
								<p className="text-sm text-gray-600">
									{result.transhistoricity_explanation}
								</p>
							</div>
							<div className="mt-4">
								<p>
									<strong>종합 점수:</strong> {result.total_score}/100
								</p>
								<p>
									<strong>랭크:</strong> {result.rank}
								</p>
							</div>
						</>
					)}
				</div>
			)}
		</div>
	);
};

export default Labs;
