import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
} from '../../ui/dialog';
import { Button } from '../../ui/button';
import { Input } from '../../ui/input';
import { Label } from '../../ui/label';

const AdminLoginModal = ({ open, onClose }) => {
	const [password, setPassword] = useState('');
	const [error, setError] = useState('');
	const navigate = useNavigate();

	const handleSubmit = (e) => {
		e.preventDefault();
		if (password === '123') {
			navigate('/admin');
			onClose();
		} else {
			setError('비밀번호가 올바르지 않습니다.');
		}
	};

	return (
		<Dialog open={open} onOpenChange={onClose}>
			<DialogContent className="sm:max-w-[400px]">
				<DialogHeader>
					<DialogTitle>관리자 로그인</DialogTitle>
				</DialogHeader>
				<form onSubmit={handleSubmit} className="space-y-4 pt-4">
					<div className="space-y-2">
						<Label htmlFor="password">비밀번호</Label>
						<Input
							id="password"
							type="password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							className={error ? 'border-red-500' : ''}
							placeholder="비밀번호를 입력하세요"
						/>
						{error && (
							<p className="text-sm text-red-500">{error}</p>
						)}
					</div>
					<Button
						type="submit"
						className="w-full"
					>
						로그인
					</Button>
				</form>
			</DialogContent>
		</Dialog>
	);
};

export default AdminLoginModal;