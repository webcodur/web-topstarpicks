import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAtom } from 'jotai';
import { isLoggedInAtom } from 'store/atom';

const API_URL = '';

const useLoginSubmit = () => {
	const [, setIsLoggedIn] = useAtom(isLoggedInAtom);
	const [serverError, setServerError] = useState('');
	const navigate = useNavigate();

	const handleSubmit = useCallback(
		async (email, pw) => {
			try {
				const response = await fetch(`${API_URL}/auth/sign-in`, {
					method: 'POST',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify({ email, password: pw }),
				});

				const data = await response.json();

				if (response.ok) {
					localStorage.setItem('access_token', data.access_token);
					setIsLoggedIn(true);
					navigate('/');
				} else {
					setServerError(
						data.message ||
							'로그인에 실패했습니다. 이메일과 비밀번호를 확인해주세요.'
					);
				}
			} catch (error) {
				setServerError('로그인 요청 중 에러가 발생했습니다.');
				console.error('Login error:', error);
			}
		},
		[navigate, setIsLoggedIn]
	);

	return { handleSubmit, serverError };
};

export default useLoginSubmit;
