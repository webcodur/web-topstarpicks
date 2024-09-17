import React, { useState } from 'react';
import { Modal, Box, Typography, TextField, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const AdminLoginModal = ({ open, onClose }) => {
	const [password, setPassword] = useState('');
	const [error, setError] = useState('');
	const navigate = useNavigate();

	const handleSubmit = (e) => {
		e.preventDefault();
		if (password === 'admin') {
			navigate('/admin');
			onClose();
		} else {
			setError('비밀번호가 올바르지 않습니다.');
		}
	};

	return (
		<Modal open={open} onClose={onClose}>
			<Box
				sx={{
					position: 'absolute',
					top: '50%',
					left: '50%',
					transform: 'translate(-50%, -50%)',
					width: 300,
					bgcolor: 'background.paper',
					boxShadow: 24,
					p: 4,
					borderRadius: 2,
				}}>
				<Typography variant="h6" component="h2" gutterBottom>
					관리자 로그인
				</Typography>
				<form onSubmit={handleSubmit}>
					<TextField
						fullWidth
						type="password"
						label="비밀번호"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						error={!!error}
						helperText={error}
						margin="normal"
					/>
					<Button
						type="submit"
						variant="contained"
						color="primary"
						fullWidth
						sx={{ mt: 2 }}>
						로그인
					</Button>
				</form>
			</Box>
		</Modal>
	);
};

export default AdminLoginModal;
