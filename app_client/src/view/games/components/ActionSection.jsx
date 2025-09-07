import React from 'react';

export const ActionSection = ({ onSubmit, isSubmitDisabled }) => {
	return (
		<div className="flex justify-center p-4">
			<button
				disabled={isSubmitDisabled}
				onClick={onSubmit}
				className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-bold py-3 px-6 rounded-lg transition-colors duration-200">
				카드 제출
			</button>
		</div>
	);
};
