import React from 'react';
import { Input } from '../../../../../components/ui/input';
import { Label } from '../../../../../components/ui/label';
import { Button } from '../../../../../components/ui/button';
import { Card, CardContent } from '../../../../../components/ui/card';

// 유명인사 검색 섹션 컴포넌트
// 수정 모드에서만 표시되며, 검색 결과를 리스트로 표시
const SearchSection = ({
	mode,
	searchQuery,
	onSearchQueryChange,
	onSearch,
	searchResults,
	onResultClick,
}) => {
	// 수정 모드가 아니면 렌더링하지 않음
	if (mode !== 'edit') return null;

	const handleKeyPress = (e) => {
		if (e.key === 'Enter') {
			onSearch();
		}
	};

	return (
		<div className="space-y-4 mb-6">
			{/* 검색창과 버튼을 상단에 배치 */}
			<div className="grid grid-cols-1 md:grid-cols-4 gap-4">
				<div className="md:col-span-3 space-y-2">
					<Label htmlFor="celebrity_search">유명인사 검색</Label>
					<Input
						id="celebrity_search"
						value={searchQuery}
						onChange={(e) => onSearchQueryChange(e.target.value)}
						onKeyPress={handleKeyPress}
						placeholder="유명인사 이름을 입력하세요"
					/>
				</div>
				<div className="md:col-span-1 flex items-end">
					<Button onClick={onSearch} className="w-full">
						검색
					</Button>
				</div>
			</div>
			
			{/* 검색 결과가 2개 이상일 때만 결과 목록 표시 */}
			{searchResults.length > 1 && (
				<Card>
					<CardContent className="p-0">
						<div className="max-h-60 overflow-y-auto">
							{searchResults.map((result) => (
								<div
									key={result.id}
									onClick={() => onResultClick(result)}
									className="px-4 py-3 hover:bg-gray-100 cursor-pointer border-b border-gray-200 last:border-b-0 transition-colors"
								>
									<div className="font-medium text-sm">
										{`${result.prename || ''} ${result.name} ${
											result.postname || ''
										}`.trim()}
									</div>
									<div className="text-sm text-gray-600 mt-1">
										{result.profession_kor}
									</div>
								</div>
							))}
						</div>
					</CardContent>
				</Card>
			)}
		</div>
	);
};

export default SearchSection;