export const calculateGrade = (totalScore) => {
	if (totalScore >= 70) return 'S';
	if (totalScore >= 60) return 'A';
	if (totalScore >= 50) return 'B';
	if (totalScore >= 40) return 'C';
	return 'D';
};
