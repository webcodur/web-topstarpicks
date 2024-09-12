import { useState, useCallback, useMemo } from 'react';
import { validateEmail, validatePassword } from 'utils/loginValidations';

const useLoginForm = () => {
	const [email, setEmail] = useState('');
	const [pw, setPw] = useState('');
	const [emailError, setEmailError] = useState('');
	const [pwError, setPwError] = useState('');
	const [touched, setTouched] = useState({ email: false, pw: false });

	const handleEmailChange = useCallback((newEmail) => {
		setEmail(newEmail);
		setEmailError(validateEmail(newEmail));
		setTouched((prev) => ({ ...prev, email: true }));
	}, []);

	const handlePwChange = useCallback((newPw) => {
		setPw(newPw);
		setPwError(validatePassword(newPw));
		setTouched((prev) => ({ ...prev, pw: true }));
	}, []);

	const isSubmitDisabled = useMemo(() => {
		return email.length === 0 || pw.length === 0 || !!emailError || !!pwError;
	}, [email, pw, emailError, pwError]);

	return {
		email,
		setEmail: handleEmailChange,
		pw,
		setPw: handlePwChange,
		emailError,
		pwError,
		touched,
		isSubmitDisabled,
	};
};

export default useLoginForm;
