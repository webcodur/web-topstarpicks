import React, { useState } from 'react';
import {
	TextField,
	Button,
	Grid,
	Autocomplete,
	Typography,
	FormControlLabel,
	Checkbox,
} from '@mui/material';
import { createCelebrity } from 'api/celebrityApi';
import { useProfession } from 'hooks/useProfession';
import { useCountries } from 'hooks/useCountries';

const formatDateString = (dateStr) => {
	if (!dateStr) return '';

	// 기본 형식이 이미 YYYY-MM-DD 인 경우 그대로 반환
	if (/^-?\d{1,4}-\d{2}-\d{2}$/.test(dateStr)) {
		return dateStr;
	}

	// 기원전 여부 확인
	const isBC = dateStr.includes('기원전');

	// 년도 추출 (숫자만)
	const yearMatch = dateStr.match(/(\d+)년?/);
	if (!yearMatch) return '';

	let year = yearMatch[1];
	// 4자리로 맞추기
	year = year.padStart(4, '0');

	// 기원전인 경우 음수로 변환
	if (isBC) {
		year = '-' + year;
	}

	// 월 추출
	const monthMatch = dateStr.match(/(\d{1,2})월/);
	const month = monthMatch ? monthMatch[1].padStart(2, '0') : '01';

	// 일 추출
	const dayMatch = dateStr.match(/(\d{1,2})일/);
	const day = dayMatch ? dayMatch[1].padStart(2, '0') : '01';

	return `${year}-${month}-${day}`;
};

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
		book_story: '',
		quotes: '',
		is_historical: false,
		is_fictional: false,
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
				book_story: '',
				quotes: '',
				is_historical: false,
				is_fictional: false,
			});
		} catch (error) {
			showSnackbar('유명인사 추가에 실패했습니다.');
		}
	};

	const genderOptions = [
		{ value: '남성', label: '남성' },
		{ value: '여성', label: '여성' },
	];

	return (
		<form onSubmit={handleSubmit}>
			<br />
			<Grid container spacing={2} sx={{ maxWidth: '800px', margin: '0 auto' }}>
				<Grid item xs={3}>
					<TextField
						size="small"
						fullWidth
						label="prename"
						name="prename"
						value={formData.prename}
						onChange={handleChange}
					/>
				</Grid>

				<Grid item xs={3}>
					<TextField
						size="small"
						fullWidth
						label="이름"
						name="name"
						value={formData.name}
						onChange={handleChange}
						required
					/>
				</Grid>

				<Grid item xs={3}>
					<TextField
						size="small"
						fullWidth
						label="postname"
						name="postname"
						value={formData.postname}
						onChange={handleChange}
					/>
				</Grid>

				<Grid item xs={3}>
					<Autocomplete
						size="small"
						options={professionNames}
						getOptionLabel={(option) => option.name}
						value={
							professionNames.find((p) => p.name === formData.profession_kor) ||
							null
						}
						onChange={(event, newValue) => {
							setFormData({
								...formData,
								profession_kor: newValue ? newValue.name : '',
							});
						}}
						renderInput={(params) => (
							<TextField {...params} label="직군" required />
						)}
						selectOnFocus
						handleHomeEndKeys
						onKeyDown={(event) => {
							if (
								event.key === 'Enter' &&
								event.target.getAttribute('aria-expanded') === 'true'
							) {
								const highlightedOption = document.querySelector(
									'[aria-selected="true"]'
								);
								if (highlightedOption) {
									const optionValue = highlightedOption.textContent;
									const selectedProfession = professionNames.find(
										(p) => p.name === optionValue
									);
									if (selectedProfession) {
										setFormData({
											...formData,
											profession_kor: selectedProfession.name,
										});
									}
									event.preventDefault();
								}
							}
						}}
					/>
				</Grid>

				<Grid item xs={3}>
					<Autocomplete
						size="small"
						options={genderOptions}
						getOptionLabel={(option) => option.label}
						value={
							genderOptions.find((g) => g.value === formData.gender) || null
						}
						onChange={(event, newValue) => {
							setFormData({
								...formData,
								gender: newValue ? newValue.value : '',
							});
						}}
						renderInput={(params) => (
							<TextField
								{...params}
								label="성별"
								required
								onKeyDown={(e) => {
									if (e.key === 'Enter') {
										e.stopPropagation();
									}
								}}
							/>
						)}
						selectOnFocus
						handleHomeEndKeys
						onKeyDown={(event) => {
							if (
								event.key === 'Enter' &&
								event.target.getAttribute('aria-expanded') === 'true'
							) {
								const highlightedOption = document.querySelector(
									'[aria-selected="true"]'
								);
								if (highlightedOption) {
									const optionValue = highlightedOption.textContent;
									const selectedGender = genderOptions.find(
										(g) => g.label === optionValue
									);
									if (selectedGender) {
										setFormData({
											...formData,
											gender: selectedGender.value,
										});
									}
									event.preventDefault();
								}
							}
						}}
					/>
				</Grid>

				<Grid item xs={6}>
					<Autocomplete
						size="small"
						options={countries}
						getOptionLabel={(option) => `${option.name} (${option.code})`}
						renderInput={(params) => (
							<TextField
								{...params}
								size="small"
								label="국적"
								helperText="국가명이나 국가 코드를 입력하세요"
								onKeyDown={(e) => {
									if (e.key === 'Enter') {
										e.stopPropagation();
									}
								}}
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
						selectOnFocus
						handleHomeEndKeys
						onKeyDown={(event) => {
							if (
								event.key === 'Enter' &&
								event.target.getAttribute('aria-expanded') === 'true'
							) {
								const highlightedOption = document.querySelector(
									'[aria-selected="true"]'
								);
								if (highlightedOption) {
									const countryName =
										highlightedOption.querySelector('body1')?.textContent;
									const selectedCountry = countries.find(
										(c) => c.name === countryName
									);
									if (selectedCountry) {
										setFormData({
											...formData,
											nationality: selectedCountry.code,
										});
									}
									event.preventDefault();
								}
							}
						}}
					/>
				</Grid>

				<Grid item xs={6}>
					<TextField
						size="small"
						fullWidth
						label="출생일"
						name="birth_date"
						type="text"
						value={formData.birth_date}
						onChange={handleChange}
						onBlur={(e) => {
							const formattedDate = formatDateString(e.target.value);
							setFormData((prev) => ({
								...prev,
								birth_date: formattedDate,
							}));
						}}
						InputLabelProps={{ shrink: true }}
					/>
				</Grid>

				<Grid item xs={6}>
					<TextField
						size="small"
						fullWidth
						label="사망일"
						name="death_date"
						type="text"
						value={formData.death_date}
						onChange={handleChange}
						onBlur={(e) => {
							const formattedDate = formatDateString(e.target.value);
							setFormData((prev) => ({
								...prev,
								death_date: formattedDate,
							}));
						}}
						InputLabelProps={{ shrink: true }}
					/>
				</Grid>

				<Grid item xs={12}>
					<TextField
						size="small"
						fullWidth
						label="약력"
						name="biography"
						value={formData.biography}
						onChange={handleChange}
					/>
				</Grid>

				<Grid item xs={6}>
					<TextField
						size="small"
						fullWidth
						label="이미지 링크"
						name="img_link"
						value={formData.img_link}
						onChange={handleChange}
					/>
				</Grid>

				<Grid item xs={6}>
					<TextField
						size="small"
						fullWidth
						label="비디오 링크"
						name="vid_link"
						value={formData.vid_link}
						onChange={handleChange}
					/>
				</Grid>

				<Grid item xs={6}>
					<TextField
						size="small"
						fullWidth
						label="도서/이야기"
						name="book_story"
						value={formData.book_story}
						onChange={handleChange}
						multiline
						rows={3}
					/>
				</Grid>

				<Grid item xs={6}>
					<TextField
						size="small"
						fullWidth
						label="명언"
						name="quotes"
						value={formData.quotes}
						onChange={handleChange}
						multiline
						rows={3}
					/>
				</Grid>

				<Grid item xs={6} sx={{ display: 'flex', alignItems: 'center' }}>
					<FormControlLabel
						control={
							<Checkbox
								size="small"
								checked={formData.is_historical}
								onChange={(e) =>
									setFormData({
										...formData,
										is_historical: e.target.checked,
									})
								}
								name="is_historical"
							/>
						}
						label="역사적 인물"
					/>
				</Grid>

				<Grid item xs={6} sx={{ display: 'flex', alignItems: 'center' }}>
					<FormControlLabel
						control={
							<Checkbox
								size="small"
								checked={formData.is_fictional}
								onChange={(e) =>
									setFormData({
										...formData,
										is_fictional: e.target.checked,
									})
								}
								name="is_fictional"
							/>
						}
						label="가상 인물"
					/>
				</Grid>

				<Grid item xs={12} sx={{ textAlign: 'center' }}>
					<Button
						type="submit"
						variant="contained"
						color="primary"
						size="medium">
						유명인사 추가
					</Button>
				</Grid>
			</Grid>
		</form>
	);
};

export default NewCelebForm;
