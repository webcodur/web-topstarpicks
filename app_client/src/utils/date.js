export const calculateAge = (birthdate) => {
	const today = new Date();
	const birthDate = new Date(birthdate);

	let age = today.getFullYear() - birthDate.getFullYear();

	// 올해의 생일이 지났는지 확인
	const isBirthdayPassed =
		today >=
		new Date(today.getFullYear(), birthDate.getMonth(), birthDate.getDate());

	// 생일이 지나지 않았으면 나이에서 1년을 뺌
	if (!isBirthdayPassed) age--;

	return age;
};
