import React from 'react';
import { LoginWrapper } from './LoginStyles';
import LoginForm from './LoginForm';
import useLoginForm from 'hooks/useLoginForm';
import useLoginSubmit from 'hooks/useLoginSubmit';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Box } from '@mui/material';

const Login = () => {
	const navigate = useNavigate();
	const { email, setEmail, pw, setPw, emailError, pwError, isSubmitDisabled } =
		useLoginForm();

	const { handleSubmit, serverError } = useLoginSubmit();

	const onSubmit = (e) => {
		e.preventDefault();
		handleSubmit(email, pw);
	};

	return (
		<LoginWrapper>
			<Box style={{ display: 'flex' }}>
				<Box style={{ color: 'gray' }}>로그인</Box>
				<Button onClick={() => navigate('/')}>X</Button>
			</Box>
			<br />
			<LoginForm
				email={email}
				setEmail={setEmail}
				pw={pw}
				setPw={setPw}
				emailError={emailError}
				pwError={pwError}
				serverError={serverError}
				handleSubmit={onSubmit}
				isSubmitDisabled={isSubmitDisabled}
			/>
		</LoginWrapper>
	);
};

export default React.memo(Login);
