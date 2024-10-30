import React from 'react';
import {
	Grid,
	TextField,
	Button,
	Paper,
	List,
	ListItem,
	ListItemText,
} from '@mui/material';
import { styles } from '../CelebForm.styles';

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

	return (
		// 검색창과 버튼을 상단에 배치
		// 검색 결과가 2개 이상일 때만 결과 목록 표시
		<Grid container spacing={2} sx={styles.formContainer}>
			<Grid item xs={9}>
				<TextField
					fullWidth
					size="small"
					label="유명인사 검색"
					value={searchQuery}
					onChange={(e) => onSearchQueryChange(e.target.value)}
					onKeyPress={(e) => e.key === 'Enter' && onSearch()}
				/>
			</Grid>
			<Grid item xs={3}>
				<Button fullWidth variant="contained" onClick={onSearch} size="medium">
					검색
				</Button>
			</Grid>
			{searchResults.length > 1 && (
				<Grid item xs={12}>
					<Paper sx={styles.searchResultsPaper}>
						<List>
							{searchResults.map((result) => (
								<ListItem
									key={result.id}
									onClick={() => onResultClick(result)}
									sx={{ cursor: 'pointer' }}>
									<ListItemText
										primary={`${result.prename || ''} ${result.name} ${
											result.postname || ''
										}`}
										secondary={result.profession_kor}
									/>
								</ListItem>
							))}
						</List>
					</Paper>
				</Grid>
			)}
		</Grid>
	);
};

export default SearchSection;
