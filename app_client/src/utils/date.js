export const calculateAge = (birthdate) => {
	const today = new Date();
	const birthYear = parseInt(birthdate.split('-')[0]);

	// 기원전 날짜 처리
	if (birthYear <= 0) return null;

	let age = today.getFullYear() - birthYear;
	const [, birthMonth, birthDay] = birthdate.split('-').map(Number);
	const isBirthdayPassed =
		today >= new Date(today.getFullYear(), birthMonth - 1, birthDay);

	if (!isBirthdayPassed) age--;

	return age;
};

export const formatYear = (dateString) => {
	if (dateString.startsWith('-')) {
		// 기원전 날짜
		const year = dateString.split('-')[1]; // '-0356-07-01' -> '0356'
		return `BC ${parseInt(year, 10)}`;
	} else {
		// 기원후 날짜
		const year = dateString.split('-')[0]; // '2023-01-01' -> '2023'
		return `${parseInt(year, 10)}`;
	}
};
