import React from 'react';
import { Input } from '../../../../../components/ui/input';
import { Label } from '../../../../../components/ui/label';
import { Button } from '../../../../../components/ui/button';

const GPTSection = ({
	gptName,
	setGptName,
	gptDesc,
	setGptDesc,
	onFetch,
	isLoading,
}) => {
	return (
		<div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
			<div className="md:col-span-3">
				<div className="p-4 border border-gray-300 rounded-md space-y-4 h-full">
					<div className="space-y-2">
						<Label htmlFor="gpt_name">인물 이름</Label>
						<Input
							id="gpt_name"
							value={gptName}
							onChange={(e) => setGptName(e.target.value)}
							placeholder="인물 이름을 입력하세요"
						/>
					</div>
					<div className="space-y-2">
						<Label htmlFor="gpt_desc">인물 설명 (선택사항)</Label>
						<textarea
							id="gpt_desc"
							value={gptDesc}
							onChange={(e) => setGptDesc(e.target.value)}
							rows={2}
							className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-vertical"
							placeholder="인물에 대한 추가 설명을 입력하세요"
						/>
					</div>
				</div>
			</div>
			<div className="md:col-span-1">
				<Button
					onClick={onFetch}
					disabled={isLoading}
					className="w-full h-full min-h-[120px] flex flex-col items-center justify-center"
				>
					{isLoading ? '정보 가져오는 중...' : 'GPT로 정보 가져오기'}
				</Button>
			</div>
		</div>
	);
};

export default GPTSection;