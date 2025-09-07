import React, { useState } from 'react';
import { Button } from '../../../../components/ui/button';
import { Input } from '../../../../components/ui/input';
import { Label } from '../../../../components/ui/label';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '../../../../components/ui/dropdown-menu';
import { ChevronDown } from 'lucide-react';
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
			...formData,
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

	const handleContentTypeSelect = (contentType) => {
		setFormData({ ...formData, content_id: contentType.id });
	};

	const selectedContentType = Object.values(contentNames).find(
		(type) => type.id === formData.content_id
	);

	return (
		<div className="max-w-4xl mx-auto space-y-6">
			<h2 className="text-lg font-semibold mb-4">
				새 추천 정보 추가
			</h2>
			<form onSubmit={handleSubmitName}>
				<div className="flex gap-4 items-end">
					<div className="flex-1 space-y-2">
						<Label htmlFor="celeb">유명인사 이름</Label>
						<Input
							id="celeb"
							name="celeb"
							value={celebName}
							onChange={handleChangeCelebName}
							required
							placeholder="유명인사 이름을 입력하세요"
						/>
					</div>
					<Button type="submit" size="sm">
						셀럽 정보 확인
					</Button>
				</div>
			</form>

			{celebId > 0 && (
				<form onSubmit={handleSubmitRecs}>
					<div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
						<div className="space-y-2">
							<Label htmlFor="title">제목</Label>
							<Input
								id="title"
								name="title"
								value={formData.title}
								onChange={handleChange}
								required
								placeholder="제목을 입력하세요"
							/>
						</div>
						
						<div className="space-y-2">
							<Label>컨텐츠 타입</Label>
							<DropdownMenu>
								<DropdownMenuTrigger asChild>
									<Button variant="outline" className="w-full justify-between">
										{selectedContentType?.name || '컨텐츠 타입을 선택하세요'}
										<ChevronDown className="h-4 w-4 opacity-50" />
									</Button>
								</DropdownMenuTrigger>
								<DropdownMenuContent className="w-full">
									{Object.values(contentNames).map((type) => (
										<DropdownMenuItem
											key={type.id}
											onSelect={() => handleContentTypeSelect(type)}
										>
											{type.name}
										</DropdownMenuItem>
									))}
								</DropdownMenuContent>
							</DropdownMenu>
						</div>

						<div className="space-y-2">
							<Label htmlFor="creator">제작자</Label>
							<Input
								id="creator"
								name="creator"
								value={formData.creator}
								onChange={handleChange}
								placeholder="제작자를 입력하세요"
							/>
						</div>

						<div className="space-y-2">
							<Label htmlFor="release_date">출시일</Label>
							<Input
								id="release_date"
								name="release_date"
								type="text"
								placeholder="0000-00-00"
								value={formData.release_date}
								onChange={handleChange}
							/>
						</div>

						<div className="md:col-span-2 space-y-2">
							<Label htmlFor="recommendation_text">추천 이유</Label>
							<textarea
								id="recommendation_text"
								name="recommendation_text"
								value={formData.recommendation_text}
								onChange={handleChange}
								rows={3}
								required
								className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-vertical"
								placeholder="추천 이유를 입력하세요"
							/>
						</div>

						<div className="md:col-span-2 space-y-2">
							<Label htmlFor="mediaDescription">미디어 설명</Label>
							<textarea
								id="mediaDescription"
								name="mediaDescription"
								value={formData.mediaDescription}
								onChange={handleChange}
								rows={3}
								className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-vertical"
								placeholder="미디어 설명을 입력하세요"
							/>
						</div>

						<div className="space-y-2">
							<Label htmlFor="recommendation_source">출처</Label>
							<Input
								id="recommendation_source"
								name="recommendation_source"
								value={formData.recommendation_source}
								onChange={handleChange}
								placeholder="출처를 입력하세요"
							/>
						</div>

						<div className="space-y-2">
							<Label htmlFor="img_link">이미지 링크</Label>
							<Input
								id="img_link"
								name="img_link"
								value={formData.img_link}
								onChange={handleChange}
								placeholder="이미지 링크를 입력하세요"
							/>
						</div>

						<div className="space-y-2">
							<Label htmlFor="affiliate_link">제휴 링크</Label>
							<Input
								id="affiliate_link"
								name="affiliate_link"
								value={formData.affiliate_link}
								onChange={handleChange}
								placeholder="제휴 링크를 입력하세요"
							/>
						</div>

						<div className="md:col-span-2 flex gap-4 mt-6">
							<Button type="submit" className="flex-1">
								추천 정보 추가
							</Button>
							<Button
								type="button"
								variant="outline"
								onClick={clearField}
								className="flex-1"
							>
								필드 클리어
							</Button>
						</div>
					</div>
				</form>
			)}
		</div>
	);
};

export default NewRecsForm;