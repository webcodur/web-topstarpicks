import React from 'react';
import { LoginWrapper } from './LoginStyles';
import LoginForm from './LoginForm';
import useLoginForm from 'hooks/useLoginForm';
import useLoginSubmit from 'hooks/useLoginSubmit';

const Login = () => {
	const { email, setEmail, pw, setPw, emailError, pwError, isSubmitDisabled } =
		useLoginForm();

	const { handleSubmit, serverError } = useLoginSubmit();

	const onSubmit = (e) => {
		e.preventDefault();
		handleSubmit(email, pw);
	};

	return (
		<LoginWrapper>
			<h2>로그인</h2>
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
