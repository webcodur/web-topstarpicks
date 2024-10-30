import React from 'react';
import { TextField, Button, Box, Grid } from '@mui/material';
import { styles } from '../CelebForm.styles';

const GPTSection = ({
	gptName,
	setGptName,
	gptDesc,
	setGptDesc,
	onFetch,
	isLoading,
}) => {
	return (
		<Grid container spacing={2} sx={{ ...styles.formContainer, mb: 2 }}>
			<Grid item xs={9}>
				<Box
					sx={{
						p: 2,
						border: '1px solid #ddd',
						borderRadius: 1,
						height: '100%',
					}}>
					<TextField
						size="small"
						fullWidth
						label="인물 이름"
						value={gptName}
						onChange={(e) => setGptName(e.target.value)}
						sx={{ mb: 2 }}
					/>
					<TextField
						size="small"
						fullWidth
						label="인물 설명 (선택사항)"
						value={gptDesc}
						onChange={(e) => setGptDesc(e.target.value)}
						multiline
						rows={2}
					/>
				</Box>
			</Grid>
			<Grid item xs={3}>
				<Button
					variant="contained"
					onClick={onFetch}
					disabled={isLoading}
					sx={{
						height: '100%',
						width: '100%',
					}}>
					{isLoading ? '정보 가져오는 중...' : 'GPT로 정보 가져오기'}
				</Button>
			</Grid>
		</Grid>
	);
};

export default GPTSection;
