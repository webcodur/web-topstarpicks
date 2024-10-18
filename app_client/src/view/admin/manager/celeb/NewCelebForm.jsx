import React, { useState } from 'react';
import { TextField, Button, Grid } from '@mui/material';
import { createCelebrity } from 'api/celebrityApi';
import { useProfession } from 'hooks/useProfession';

const NewCelebForm = ({ showSnackbar }) => {
	const professionNames = useProfession();

	const getProfession = (job) => {
		const found = professionNames.find((ele) => ele.name === job);
		return found.id;
	};

	const [formData, setFormData] = useState({
		name: '',
		profession_kor: '',
		gender: '',
		nationality: '',
		birth_date: '',
		date_of_death: '',
		biography: '',
		img_link: '',
	});

	const handleChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const newCeleb = {
				...formData,
				profession_id: getProfession(formData.profession_kor),
			};

			console.log('newCeleb', newCeleb);

			await createCelebrity(newCeleb);
			showSnackbar('새 유명인사가 추가되었습니다.');
			setFormData({
				name: '',
				profession_kor: '',
				gender: '',
				nationality: '',
				birth_date: '',
				date_of_death: '',
				biography: '',
				img_link: '',
			});
		} catch (error) {
			showSnackbar('유명인사 추가에 실패했습니다.');
		}
	};

	return (
		<form onSubmit={handleSubmit}>
			<Grid container spacing={2}>
				<Grid item xs={12} sm={6}>
					<TextField
						fullWidth
						label="이름"
						name="name"
						value={formData.name}
						onChange={handleChange}
						required
					/>
				</Grid>
				<Grid item xs={12} sm={6}>
					<TextField
						fullWidth
						label="직군"
						name="profession_kor"
						value={formData.profession_kor}
						onChange={handleChange}
						required
					/>
				</Grid>
				<Grid item xs={12} sm={6}>
					<TextField
						fullWidth
						label="성별"
						name="gender"
						value={formData.gender}
						onChange={handleChange}
					/>
				</Grid>
				<Grid item xs={12} sm={6}>
					<TextField
						fullWidth
						label="국적"
						name="nationality"
						value={formData.nationality}
						onChange={handleChange}
					/>
				</Grid>
				<Grid item xs={12} sm={6}>
					<TextField
						fullWidth
						label="출생일"
						name="birth_date"
						type="text"
						value={formData.birth_date}
						onChange={handleChange}
						InputLabelProps={{ shrink: true }}
					/>
				</Grid>
				<Grid item xs={12} sm={6}>
					<TextField
						fullWidth
						label="사망일"
						name="date_of_death"
						type="text"
						value={formData.date_of_death}
						onChange={handleChange}
						InputLabelProps={{ shrink: true }}
					/>
				</Grid>
				<Grid item xs={12}>
					<TextField
						fullWidth
						label="약력"
						name="biography"
						value={formData.biography}
						onChange={handleChange}
						multiline
						rows={4}
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
					<Button type="submit" variant="contained" color="primary">
						유명인사 추가
					</Button>
				</Grid>
			</Grid>
		</form>
	);
};

export default NewCelebForm;
