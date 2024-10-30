// 한국어 날짜 문자열을 'YYYY-MM-DD' 형식으로 변환
// 입력 예시: "기원전 500년 3월 15일" -> "-0500-03-15"
//           "2024년 3월 15일" -> "2024-03-15"
export const formatDateString = (dateStr) => {
	if (!dateStr) return '';

	// 기본 형식이 이미 YYYY-MM-DD 인 경우 그대로 반환
	if (/^-?\d{1,4}-\d{2}-\d{2}$/.test(dateStr)) {
		return dateStr;
	}

	// 기원전 여부 확인
	const isBC = dateStr.includes('기원전');

	// 년도 추출 (숫자만)
	const yearMatch = dateStr.match(/(\d+)년?/);
	if (!yearMatch) return '';

	let year = yearMatch[1];
	// 4자리로 맞추기
	year = year.padStart(4, '0');

	// 기원전인 경우 음수로 변환
	if (isBC) {
		year = '-' + year;
	}

	// 월 추출
	const monthMatch = dateStr.match(/(\d{1,2})월/);
	const month = monthMatch ? monthMatch[1].padStart(2, '0') : '01';

	// 일 추출
	const dayMatch = dateStr.match(/(\d{1,2})일/);
	const day = dayMatch ? dayMatch[1].padStart(2, '0') : '01';

	return `${year}-${month}-${day}`;
};
