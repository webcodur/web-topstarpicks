import { useState, useEffect } from 'react';
import { fetchCelebrities } from 'api/celebrityApi';

const isCurrent = (birth, death) => {
	const CURRENT_YEAR = new Date().getFullYear();
	const MAX_AGE = 100;
	const MAX_YEARS_SINCE_DEATH = 30;

	// 빈 문자열이나 undefined 체크를 위한 헬퍼 함수
	const hasValue = (str) => str && str.length > 0;

	// 기원전 날짜 체크를 위한 헬퍼 함수
	const isBCDate = (date) => hasValue(date) && date.startsWith('-');

	// 연도 추출 헬퍼 함수
	const extractYear = (date) => Number(date.substring(0, 4));

	// 기원전 인물 체크
	if (isBCDate(birth) || isBCDate(death)) {
		return false;
	}

	// 출생년도 기준 체크
	if (hasValue(birth)) {
		const age = CURRENT_YEAR - extractYear(birth);
		return age <= MAX_AGE;
	}

	// 사망년도 기준 체크
	if (hasValue(death)) {
		const yearsSinceDeath = CURRENT_YEAR - extractYear(death);
		return yearsSinceDeath <= MAX_YEARS_SINCE_DEATH;
	}

	return false; // 날짜 정보가 없는 경우
};

const useProfessionData = (profession, contentName, timesName, menuInfo) => {
	const [professionData, setProfessionData] = useState(null);

	useEffect(() => {
		const loadCelebrities = async () => {
			try {
				const fixProfession = profession === '전체' ? 'all' : profession;
				let data = await fetchCelebrities(fixProfession);

				// 시대 구분 필터링
				let timeCatorizedData = '';
				if (timesName === '전체인물') {
					timeCatorizedData = [...data];
				} else if (timesName === '역사인물') {
					timeCatorizedData = data.filter(
						(celeb) => !isCurrent(celeb.birth_date, celeb.death_date)
					);
				} else if (timesName === '현대인물') {
					timeCatorizedData = data.filter((celeb) =>
						isCurrent(celeb.birth_date, celeb.death_date)
					);
				}

				// 메뉴에 대한 컨텐츠 구분 필터링
				if (menuInfo === '인물도감') {
					setProfessionData(timeCatorizedData);
				}
				if (menuInfo === '추천정보') {
					const contentCategorizedData = timeCatorizedData.filter(
						(celeb) =>
							celeb.recommended_content_names &&
							celeb.recommended_content_names.includes(contentName)
					);
					setProfessionData(contentCategorizedData);
				}
			} catch (error) {
				console.error('Failed to load celebrity data:', error);
			}
		};

		loadCelebrities();
	}, [profession, contentName, timesName, menuInfo]);

	return professionData;
};

export default useProfessionData;
