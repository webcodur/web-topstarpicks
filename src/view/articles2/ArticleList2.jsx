import React, { useState } from 'react';
import { Typography, Box } from '@mui/material';
import { StyledPaper, StyledButton } from './ArticlesStyles';
import ArticleItem from './ArticleItem';
import ArticleForm from './ArticleForm';
import { useArticles } from './useArticles';
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';

const ArticleList = () => {
	const [isCreating, setIsCreating] = useState(false);
	const {
		articles,
		fetchNextPage,
		hasNextPage,
		isFetchingNextPage,
		status,
		handleCreate,
		handleUpdate,
		handleDelete,
	} = useArticles();

	if (status === 'loading') return <Typography>로딩 중...</Typography>;
	if (status === 'error') return <Typography>에러가 발생했습니다.</Typography>;

	return (
		<StyledPaper>
			<Typography variant="h4" gutterBottom>
				게시글 목록
			</Typography>
			<Box mb={2}>
				<StyledButton
					onClick={() => setIsCreating(!isCreating)}
					variant="contained"
					color="primary"
					startIcon={isCreating ? <CloseIcon /> : <AddIcon />}>
					{isCreating ? '작성 취소' : '새 게시글 작성'}
				</StyledButton>
			</Box>
			{isCreating && (
				<ArticleForm
					onSubmit={(newArticle) => {
						handleCreate(newArticle);
						setIsCreating(false);
					}}
				/>
			)}
			{articles.map((article) => (
				<ArticleItem
					key={article.id}
					article={article}
					onUpdate={handleUpdate}
					onDelete={handleDelete}
				/>
			))}
			{hasNextPage && (
				<Box mt={2}>
					<StyledButton
						onClick={() => fetchNextPage()}
						disabled={isFetchingNextPage}
						variant="contained"
						color="primary"
						endIcon={<MoreHorizIcon />}>
						{isFetchingNextPage ? '로딩 중...' : '더 보기'}
					</StyledButton>
				</Box>
			)}
		</StyledPaper>
	);
};

export default ArticleList;
