import React from 'react';
import {
	LoginForm as StyledLoginForm,
	Input,
	Button,
	ErrorMessage,
} from './LoginStyles';

const LoginForm = ({
	email,
	setEmail,
	pw,
	setPw,
	emailError,
	pwError,
	serverError,
	handleSubmit,
	isSubmitDisabled,
}) => {
	return (
		<StyledLoginForm onSubmit={handleSubmit}>
			<Input
				type="email"
				placeholder="이메일"
				value={email}
				onChange={(e) => setEmail(e.target.value)}
				required
			/>
			{emailError && <ErrorMessage>{emailError}</ErrorMessage>}
			<Input
				type="password"
				placeholder="비밀번호"
				value={pw}
				onChange={(e) => setPw(e.target.value)}
				required
			/>
			{pwError && <ErrorMessage>{pwError}</ErrorMessage>}
			<Button type="submit" disabled={isSubmitDisabled}>
				로그인
			</Button>
			{serverError && <ErrorMessage>{serverError}</ErrorMessage>}
		</StyledLoginForm>
	);
};

export default React.memo(LoginForm);
