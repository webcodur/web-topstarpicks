import React from 'react';
import {
	Grid,
	TextField,
	Autocomplete,
	FormControlLabel,
	Checkbox,
	Box,
	CardMedia,
} from '@mui/material';
import { formatDateString } from 'utils/dateUtils';
import { styles } from '../CelebForm.styles';
import { GENDER_OPTIONS } from '../CelebForm.constants';
import { getProfessionValue } from '../formUtils';
import { styled } from '@mui/material/styles';
import { alpha } from '@mui/material/styles';

const StyledFormControlLabel = styled(FormControlLabel)(({ theme }) => ({
	border: '1px solid rgba(0, 0, 0, 0.23)',
	borderRadius: '4px',
	margin: '0',
	padding: '8.5px 14px',
	width: '100%',
	transition: 'background-color 0.3s, border-color 0.3s',

	'&:hover': {
		borderColor: theme.palette.text.primary,
	},

	'& .MuiCheckbox-root': {
		padding: '0 9px 0 0',
	},

	'& .MuiFormControlLabel-label': {
		fontSize: '1rem',
	},

	'&.Mui-checked': {
		backgroundColor: alpha(theme.palette.primary.main, 0.1),
		borderColor: theme.palette.primary.main,
	},
}));

// 유명인사 정보 입력 필드들을 모아둔 컴포넌트
// 기본정보, 날짜, 텍스트 영역, 체크박스 등 모든 입력 필드 포함
const FormFields = ({
	formData,
	setFormData,
	professionNames = [],
	countries = [],
	isSubmitted,
	setOpen,
	open,
	setPreviewDialogOpen,
}) => {
	// options prop을 배열로 확실하게 변환
	const professionOptions = Array.isArray(professionNames)
		? professionNames
		: [];
	const countryOptions = Array.isArray(countries) ? countries : [];

	// 일반 입력 필드 값 변경 처리
	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData((prev) => ({ ...prev, [name]: value }));
	};

	return (
		<Grid container spacing={2} sx={styles.formContainer}>
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
					options={professionOptions}
					getOptionLabel={(option) => option?.name || ''}
					value={getProfessionValue(professionOptions, formData.profession_kor)}
					onChange={(event, newValue) => {
						setFormData((prev) => ({
							...prev,
							profession_kor: newValue ? newValue.name : '',
						}));
					}}
					renderInput={(params) => (
						<TextField
							{...params}
							label="직군"
							required
							error={isSubmitted && !formData.profession_kor}
							helperText={
								isSubmitted && !formData.profession_kor
									? '직군을 선택해주세요'
									: ''
							}
						/>
					)}
					isOptionEqualToValue={(option, value) => option?.id === value?.id}
					selectOnFocus
					handleHomeEndKeys
				/>
			</Grid>

			<Grid item xs={3}>
				<Autocomplete
					size="small"
					options={GENDER_OPTIONS}
					getOptionLabel={(option) => option.label}
					value={
						GENDER_OPTIONS.find((g) => g.value === formData.gender) || null
					}
					onChange={(event, newValue) => {
						setFormData((prev) => ({
							...prev,
							gender: newValue ? newValue.value : '',
						}));
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
				/>
			</Grid>

			<Grid item xs={6}>
				<Autocomplete
					size="small"
					options={countryOptions}
					getOptionLabel={(option) => `${option.name} (${option.code})`}
					value={
						countryOptions.find(
							(country) => country.name === formData.nationality
						) || null
					}
					onChange={(event, newValue) => {
						setFormData((prev) => ({
							...prev,
							nationality: newValue ? newValue.name : '',
						}));
					}}
					renderInput={(params) => (
						<TextField
							{...params}
							label="국적"
							required
							error={isSubmitted && !formData.nationality}
							helperText={
								isSubmitted && !formData.nationality
									? '국적을 선택해주세요'
									: ''
							}
						/>
					)}
					isOptionEqualToValue={(option, value) => option.name === value.name}
				/>
			</Grid>

			{/* Date Fields */}
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

			{/* Text Fields */}
			<Grid item xs={12}>
				<TextField
					size="small"
					fullWidth
					label="약력"
					name="biography"
					value={formData.biography}
					onChange={handleChange}
					multiline
					rows={3}
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
				{formData.img_link && (
					<Box sx={{ mt: 1, position: 'relative' }}>
						<CardMedia
							component="img"
							image={formData.img_link}
							alt="Celebrity preview"
							sx={styles.previewImage}
							onClick={() => setPreviewDialogOpen(true)}
							onError={(e) => {
								e.target.onerror = null;
								e.target.src = '/placeholder-image.jpg';
							}}
						/>
					</Box>
				)}
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

			{/* Checkboxes */}
			<Grid item xs={12} sm={6}>
				<StyledFormControlLabel
					control={
						<Checkbox
							checked={formData.is_real}
							onChange={(e) =>
								setFormData({ ...formData, is_real: e.target.checked })
							}
						/>
					}
					label="실존 인물"
					className={formData.is_real ? 'Mui-checked' : ''}
				/>
			</Grid>

			<Grid item xs={12} sm={6}>
				<StyledFormControlLabel
					control={
						<Checkbox
							checked={formData.is_fictional}
							onChange={(e) =>
								setFormData({ ...formData, is_fictional: e.target.checked })
							}
						/>
					}
					label="가상 인물"
					className={formData.is_fictional ? 'Mui-checked' : ''}
				/>
			</Grid>
		</Grid>
	);
};

export default FormFields;
