import React, { useState } from 'react';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Loader2 } from 'lucide-react';
import axios from 'axios';

const Crawling = ({ showSnackbar }) => {
	const [name, setName] = useState('');
	const [url, setUrl] = useState('');
	const [loading, setLoading] = useState(false);

	const handleCrawl = async () => {
		if (!name || !url) {
			showSnackbar('이름과 URL을 모두 입력해주세요.');
			return;
		}

		setLoading(true);
		try {
			const response = await axios.get(
				`http://localhost:4000/api/crawl?name=${encodeURIComponent(
					name
				)}&url=${encodeURIComponent(url)}`
			);

			showSnackbar(`크롤링 완료: ${response.data.message}`);
		} catch (error) {
			showSnackbar(`크롤링 실패: ${error.message}`);
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="space-y-4">
			<div className="space-y-2">
				<Label htmlFor="name">이름</Label>
				<Input
					id="name"
					value={name}
					onChange={(e) => setName(e.target.value)}
					placeholder="이름을 입력하세요"
				/>
			</div>
			<div className="space-y-2">
				<Label htmlFor="url">URL</Label>
				<Input
					id="url"
					value={url}
					onChange={(e) => setUrl(e.target.value)}
					placeholder="URL을 입력하세요"
				/>
			</div>
			<Button
				onClick={handleCrawl}
				disabled={loading}
				className="mt-4">
				{loading ? (
					<>
						<Loader2 className="mr-2 h-4 w-4 animate-spin" />
						크롤링 중...
					</>
				) : (
					'크롤링 시작'
				)}
			</Button>
		</div>
	);
};

export default Crawling;
