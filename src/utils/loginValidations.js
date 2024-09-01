export const validateEmail = (value) => {
	if (value.length === 0) return '';
	const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	if (!emailRegex.test(value)) {
		return '유효한 이메일 주소를 입력해주세요.';
	} else if (value.length > 255) {
		return '이메일은 255자를 초과할 수 없습니다.';
	}
	return '';
};

export const validatePassword = (value) => {
	if (value.length === 0) return '';
	if (value.length < 6 || value.length > 255) {
		return '비밀번호는 6자에서 255자 사이여야 합니다.';
	}
	return '';
};
