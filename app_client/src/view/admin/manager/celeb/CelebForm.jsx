import React, { useState } from 'react';
import {
	TextField,
	Button,
	Grid,
	Autocomplete,
	Typography,
	FormControlLabel,
	Checkbox,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
	Paper,
	List,
	ListItem,
	ListItemText,
} from '@mui/material';
import {
	createCelebrity,
	updateCelebrity,
	deleteCelebrity,
	searchCelebrities,
	fetchPersonInfo,
	fetchCelebrityById,
} from 'api/celebrityApi';
import { useProfession } from 'hooks/useProfession';
import { useCountries } from 'hooks/useCountries';
import { formatDateString } from 'utils/dateUtils';

const CelebForm = ({ showSnackbar }) => {
	const professionNames = useProfession() || [];
	const countries = useCountries() || [];
	const [selectedCeleb, setSelectedCeleb] = useState(null);
	const [searchQuery, setSearchQuery] = useState('');
	const [searchResults, setSearchResults] = useState([]);
	const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
	const [mode, setMode] = useState('create');
	const [open, setOpen] = useState(false);

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

	const getProfession = (job) => {
		if (!professionNames || !job) return null;
		const found = professionNames.find((ele) => ele.name === job);
		return found ? found.id : null;
	};

	// 검색 결과 처리
	const handleSearch = () => {
		console.log('Search button clicked');
		if (searchQuery.length < 2) {
			alert('2글자 이상 입력해주세요.');
			return;
		}

		searchCelebrities(searchQuery)
			.then((response) => {
				if (response.length === 1) {
					handleResultClick(response[0]);
				} else {
					setSearchResults(response);
				}
			})
			.catch((error) => {
				console.error('Search error:', error);
				showSnackbar('검색 중 오류가 발생했습니다.', 'error');
				setSearchResults([]);
			});
	};

	// 검색어 입력 처리
	const handleSearchInputChange = (e) => {
		setSearchQuery(e.target.value);
	};

	// 검색 결과 선택 처리
	const handleResultClick = async (celeb) => {
		try {
			// ID로 셀럽의 전체 정보를 가져옴

			const response = await fetchCelebrityById(celeb.id);
			// console.log('response', response);
			const fullCelebData = response;

			if (fullCelebData) {
				setSelectedCeleb(fullCelebData);
				setFormData({
					name: fullCelebData.name || '',
					prename: fullCelebData.prename || '',
					postname: fullCelebData.postname || '',
					profession_kor: fullCelebData.profession || '',
					gender: fullCelebData.gender || '',
					nationality: fullCelebData.nationality || '',
					birth_date: fullCelebData.birth_date || '',
					death_date: fullCelebData.death_date || '',
					biography: fullCelebData.biography || '',
					img_link: fullCelebData.img_link || '',
					vid_link: fullCelebData.vid_link || '',
					book_story: fullCelebData.book_story || '',
					quotes: fullCelebData.quotes || '',
					is_historical: Boolean(fullCelebData.is_historical),
					is_fictional: Boolean(fullCelebData.is_fictional),
				});
				setMode('edit');
				setSearchResults([]);
				setSearchQuery('');
			} else {
				showSnackbar('유명인사 정보를 가져오는데 실패했습니다.', 'error');
			}
		} catch (error) {
			console.error('Error fetching celebrity details:', error);
			showSnackbar('유명인사 정보를 가져오는데 실패했습니다.', 'error');
		}
	};

	const handleChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const handleCountryChange = (event, value) => {
		setFormData({ ...formData, nationality: value ? value.code : '' });
	};

	// 수정 모드로 전환
	const handleEdit = () => {
		setMode('edit');
	};

	// 삭제 다이얼로그 열기
	const handleDeleteClick = () => {
		setDeleteDialogOpen(true);
	};

	// 삭제 처리
	const handleDelete = async () => {
		try {
			await deleteCelebrity(selectedCeleb.id);
			showSnackbar('유명인사가 삭제되었습니다.');
			handleReset();
		} catch (error) {
			showSnackbar('삭제 중 오류가 발생했습니다.', 'error');
		}
		setDeleteDialogOpen(false);
	};

	// 폼 초기화
	const handleReset = () => {
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
		setSelectedCeleb(null);
		setMode('create');
		setSearchQuery('');
		setSearchResults([]);
	};

	// 폼 제출 처리
	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const celebData = {
				...formData,
				profession_id: getProfession(formData.profession_kor),
			};

			if (mode === 'edit') {
				await updateCelebrity(selectedCeleb.id, celebData);
				showSnackbar('유명인사 정보가 수정되었습니다.');
			} else {
				await createCelebrity(celebData);
				showSnackbar('새 유명인사가 추가되었습니다.');
			}
			handleReset();
		} catch (error) {
			showSnackbar(
				mode === 'edit'
					? '유명인사 수정에 실패했습니다.'
					: '유명인사 추가에 실패했습니다.',
				'error'
			);
		}
	};

	const genderOptions = [
		{ value: '남성', label: '남성' },
		{ value: '여성', label: '여' },
	];

	const getProfessionValue = () => {
		if (!professionNames || !formData.profession_kor) return null;
		return (
			professionNames.find((p) => p.name === formData.profession_kor) || null
		);
	};

	return (
		<>
			{/* 검색 영역 */}
			<Grid container spacing={2} sx={{ maxWidth: '800px', margin: '0 auto' }}>
				<Grid item xs={9}>
					<TextField
						fullWidth
						size="small"
						label="유명인사 검색"
						value={searchQuery}
						onChange={(e) => setSearchQuery(e.target.value)}
						onKeyPress={(e) => {
							if (e.key === 'Enter') {
								e.preventDefault();
								handleSearch();
							}
						}}
					/>
				</Grid>
				<Grid item xs={3}>
					<Button
						fullWidth
						variant="contained"
						onClick={handleSearch}
						size="medium">
						검색
					</Button>
				</Grid>

				{/* 검색 결과가 2개 이상일 때만 목록 표시 */}
				{searchResults.length > 1 && (
					<Grid item xs={12}>
						<Paper
							sx={{
								maxHeight: 200,
								overflow: 'auto',
								mt: 1,
								border: '1px solid #ddd',
							}}>
							<List>
								{searchResults.map((result) => (
									<ListItem
										key={result.id}
										onClick={() => handleResultClick(result)}>
										<ListItemText
											primary={`${result.prename || ''} ${result.name} ${
												result.postname || ''
											}`}
											secondary={result.profession_kor}
										/>
									</ListItem>
								))}
							</List>
						</Paper>
					</Grid>
				)}
			</Grid>

			{/* 폼 영역 */}
			<form onSubmit={handleSubmit}>
				<br />
				<Grid
					container
					spacing={2}
					sx={{ maxWidth: '800px', margin: '0 auto' }}>
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
							getOptionLabel={(option) => option?.name || ''}
							value={getProfessionValue()}
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
							isOptionEqualToValue={(option, value) =>
								option.code === value.code
							}
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

					{/* 버튼 영역 수정 */}
					<Grid item xs={12} sx={{ textAlign: 'center', mt: 2 }}>
						{selectedCeleb ? (
							// 선택된 셀럽이 있을 때 (수정/삭제 모드)
							<>
								<Button
									type="submit"
									variant="contained"
									color="primary"
									sx={{ mr: 1 }}>
									수정 완료
								</Button>
								<Button
									variant="contained"
									color="error"
									onClick={handleDeleteClick}
									sx={{ mr: 1 }}>
									삭제
								</Button>
								<Button variant="outlined" onClick={handleReset} sx={{ ml: 1 }}>
									초기화
								</Button>
							</>
						) : (
							// 선택된 셀럽이 없을 때 (추가 모드)
							<>
								<Button
									type="submit"
									variant="contained"
									color="primary"
									sx={{ mr: 1 }}>
									유명인사 추가
								</Button>
								<Button variant="outlined" onClick={handleReset} sx={{ ml: 1 }}>
									초기화
								</Button>
							</>
						)}
					</Grid>
				</Grid>
			</form>

			{/* 삭제 다이얼로그 */}
			<Dialog
				open={deleteDialogOpen}
				onClose={() => setDeleteDialogOpen(false)}>
				<DialogTitle>유명인사 삭제</DialogTitle>
				<DialogContent>
					<DialogContentText>
						정말로 이 유명인사를 삭제하시겠습니까?
					</DialogContentText>
				</DialogContent>
				<DialogActions>
					<Button onClick={() => setDeleteDialogOpen(false)}>취소</Button>
					<Button onClick={handleDelete} color="error" autoFocus>
						삭제
					</Button>
				</DialogActions>
			</Dialog>
		</>
	);
};

export default CelebForm;
