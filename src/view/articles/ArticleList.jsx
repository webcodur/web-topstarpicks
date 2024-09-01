import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { Typography, Box } from '@mui/material';
import { StyledPaper, StyledButton } from './ArticlesStyles';
import ArticleItem from './ArticleItem';
import ArticleForm from './ArticleForm';
import { articleService } from './articleService';
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';

const ArticleList = () => {
	const [articles, setArticles] = useState([]);
	const [page, setPage] = useState(1);
	const [hasMore, setHasMore] = useState(false);
	const [isCreating, setIsCreating] = useState(false);

	const fetchArticles = useCallback(async () => {
		try {
			const newArticles = await articleService.getAll(page);
			if (newArticles.length === 0) {
				setHasMore(false);
			} else {
				setArticles((prevArticles) => [...prevArticles, ...newArticles]);
				setPage((prevPage) => prevPage + 1);
			}
		} catch (error) {
			console.error('게시글 불러오기 오류:', error);
		}
	}, [page]);

	useEffect(() => {
		fetchArticles();
	}, [fetchArticles]);

	const handleCreate = useCallback(async (newArticle) => {
		try {
			const createdArticle = await articleService.create({
				...newArticle,
				createdAt: new Date().toISOString(),
				updatedAt: new Date().toISOString(),
			});
			setArticles((prevArticles) => [createdArticle, ...prevArticles]);
			setIsCreating(false);
		} catch (error) {
			console.error('게시글 작성 오류:', error);
		}
	}, []);

	const handleUpdate = useCallback(async (updatedArticle) => {
		try {
			const updated = await articleService.update(updatedArticle.id, {
				...updatedArticle,
				updatedAt: new Date().toISOString(),
			});
			setArticles((prevArticles) =>
				prevArticles.map((article) =>
					article.id === updated.id ? updated : article
				)
			);
		} catch (error) {
			console.error('게시글 수정 오류:', error);
		}
	}, []);

	const handleDelete = useCallback(async (id) => {
		try {
			await articleService.delete(id);
			const updatedArticles = await articleService.getAll(1);
			setArticles(updatedArticles);
			setPage(2);
		} catch (error) {
			console.error('게시글 삭제 오류:', error);
		}
	}, []);

	const memoizedArticles = useMemo(
		() =>
			articles.map((article) => (
				<ArticleItem
					key={article.id}
					article={article}
					onUpdate={handleUpdate}
					onDelete={handleDelete}
				/>
			)),
		[articles, handleUpdate, handleDelete]
	);

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
			{isCreating && <ArticleForm onSubmit={handleCreate} />}
			{memoizedArticles}
			{hasMore && (
				<Box mt={2}>
					<StyledButton
						onClick={fetchArticles}
						variant="contained"
						color="primary"
						endIcon={<MoreHorizIcon />}>
						더 보기
					</StyledButton>
				</Box>
			)}
		</StyledPaper>
	);
};

export default ArticleList;
