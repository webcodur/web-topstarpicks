import React, { useState, useCallback } from 'react';
import { Typography, Box, IconButton, Menu, MenuItem } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { ArticleItem as StyledArticleItem } from './ArticlesStyles';
import ArticleForm from './ArticleForm';

const ArticleItem = React.memo(({ article, onUpdate, onDelete }) => {
	const [isEditing, setIsEditing] = useState(false);
	const [anchorEl, setAnchorEl] = useState(null);

	const handleUpdate = useCallback(
		(updatedArticle) => {
			if (updatedArticle) {
				onUpdate({ ...updatedArticle, id: article.id });
			}
			setIsEditing(false);
		},
		[article.id, onUpdate]
	);

	const handleEdit = useCallback(() => {
		setIsEditing(true);
		setAnchorEl(null);
	}, []);

	const handleDelete = useCallback(() => {
		onDelete(article.id);
		setAnchorEl(null);
	}, [article.id, onDelete]);

	const handleMenuOpen = (event) => {
		setAnchorEl(event.currentTarget);
	};

	const handleMenuClose = () => {
		setAnchorEl(null);
	};

	const handleCancelEdit = () => {
		setIsEditing(false);
	};

	if (isEditing) {
		return (
			<StyledArticleItem>
				<ArticleForm
					onSubmit={handleUpdate}
					initialValues={article}
					onCancel={handleCancelEdit}
				/>
			</StyledArticleItem>
		);
	}

	return (
		<StyledArticleItem>
			<Box display="flex" justifyContent="space-between" alignItems="center">
				<Typography variant="h6">{article.title}</Typography>
				<IconButton onClick={handleMenuOpen}>
					<MoreVertIcon />
				</IconButton>
			</Box>
			<Menu
				anchorEl={anchorEl}
				open={Boolean(anchorEl)}
				onClose={handleMenuClose}>
				<MenuItem onClick={handleEdit}>
					<EditIcon fontSize="small" style={{ marginRight: '8px' }} />
					수정
				</MenuItem>
				<MenuItem onClick={handleDelete}>
					<DeleteIcon fontSize="small" style={{ marginRight: '8px' }} />
					삭제
				</MenuItem>
			</Menu>
			<Typography variant="body1" paragraph>
				{article.content}
			</Typography>
			<Typography variant="caption">
				작성: {new Date(article.createdAt).toLocaleString()}
			</Typography>
			<br />
			<Typography variant="caption">
				수정: {new Date(article.updatedAt).toLocaleString()}
			</Typography>
		</StyledArticleItem>
	);
});

export default ArticleItem;
