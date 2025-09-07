import React from 'react';
import { useAtom } from 'jotai';
import { darkModeAtom } from '../../../../../store/atom';

const TagContainer = ({ profession, isHistorical, isLegend, menuInfo }) => {
	const [darkMode] = useAtom(darkModeAtom);

	return (
		<div className="flex flex-wrap gap-2 mt-4">
			<span className={`
				inline-flex items-center px-2 py-1 rounded-full text-sm font-medium
				border border-orange-200 bg-purple-50 text-purple-700
				${darkMode ? 'bg-purple-900/20 text-purple-300 border-purple-600' : ''}
			`}>
				{profession}
			</span>
			{isHistorical === 1 && menuInfo === '인물도감' && (
				<span className={`
					inline-flex items-center px-2 py-1 rounded-full text-sm font-medium
					border border-blue-200 bg-blue-50 text-blue-700
					${darkMode ? 'bg-blue-900/20 text-blue-300 border-blue-600' : ''}
				`}>
					실존인물
				</span>
			)}
			{isLegend === 1 && menuInfo === '인물도감' && (
				<span className={`
					inline-flex items-center px-2 py-1 rounded-full text-sm font-medium
					border border-pink-200 bg-yellow-50 text-pink-600
					${darkMode ? 'bg-yellow-900/20 text-pink-300 border-pink-600' : ''}
				`}>
					전설인물
				</span>
			)}
		</div>
	);
};

export default TagContainer;
