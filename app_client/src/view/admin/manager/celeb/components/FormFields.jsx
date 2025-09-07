import React from 'react';
import { Input } from '../../../../../components/ui/input';
import { Label } from '../../../../../components/ui/label';
import { Button } from '../../../../../components/ui/button';
import { Checkbox } from '../../../../../components/ui/checkbox';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '../../../../../components/ui/dropdown-menu';
import { ChevronDown } from 'lucide-react';
import { formatDateString } from 'utils/dateUtils';
import { GENDER_OPTIONS } from '../CelebForm.constants';
import { getProfessionValue } from '../formUtils';

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

	// formData의 체크박스 값을 boolean으로 확실하게 변환
	const isReal = Boolean(formData.is_real);
	const isLegend = Boolean(formData.is_legend);

	// 직업 선택 핸들러
	const handleProfessionSelect = (profession) => {
		setFormData((prev) => ({
			...prev,
			profession_kor: profession.name,
		}));
	};

	// 성별 선택 핸들러
	const handleGenderSelect = (gender) => {
		setFormData((prev) => ({
			...prev,
			gender: gender.value,
		}));
	};

	// 국적 선택 핸들러
	const handleCountrySelect = (country) => {
		setFormData((prev) => ({
			...prev,
			nationality: country.name,
		}));
	};

	const selectedProfession = professionOptions.find(
		(p) => p.name === formData.profession_kor
	);
	const selectedGender = GENDER_OPTIONS.find(
		(g) => g.value === formData.gender
	);
	const selectedCountry = countryOptions.find(
		(c) => c.name === formData.nationality
	);

	return (
		<div className="space-y-6">
			{/* Basic Information Row */}
			<div className="grid grid-cols-1 md:grid-cols-4 gap-4">
				<div className="space-y-2">
					<Label htmlFor="prename">Prename</Label>
					<Input
						id="prename"
						name="prename"
						value={formData.prename}
						onChange={handleChange}
						placeholder="Enter prename"
					/>
				</div>

				<div className="space-y-2">
					<Label htmlFor="name">이름 *</Label>
					<Input
						id="name"
						name="name"
						value={formData.name}
						onChange={handleChange}
						placeholder="이름을 입력하세요"
						required
						className={isSubmitted && !formData.name ? 'border-red-500' : ''}
					/>
					{isSubmitted && !formData.name && (
						<p className="text-sm text-red-500">이름을 입력해주세요</p>
					)}
				</div>

				<div className="space-y-2">
					<Label htmlFor="postname">Postname</Label>
					<Input
						id="postname"
						name="postname"
						value={formData.postname}
						onChange={handleChange}
						placeholder="Enter postname"
					/>
				</div>

				<div className="space-y-2">
					<Label>직군 *</Label>
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<Button
								variant="outline"
								className={`w-full justify-between ${
									isSubmitted && !formData.profession_kor ? 'border-red-500' : ''
								}`}
							>
								{selectedProfession?.name || '직군을 선택하세요'}
								<ChevronDown className="h-4 w-4 opacity-50" />
							</Button>
						</DropdownMenuTrigger>
						<DropdownMenuContent className="w-full">
							{professionOptions.map((profession) => (
								<DropdownMenuItem
									key={profession.id}
									onSelect={() => handleProfessionSelect(profession)}
								>
									{profession.name}
								</DropdownMenuItem>
							))}
						</DropdownMenuContent>
					</DropdownMenu>
					{isSubmitted && !formData.profession_kor && (
						<p className="text-sm text-red-500">직군을 선택해주세요</p>
					)}
				</div>
			</div>

			{/* Gender and Nationality Row */}
			<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
				<div className="space-y-2">
					<Label>성별 *</Label>
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<Button variant="outline" className="w-full justify-between">
								{selectedGender?.label || '성별을 선택하세요'}
								<ChevronDown className="h-4 w-4 opacity-50" />
							</Button>
						</DropdownMenuTrigger>
						<DropdownMenuContent className="w-full">
							{GENDER_OPTIONS.map((gender) => (
								<DropdownMenuItem
									key={gender.value}
									onSelect={() => handleGenderSelect(gender)}
								>
									{gender.label}
								</DropdownMenuItem>
							))}
						</DropdownMenuContent>
					</DropdownMenu>
				</div>

				<div className="space-y-2">
					<Label>국적 *</Label>
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<Button
								variant="outline"
								className={`w-full justify-between ${
									isSubmitted && !formData.nationality ? 'border-red-500' : ''
								}`}
							>
								{selectedCountry
									? `${selectedCountry.name} (${selectedCountry.code})`
									: '국적을 선택하세요'}
								<ChevronDown className="h-4 w-4 opacity-50" />
							</Button>
						</DropdownMenuTrigger>
						<DropdownMenuContent className="w-full">
							{countryOptions.map((country) => (
								<DropdownMenuItem
									key={country.code}
									onSelect={() => handleCountrySelect(country)}
								>
									{country.name} ({country.code})
								</DropdownMenuItem>
							))}
						</DropdownMenuContent>
					</DropdownMenu>
					{isSubmitted && !formData.nationality && (
						<p className="text-sm text-red-500">국적을 선택해주세요</p>
					)}
				</div>
			</div>

			{/* Date Fields */}
			<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
				<div className="space-y-2">
					<Label htmlFor="birth_date">출생일</Label>
					<Input
						id="birth_date"
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
						placeholder="YYYY-MM-DD"
					/>
				</div>

				<div className="space-y-2">
					<Label htmlFor="death_date">사망일</Label>
					<Input
						id="death_date"
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
						placeholder="YYYY-MM-DD"
					/>
				</div>
			</div>

			{/* Biography */}
			<div className="space-y-2">
				<Label htmlFor="biography">약력</Label>
				<textarea
					id="biography"
					name="biography"
					value={formData.biography}
					onChange={handleChange}
					rows={3}
					className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-vertical"
					placeholder="약력을 입력하세요"
				/>
			</div>

			{/* Image and Video Links */}
			<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
				<div className="space-y-2">
					<Label htmlFor="img_link">이미지 링크</Label>
					<Input
						id="img_link"
						name="img_link"
						value={formData.img_link}
						onChange={handleChange}
						placeholder="이미지 URL을 입력하세요"
					/>
					{formData.img_link && (
						<div className="mt-2 relative">
							<img
								src={formData.img_link}
								alt="Celebrity preview"
								className="w-full h-32 object-cover rounded-md cursor-pointer hover:opacity-80 transition-opacity"
								onClick={() => setPreviewDialogOpen(true)}
								onError={(e) => {
									e.target.onerror = null;
									e.target.src = '/placeholder-image.jpg';
								}}
							/>
						</div>
					)}
				</div>

				<div className="space-y-2">
					<Label htmlFor="vid_link">비디오 링크</Label>
					<Input
						id="vid_link"
						name="vid_link"
						value={formData.vid_link}
						onChange={handleChange}
						placeholder="비디오 URL을 입력하세요"
					/>
				</div>
			</div>

			{/* Text Areas */}
			<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
				<div className="space-y-2">
					<Label htmlFor="book_story">도서/이야기</Label>
					<textarea
						id="book_story"
						name="book_story"
						value={formData.book_story}
						onChange={handleChange}
						rows={3}
						className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-vertical"
						placeholder="도서나 이야기를 입력하세요"
					/>
				</div>

				<div className="space-y-2">
					<Label htmlFor="quotes">명언</Label>
					<textarea
						id="quotes"
						name="quotes"
						value={formData.quotes}
						onChange={handleChange}
						rows={3}
						className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-vertical"
						placeholder="명언을 입력하세요"
					/>
				</div>
			</div>

			{/* Checkboxes */}
			<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
				<div
					className={`flex items-center space-x-3 p-3 border rounded-md transition-colors ${
						isReal
							? 'border-blue-500 bg-blue-50'
							: 'border-gray-300 hover:border-gray-400'
					}`}
				>
					<Checkbox
						id="is_real"
						checked={isReal}
						onCheckedChange={(checked) =>
							setFormData({ ...formData, is_real: checked })
						}
					/>
					<Label
						htmlFor="is_real"
						className="flex-1 cursor-pointer select-none"
					>
						실존 인물
					</Label>
				</div>

				<div
					className={`flex items-center space-x-3 p-3 border rounded-md transition-colors ${
						isLegend
							? 'border-blue-500 bg-blue-50'
							: 'border-gray-300 hover:border-gray-400'
					}`}
				>
					<Checkbox
						id="is_legend"
						checked={isLegend}
						onCheckedChange={(checked) =>
							setFormData({ ...formData, is_legend: checked })
						}
					/>
					<Label
						htmlFor="is_legend"
						className="flex-1 cursor-pointer select-none"
					>
						가상 인물
					</Label>
				</div>
			</div>
		</div>
	);
};

export default FormFields;