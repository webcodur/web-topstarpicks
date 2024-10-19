import React, { useState } from 'react';
import {
	TextField,
	Button,
	Grid,
	Select,
	MenuItem,
	FormControl,
	InputLabel,
	Box,
	Typography,
} from '@mui/material';
import { createRecommendation } from 'api/recommendationApi';
import { useContentNames } from 'hooks/useContentNames';
import { fetchPersonInfo } from 'api/celebrityApi';

const NewRecsForm = ({ showSnackbar }) => {
	const [celebName, setCelebName] = useState('');
	const [celebId, setCelebId] = useState('');
	const [formData, setFormData] = useState({
		celebrity_id: '',
		content_id: 1,
		title: '',
		creator: '',
		release_date: '',
		recommendation_text: '',
		recommendation_source: '',
		img_link: '',
		affiliate_link: '',
		mediaDescription: '',
	});
	const contentNames = useContentNames();

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData({ ...formData, [name]: value });
	};

	const handleChangeCelebName = (e) => {
		setCelebName(e.target.value);
	};

	const handleSubmitRecs = async (e) => {
		e.preventDefault();
		try {
			await createRecommendation(formData);
			showSnackbar('새 추천 정보가 추가되었습니다.');
			setFormData({
				...formData,
				celebrity_id: celebId,
				title: '',
				creator: '',
				release_date: '',
				recommendation_text: '',
				recommendation_source: '',
				img_link: '',
				affiliate_link: '',
				mediaDescription: '',
			});
		} catch (error) {
			showSnackbar('추천 정보 추가에 실패했습니다.');
		}
	};

	const handleSubmitName = async (e) => {
		e.preventDefault();
		const celebrityInfo = await fetchPersonInfo(celebName);
		setCelebId(celebrityInfo[0].id);
	};

	const clearField = () => {
		setFormData({
			celebrity_id: '',
			content_id: 1,
			title: '',
			creator: '',
			release_date: '',
			recommendation_text: '',
			recommendation_source: '',
			img_link: '',
			affiliate_link: '',
			mediaDescription: '',
		});
	};

	return (
		<Box maxWidth="md" margin="auto">
			<Typography variant="h6" gutterBottom>
				새 추천 정보 추가
			</Typography>
			<form onSubmit={handleSubmitName}>
				<Grid container spacing={2} alignItems="center">
					<Grid item xs={8}>
						<TextField
							fullWidth
							size="small"
							label="유명인사 이름"
							name="celeb"
							value={celebName}
							onChange={handleChangeCelebName}
							required
						/>
					</Grid>
					<Grid item xs={4}>
						<Button
							type="submit"
							variant="contained"
							color="primary"
							size="small">
							셀럽 정보 확인
						</Button>
					</Grid>
				</Grid>
			</form>

			{celebId > 0 && (
				<form onSubmit={handleSubmitRecs}>
					<Grid container spacing={2} mt={2}>
						<Grid item xs={12} sm={6}>
							<TextField
								fullWidth
								size="small"
								label="제목"
								name="title"
								value={formData.title}
								onChange={handleChange}
								required
							/>
						</Grid>
						<Grid item xs={12} sm={6}>
							<FormControl fullWidth size="small">
								<InputLabel id="content-type-label">컨텐츠 타입</InputLabel>
								<Select
									labelId="content-type-label"
									name="content_id"
									value={formData.content_id}
									onChange={handleChange}
									required
									label="컨텐츠 타입">
									{Object.values(contentNames).map((type) => (
										<MenuItem key={type.name} value={type.id}>
											{type.name}
										</MenuItem>
									))}
								</Select>
							</FormControl>
						</Grid>
						<Grid item xs={12} sm={6}>
							<TextField
								fullWidth
								size="small"
								label="제작자"
								name="creator"
								value={formData.creator}
								onChange={handleChange}
							/>
						</Grid>
						<Grid item xs={12} sm={6}>
							<TextField
								fullWidth
								size="small"
								label="출시일"
								name="release_date"
								type="text"
								placeholder="0000-00-00"
								value={formData.release_date}
								onChange={handleChange}
								InputLabelProps={{ shrink: true }}
							/>
						</Grid>
						<Grid item xs={12}>
							<TextField
								fullWidth
								size="small"
								label="추천 이유"
								name="recommendation_text"
								value={formData.recommendation_text}
								onChange={handleChange}
								multiline
								minRows={3}
								maxRows={12}
								required
							/>
						</Grid>
						<Grid item xs={12}>
							<TextField
								fullWidth
								size="small"
								label="미디어 설명"
								name="mediaDescription"
								value={formData.mediaDescription}
								onChange={handleChange}
								multiline
								minRows={3}
								maxRows={12}
							/>
						</Grid>
						<Grid item xs={4}>
							<TextField
								fullWidth
								size="small"
								label="출처"
								name="recommendation_source"
								value={formData.recommendation_source}
								onChange={handleChange}
								InputProps={{
									style: {
										whiteSpace: 'nowrap',
										overflow: 'hidden',
										textOverflow: 'ellipsis',
									},
								}}
							/>
						</Grid>
						<Grid item xs={4}>
							<TextField
								fullWidth
								size="small"
								label="이미지 링크"
								name="img_link"
								value={formData.img_link}
								onChange={handleChange}
								InputProps={{
									style: {
										whiteSpace: 'nowrap',
										overflow: 'hidden',
										textOverflow: 'ellipsis',
									},
								}}
							/>
						</Grid>
						<Grid item xs={4}>
							<TextField
								fullWidth
								size="small"
								label="제휴 링크"
								name="affiliate_link"
								value={formData.affiliate_link}
								onChange={handleChange}
								InputProps={{
									style: {
										whiteSpace: 'nowrap',
										overflow: 'hidden',
										textOverflow: 'ellipsis',
									},
								}}
							/>
						</Grid>
						<Grid item xs={12}>
							<Button
								type="submit"
								variant="contained"
								color="primary"
								size="small">
								추천 정보 추가
							</Button>
							<Button
								type="button"
								variant="contained"
								color="secondary"
								size="small"
								onClick={clearField}
								sx={{ ml: 1 }}>
								필드 클리어
							</Button>
						</Grid>
					</Grid>
				</form>
			)}
		</Box>
	);
};

export default NewRecsForm;
