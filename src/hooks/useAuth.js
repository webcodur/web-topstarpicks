import { useState, useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const useAuth = () => {
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const navigate = useNavigate();

	useEffect(() => {
		// 페이지 로드 시 로컬 스토리지에서 로그인 상태 확인
		const token = localStorage.getItem('access_token');
		setIsLoggedIn(!!token);
	}, []);

	const login = useCallback(() => {
		// 실제 로그인 로직
		localStorage.setItem('access_token', 'dummy_token');
		setIsLoggedIn(true);
		navigate('/profile');
	}, [navigate]);

	const logout = useCallback(() => {
		localStorage.removeItem('access_token');
		setIsLoggedIn(false);
		navigate('/');
	}, [navigate]);

	const navigateToProfileOrLogin = useCallback(() => {
		if (isLoggedIn) {
			navigate('/profile');
		} else {
			navigate('/login');
		}
	}, [isLoggedIn, navigate]);

	return {
		isLoggedIn,
		login,
		logout,
		navigateToProfileOrLogin,
	};
};
