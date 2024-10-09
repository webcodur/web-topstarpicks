import React, { useState, useEffect } from 'react';
import {
	TextField,
	Button,
	Grid,
	Select,
	MenuItem,
	FormControl,
	InputLabel,
} from '@mui/material';
import { createRecommendation } from 'api/recommendationApi';
import { fetchAllCelebrities } from 'api/celebrityApi';

const categoriesMap = {
	book: '책',
	movie: '영화',
	game: '게임',
	music: '음악',
	webtoon: '웹툰',
	anime: '애니',
	restaurant: '맛집',
};

const NewRecsForm = ({ showSnackbar }) => {
	const [formData, setFormData] = useState({
		celebrity_id: '',
		content_id: '',
		content_name: '',
		title: '',
		creator: '',
		release_date: '',
		recommendation_text: '',
		recommendation_source: '',
		img_link: '',
		affiliate_link: '',
		mediaDescription: '',
	});

	const [celebrities, setCelebrities] = useState([]);

	useEffect(() => {
		const fetchCelebs = async () => {
			try {
				const celebs = await fetchAllCelebrities();
				setCelebrities(celebs);
			} catch (error) {
				showSnackbar('유명인사 정보를 불러오는 데 실패했습니다.');
			}
		};
		fetchCelebs();
	}, [showSnackbar]);

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData({ ...formData, [name]: value });
		if (name === 'content_name') {
			setFormData((prev) => ({
				...prev,
				content_id:
					Object.keys(categoriesMap).find(
						(key) => categoriesMap[key] === value
					) || '',
			}));
		}
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			await createRecommendation(formData);
			showSnackbar('새 추천 정보가 추가되었습니다.');
			setFormData({
				celebrity_id: '',
				content_id: '',
				content_name: '',
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

	return (
		<form onSubmit={handleSubmit}>
			<Grid container spacing={2}>
				<Grid item xs={12} sm={6}>
					<FormControl fullWidth>
						<InputLabel>유명인사</InputLabel>
						<Select
							name="celebrity_id"
							value={formData.celebrity_id}
							onChange={handleChange}
							required>
							{celebrities.map((celebrity) => (
								<MenuItem key={celebrity.id} value={celebrity.id}>
									{celebrity.name}
								</MenuItem>
							))}
						</Select>
					</FormControl>
				</Grid>
				<Grid item xs={12} sm={6}>
					<FormControl fullWidth>
						<InputLabel>컨텐츠 타입</InputLabel>
						<Select
							name="content_name"
							value={formData.content_name}
							onChange={handleChange}
							required>
							{Object.values(categoriesMap).map((type) => (
								<MenuItem key={type} value={type}>
									{type}
								</MenuItem>
							))}
						</Select>
					</FormControl>
				</Grid>
				<Grid item xs={12}>
					<TextField
						fullWidth
						label="제목"
						name="title"
						value={formData.title}
						onChange={handleChange}
						required
					/>
				</Grid>
				<Grid item xs={12} sm={6}>
					<TextField
						fullWidth
						label="제작자"
						name="creator"
						value={formData.creator}
						onChange={handleChange}
					/>
				</Grid>
				<Grid item xs={12} sm={6}>
					<TextField
						fullWidth
						label="출시일"
						name="release_date"
						type="date"
						value={formData.release_date}
						onChange={handleChange}
						InputLabelProps={{ shrink: true }}
					/>
				</Grid>
				<Grid item xs={12}>
					<TextField
						fullWidth
						label="추천 이유"
						name="recommendation_text"
						value={formData.recommendation_text}
						onChange={handleChange}
						multiline
						rows={4}
						required
					/>
				</Grid>
				<Grid item xs={12}>
					<TextField
						fullWidth
						label="출처"
						name="recommendation_source"
						value={formData.recommendation_source}
						onChange={handleChange}
					/>
				</Grid>
				<Grid item xs={12}>
					<TextField
						fullWidth
						label="이미지 링크"
						name="img_link"
						value={formData.img_link}
						onChange={handleChange}
					/>
				</Grid>
				<Grid item xs={12}>
					<TextField
						fullWidth
						label="제휴 링크"
						name="affiliate_link"
						value={formData.affiliate_link}
						onChange={handleChange}
					/>
				</Grid>
				<Grid item xs={12}>
					<TextField
						fullWidth
						label="미디어 설명"
						name="mediaDescription"
						value={formData.mediaDescription}
						onChange={handleChange}
						multiline
						rows={4}
					/>
				</Grid>
				<Grid item xs={12}>
					<Button type="submit" variant="contained" color="primary">
						추천 정보 추가
					</Button>
				</Grid>
			</Grid>
		</form>
	);
};

export default NewRecsForm;
