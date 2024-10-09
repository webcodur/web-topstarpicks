import React, { useState } from 'react';
import { TextField, Button, CircularProgress } from '@mui/material';
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
		<div>
			<TextField
				label="이름"
				value={name}
				onChange={(e) => setName(e.target.value)}
				fullWidth
				margin="normal"
			/>
			<TextField
				label="URL"
				value={url}
				onChange={(e) => setUrl(e.target.value)}
				fullWidth
				margin="normal"
			/>
			<Button
				variant="contained"
				onClick={handleCrawl}
				disabled={loading}
				style={{ marginTop: '1rem' }}>
				{loading ? <CircularProgress size={24} /> : '크롤링 시작'}
			</Button>
		</div>
	);
};

export default Crawling;
