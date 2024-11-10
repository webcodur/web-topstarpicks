import React, { useState } from 'react';
import {
	createCelebrity,
	updateCelebrity,
	deleteCelebrity,
	searchCelebrities,
	fetchCelebrityById,
	fetchCelebrityInfoByGPT,
} from 'api/celebrityApi';
import { useProfession } from 'hooks/useProfession';
import { useCountries } from 'hooks/useCountries';
import { INITIAL_FORM_DATA } from './CelebForm.constants';
import { getProfession } from './formUtils';
import DeleteDialog from './components/DeleteDialog';
import ImagePreviewDialog from './components/ImagePreviewDialog';
import ModeToggle from './components/ModeToggle';
import SearchSection from './components/SearchSection';
import FormFields from './components/FormFields';
import FormButtons from './components/FormButtons';
import GPTSection from './components/GPTSection';
import { getCountryName } from 'utils/professionUtils';

const CelebForm = ({ showSnackbar }) => {
	const countriesResponse = useCountries();
	const professionResponse = useProfession();

	const countries = countriesResponse?.data || [];
	const professionNames = professionResponse?.data || [];

	const [mode, setMode] = useState('create');
	const [selectedCeleb, setSelectedCeleb] = useState(null);

	const [searchQuery, setSearchQuery] = useState('');
	const [searchResults, setSearchResults] = useState([]);

	const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
	const [previewDialogOpen, setPreviewDialogOpen] = useState(false);

	const [formData, setFormData] = useState(INITIAL_FORM_DATA);
	const [isSubmitted, setIsSubmitted] = useState(false);

	const [gptName, setGptName] = useState('');
	const [gptDesc, setGptDesc] = useState('');
	const [isLoading, setIsLoading] = useState(false);

	const handleSearch = () => {
		if (searchQuery.length < 1) {
			alert('1글자 이상 입력해주세요.');
			return;
		}

		searchCelebrities(searchQuery)
			.then((response) => {
				response.length === 1
					? handleResultClick(response[0])
					: setSearchResults(response);
			})
			.catch((error) => {
				showSnackbar('검색 중 오류가 발생했습니다.', 'error');
				setSearchResults([]);
			});
	};

	const handleResultClick = async (celeb) => {
		try {
			const fullCelebData = await fetchCelebrityById(celeb.id);
			if (fullCelebData) {
				setSelectedCeleb(fullCelebData);
				setFormData({
					name: fullCelebData.name || '',
					prename: fullCelebData.prename || '',
					postname: fullCelebData.postname || '',
					profession_kor: fullCelebData.profession || '',
					gender: fullCelebData.gender || '',
					nationality: getCountryName(fullCelebData.nationality) || '',
					birth_date: fullCelebData.birth_date || '',
					death_date: fullCelebData.death_date || '',
					biography: fullCelebData.biography || '',
					img_link: fullCelebData.img_link || '',
					vid_link: fullCelebData.vid_link || '',
					book_story: fullCelebData.book_story || '',
					quotes: fullCelebData.quotes || '',
					is_real: fullCelebData.is_real ?? false,
					is_legend: fullCelebData.is_legend ?? false,
				});
				setMode('edit');
				setSearchResults([]);
				setSearchQuery('');
			} else {
				showSnackbar('유명인사 정보를 가져오는데 실패했습니다.', 'error');
			}
		} catch (error) {
			showSnackbar('유명인사 정보를 가져오는데 실패했습니다.', 'error');
		}
	};

	const handleReset = () => {
		setIsSubmitted(false);
		setFormData(INITIAL_FORM_DATA);
		setSelectedCeleb(null);
		setMode('create');
		setSearchQuery('');
		setSearchResults([]);
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setIsSubmitted(true);

		try {
			const profession_id = getProfession(
				professionNames,
				formData.profession_kor
			);

			if (!profession_id) {
				showSnackbar('올바른 직업을 선택해주세요.', 'error');
				return;
			}

			const celebData = {
				...formData,
				profession_id,
				// boolean 값들의 기본값 설정
				is_real: formData.is_real || false,
				is_legend: formData.is_legend || false,
				// 빈 문자열 대신 null 처리
				birth_date: formData.birth_date || null,
				death_date: formData.death_date || null,
			};

			if (mode === 'edit' && selectedCeleb?.id) {
				await updateCelebrity(selectedCeleb.id, celebData);
				showSnackbar('유명인사 정보가 수정되었습니다.', 'success');
			} else {
				await createCelebrity(celebData);
				showSnackbar('새 유명인사가 추가되었습니다.', 'success');
			}
			handleReset();
		} catch (error) {
			console.error('Submit error:', error);
			showSnackbar(
				mode === 'edit'
					? '유명인사 수정에 실패했습니다.'
					: '유명인사 추가에 실패했습니다.',
				'error'
			);
		}
	};

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

	const handleModeChange = (event, newMode) => {
		if (newMode !== null) {
			handleReset();
			setMode(newMode);
		}
	};

	const handleGPTFetch = async () => {
		if (!gptName) {
			showSnackbar('인물 이름을 입력해주세요.', 'error');
			return;
		}

		setIsLoading(true);
		try {
			const gptData = await fetchCelebrityInfoByGPT(gptName, gptDesc);
			const foundCountry = countries.find(
				(country) =>
					country.code.toLowerCase() === gptData.nationality?.toLowerCase()
			);

			setFormData({
				name: gptName || '',
				profession_kor: gptData.profession_kor || '',
				gender: gptData.gender || '',
				nationality: foundCountry?.name || '',
				birth_date: gptData.birth_date || '',
				death_date: gptData.death_date || '',
				biography: gptData.biography || '',
				is_real: gptData.is_real ?? false,
				is_legend: gptData.is_legend ?? false,
				prename: '',
				postname: '',
				img_link: '',
				vid_link: '',
				book_story: '',
				quotes: '',
			});
			showSnackbar('GPT가 정보를 가져왔습니다.', 'success');
		} catch (error) {
			showSnackbar('정보를 가져오는데 실패했습니다.', 'error');
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<>
			<ModeToggle mode={mode} onModeChange={handleModeChange} />
			{mode === 'create' && (
				<GPTSection
					gptName={gptName}
					setGptName={setGptName}
					gptDesc={gptDesc}
					setGptDesc={setGptDesc}
					onFetch={handleGPTFetch}
					isLoading={isLoading}
				/>
			)}
			<SearchSection
				mode={mode}
				searchQuery={searchQuery}
				onSearchQueryChange={setSearchQuery}
				onSearch={handleSearch}
				searchResults={searchResults}
				onResultClick={handleResultClick}
			/>

			<form onSubmit={handleSubmit}>
				<FormFields
					formData={formData}
					setFormData={setFormData}
					professionNames={professionNames}
					countries={countries}
					isSubmitted={isSubmitted}
					setPreviewDialogOpen={setPreviewDialogOpen}
				/>

				<FormButtons
					mode={mode}
					selectedCeleb={selectedCeleb}
					onDelete={() => setDeleteDialogOpen(true)}
					onReset={handleReset}
				/>
			</form>

			<DeleteDialog
				open={deleteDialogOpen}
				onClose={() => setDeleteDialogOpen(false)}
				onDelete={handleDelete}
			/>

			<ImagePreviewDialog
				open={previewDialogOpen}
				onClose={() => setPreviewDialogOpen(false)}
				imageUrl={formData.img_link}
			/>
		</>
	);
};

export default CelebForm;
