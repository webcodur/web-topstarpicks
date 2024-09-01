import React, { useCallback } from 'react';
import { Box } from '@mui/material';
import { StyledForm, StyledTextField, StyledButton } from './ArticlesStyles';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';

const ArticleForm = ({
	onSubmit,
	onCancel,
	initialValues = { title: '', content: '' },
}) => {
	const [article, setArticle] = React.useState(initialValues);

	const handleSubmit = useCallback(
		(e) => {
			e.preventDefault();
			onSubmit(article);
			setArticle({ title: '', content: '' });
		},
		[article, onSubmit]
	);

	const handleChange = useCallback((e) => {
		const { name, value } = e.target;
		setArticle((prev) => ({ ...prev, [name]: value }));
	}, []);

	return (
		<StyledForm onSubmit={handleSubmit}>
			<StyledTextField
				label="제목"
				name="title"
				value={article.title}
				onChange={handleChange}
				required
			/>
			<StyledTextField
				label="내용"
				name="content"
				multiline
				rows={4}
				value={article.content}
				onChange={handleChange}
				required
			/>
			<Box
				style={{
					display: 'flex',
					justifyContent: 'center',
				}}>
				<StyledButton
					type="submit"
					variant="contained"
					color="primary"
					startIcon={<CheckIcon />}>
					{initialValues.id ? '수정 완료' : '작성 완료'}
				</StyledButton>
				{initialValues.id && (
					<StyledButton
						onClick={onCancel}
						variant="outlined"
						startIcon={<CloseIcon />}>
						취소
					</StyledButton>
				)}
			</Box>
		</StyledForm>
	);
};

export default React.memo(ArticleForm);
