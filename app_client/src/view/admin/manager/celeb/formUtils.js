// GPT 응답의 직업을 DB의 직업과 매핑하는 함수
const professionMapping = {
	지도자: '정치인', // 예시: GPT가 반환하는 값 -> DB의 실제 값
	// 다른 매핑 추가
};

export const getProfession = (professionNames, professionKor) => {
	// GPT 응답값을 DB값으로 매핑
	const mappedProfession = professionMapping[professionKor] || professionKor;

	const profession = professionNames.find((p) => p.name === mappedProfession);
	return profession ? profession.id : null;
};

export const getProfessionValue = (professionNames, profession_kor) => {
	if (!professionNames || !profession_kor) return null;
	return professionNames.find((p) => p.name === profession_kor) || null;
};
