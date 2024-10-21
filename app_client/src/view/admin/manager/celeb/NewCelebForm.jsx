import React, { useState } from 'react';
import {
	TextField,
	Button,
	Grid,
	Autocomplete,
	Typography,
} from '@mui/material';
import { createCelebrity } from 'api/celebrityApi';
import { useProfession } from 'hooks/useProfession';
import { useCountries } from 'hooks/useCountries';

const NewCelebForm = ({ showSnackbar }) => {
	const professionNames = useProfession();
	const countries = useCountries();

	const getProfession = (job) => {
		const found = professionNames.find((ele) => ele.name === job);
		return found ? found.id : null;
	};

	const [formData, setFormData] = useState({
		name: '',
		prename: '',
		postname: '',
		profession_kor: '',
		gender: '',
		nationality: '',
		birth_date: '',
		death_date: '',
		biography: '',
		img_link: '',
		vid_link: '',
	});

	const [open, setOpen] = useState(false);

	const handleChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const handleCountryChange = (event, value) => {
		setFormData({ ...formData, nationality: value ? value.code : '' });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const newCeleb = {
				...formData,
				profession_id: getProfession(formData.profession_kor),
			};

			await createCelebrity(newCeleb);
			showSnackbar('새 유명인사가 추가되었습니다.');
			setFormData({
				name: '',
				prename: '',
				postname: '',
				profession_kor: '',
				gender: '',
				nationality: '',
				birth_date: '',
				death_date: '',
				biography: '',
				img_link: '',
				vid_link: '',
			});
		} catch (error) {
			showSnackbar('유명인사 추가에 실패했습니다.');
		}
	};

	return (
		<form onSubmit={handleSubmit}>
			<br />
			<Grid container spacing={2}>
				<Grid item xs={4} sm={4}>
					<TextField
						fullWidth
						label="prename"
						name="prename"
						value={formData.prename}
						onChange={handleChange}
					/>
				</Grid>

				<Grid item xs={4} sm={4}>
					<TextField
						fullWidth
						label="이름"
						name="name"
						value={formData.name}
						onChange={handleChange}
						required
					/>
				</Grid>

				<Grid item xs={4} sm={4}>
					<TextField
						fullWidth
						label="postname"
						name="postname"
						value={formData.postname}
						onChange={handleChange}
					/>
				</Grid>

				<Grid item xs={4} sm={4}>
					<TextField
						fullWidth
						label="직군"
						name="profession_kor"
						value={formData.profession_kor}
						onChange={handleChange}
						required
					/>
				</Grid>

				<Grid item xs={4} sm={4}>
					<TextField
						fullWidth
						label="성별"
						name="gender"
						value={formData.gender}
						onChange={handleChange}
					/>
				</Grid>

				<Grid item xs={4} sm={4}>
					<Autocomplete
						options={countries}
						getOptionLabel={(option) => `${option.name} (${option.code})`}
						renderInput={(params) => (
							<TextField
								{...params}
								label="국적"
								helperText="국가명이나 국가 코드를 입력하세요"
							/>
						)}
						onChange={handleCountryChange}
						value={
							countries.find(
								(country) => country.code === formData.nationality
							) || null
						}
						isOptionEqualToValue={(option, value) => option.code === value.code}
						filterOptions={(options, { inputValue }) => {
							const filterValue = inputValue.toLowerCase();
							return options.filter(
								(option) =>
									option.name.toLowerCase().includes(filterValue) ||
									option.code.toLowerCase().includes(filterValue)
							);
						}}
						onOpen={() => setOpen(true)}
						onClose={() => setOpen(false)}
						open={open}
						renderOption={(props, option) => (
							<li {...props}>
								<Typography variant="body1">{option.name}</Typography>
								<Typography variant="caption" color="textSecondary">
									&nbsp;({option.code})
								</Typography>
							</li>
						)}
					/>
				</Grid>

				<Grid item xs={6} sm={6}>
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

				<Grid item xs={6} sm={6}>
					<TextField
						fullWidth
						label="사망일"
						name="death_date"
						type="text"
						value={formData.death_date}
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
					<TextField
						fullWidth
						label="비디오 링크"
						name="vid_link"
						value={formData.vid_link}
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
