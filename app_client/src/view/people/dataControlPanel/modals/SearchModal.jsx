import React, { useState } from 'react';
import {
	Dialog,
	DialogTitle,
	IconButton,
	TextField,
	List,
	ListItem,
	ListItemText,
	InputAdornment,
	Box,
	DialogContent,
	Typography,
} from '@mui/material';
import {
	Close as CloseIcon,
	Search as SearchIcon,
	Mic as MicIcon,
} from '@mui/icons-material';

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
		<Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
			<DialogTitle sx={{ m: 0, p: 2 }}>
				인물 검색
				<IconButton
					onClick={onClose}
					sx={{
						position: 'absolute',
						right: 8,
						top: 8,
					}}>
					<CloseIcon />
				</IconButton>
			</DialogTitle>

			<Box sx={{ p: 2 }}>
				<TextField
					fullWidth
					value={searchTerm}
					onChange={handleSearchChange}
					placeholder="인물 이름을 입력하세요"
					variant="outlined"
					InputProps={{
						startAdornment: (
							<InputAdornment position="start">
								<SearchIcon />
							</InputAdornment>
						),
						endAdornment: (
							<InputAdornment position="end">
								<IconButton
									onClick={handleVoiceInput}
									color={isListening ? 'primary' : 'default'}>
									<MicIcon />
								</IconButton>
							</InputAdornment>
						),
					}}
				/>

				{suggestions.length > 0 && (
					<List>
						{suggestions.map((suggestion, index) => (
							<ListItem
								button
								key={index}
								onClick={() => {
									setSearchTerm(suggestion);
									// TODO: 검색 실행 로직
								}}>
								<ListItemText primary={suggestion} />
							</ListItem>
						))}
					</List>
				)}
			</Box>

			<DialogContent>
				<Typography variant="body1" style={{ padding: '20px' }}>
					이 기능은 현재 개발 중입니다.
				</Typography>
			</DialogContent>
		</Dialog>
	);
};

export default SearchModal;
