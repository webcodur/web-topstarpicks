import React from 'react';

export const CardLibrary = ({ isOpen, onClose, cards }) => {
	if (!isOpen) return null;

	return (
		<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
			<div className="bg-white rounded-lg p-6 max-w-4xl max-h-[80vh] overflow-y-auto shadow-lg">
				<div className="flex justify-between items-center mb-6">
					<h2 className="text-2xl font-bold text-gray-800">전체 카드 목록</h2>
					<button 
						onClick={onClose}
						className="text-gray-400 hover:text-gray-600 text-3xl font-bold leading-none"
					>
						×
					</button>
				</div>
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
					{cards.map((card) => (
						<div key={card.id} className="bg-white border-2 border-gray-200 rounded-lg p-4 shadow-md hover:shadow-lg transition-shadow">
							<h4 className="text-xl font-bold text-gray-800 mb-2">{card.name}</h4>
							<p className="text-gray-600 mb-1">{card.type}</p>
							<p className="text-blue-600 font-semibold mb-2">{card.rank}등급</p>
							<p className="text-sm text-gray-500">{card.description}</p>
						</div>
					))}
				</div>
			</div>
		</div>
	);
};