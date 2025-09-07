import React, { useState } from 'react';
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogClose
} from 'components/ui/dialog';
import { Input } from 'components/ui/input';
import { Button } from 'components/ui/button';
import {
	X as CloseIcon,
	Search as SearchIcon,
	Mic as MicIcon,
} from 'lucide-react';

const SearchModal = ({ open, onClose }) => {
	const [searchTerm, setSearchTerm] = useState('');
	const [suggestions, setSuggestions] = useState([]);
	// 음성 입력 상태
	const [isListening, setIsListening] = useState(false);

	// 검색어 입력 핸들러
	const handleSearchChange = (event) => {
		const value = event.target.value;
		setSearchTerm(value);
		// TODO: 실시간 검색어 추천 로직 구현
		// 임시 더미 데이터
		setSuggestions(
			value
				? ['홍길동', '이순신', '세종대왕'].filter((name) =>
						name.includes(value)
				  )
				: []
		);
	};

	// 음성 입력 핸들러
	const handleVoiceInput = () => {
		setIsListening(true);
		// TODO: 음성 인식 로직 구현
		setTimeout(() => setIsListening(false), 2000);
	};

	return (
		<Dialog open={open} onOpenChange={onClose}>
			<DialogContent className="sm:max-w-md">
				<DialogHeader>
					<DialogTitle>인물 검색</DialogTitle>
					<DialogClose />
				</DialogHeader>

				<div className="space-y-4">
					<div className="relative">
						<SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
						<Input
							value={searchTerm}
							onChange={handleSearchChange}
							placeholder="인물 이름을 입력하세요"
							className="pl-10 pr-10"
						/>
						<Button
							variant="ghost"
							size="icon"
							onClick={handleVoiceInput}
							className={`absolute right-1 top-1/2 transform -translate-y-1/2 h-8 w-8 ${
								isListening ? 'text-blue-600' : 'text-gray-400'
							}`}>
							<MicIcon className="h-4 w-4" />
						</Button>
					</div>

					{suggestions.length > 0 && (
						<div className="border rounded-md">
							{suggestions.map((suggestion, index) => (
								<button
									key={index}
									className="w-full text-left px-3 py-2 hover:bg-gray-100 border-b last:border-b-0"
									onClick={() => {
										setSearchTerm(suggestion);
										// TODO: 검색 실행 로직
									}}>
									{suggestion}
								</button>
							))}
						</div>
					)}

					<div className="p-5 text-center">
						<p className="text-gray-600">이 기능은 현재 개발 중입니다.</p>
					</div>
				</div>
			</DialogContent>
		</Dialog>
	);
};

export default SearchModal;
