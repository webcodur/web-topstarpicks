// 상수
const UNKNOWN = '알 수 없음';
const AGES = Object.freeze(['고대', '중세', '근세', '근대', '현대']);
const DEFAULT_LIFESPAN = 70;
const S_RANK = 'S: Stellar 등급';
const A_RANK = 'A: Authority 등급';
const B_RANK = 'B: Beacon 등급';
const C_RANK = 'C: Certified 등급';
const D_RANK = 'D: Dignity 등급';

// 국가 코드 매핑
const COUNTRY_CODES = {
	KR: '대한민국',
	JP: '일본',
	CN: '중국',
	US: '미국',
	GB: '영국',
	FR: '프랑스',
	DE: '독일',
	IT: '이탈리아',
	GR: '그리스',
	RU: '러시아',
	IN: '인도',
	EG: '이집트',
	ES: '스페인',
	PT: '포르투갈',
	NL: '네덜란드',
	BE: '벨기에',
	SE: '스웨덴',
	NO: '노르웨이',
	DK: '덴마크',
	FI: '핀란드',
	AT: '오스트리아',
	CH: '스위스',
	PL: '폴란드',
	CZ: '체코',
	HU: '헝가리',
	TR: '터키',
	IR: '이란',
	IL: '이스라엘',
	SA: '사우디아라비아',
	AE: '아랍에미리트',
	ZA: '남아프리카공화국',
	AU: '호주',
	NZ: '뉴질랜드',
	CA: '캐나다',
	MX: '멕시코',
	BR: '브라질',
	AR: '아르헨티나',
	CL: '칠레',
	PE: '페루',
	CO: '콜롬비아',
	VE: '베네수엘라',
	VN: '베트남',
	TH: '태국',
	ID: '인도네시아',
	MY: '말레이시아',
	SG: '싱가포르',
	PH: '필리핀',
	UA: '우크라이나',
	BY: '벨라루스',
	RO: '루마니아',
	BG: '불가리아',
	RS: '세르비아',
	HR: '크로아티아',
	SI: '슬로베니아',
	SK: '슬로바키아',
};

// ---------------------------- 헬퍼 함수 ----------------------------
// 헬퍼 함수(1/5): 연도 추출
const getYear = (date) => {
	return date && date !== '' ? new Date(date).getFullYear() : null;
};

// 헬퍼 함수(2/5): 출생년도 추정
const estimateBirthYear = (person) => {
	if (person.birth_date && person.birth_date !== '') {
		return getYear(person.birth_date);
	}
	if (person.death_date && person.death_date !== '') {
		return getYear(person.death_date) - DEFAULT_LIFESPAN;
	}
	return null;
};

// 헬퍼 함수(3/5): 시대 분류 카테고리 반환
const getAgeCategory = (birthYear, periods) => {
	if (!birthYear) return null;

	const periodLimits = [
		periods.ancient,
		periods.medieval,
		periods.early_modern,
		periods.modern,
		Infinity,
	];

	return periodLimits.findIndex((limit) => birthYear <= limit);
};

// 헬퍼 함수(4/5): 정렬 함수 생성
const createSortFunction = (criteria, periods) => {
	const sortFunctions = {
		name: (a, b) => a.name.localeCompare(b.name),
		nationality: (a, b) =>
			(a.nationality || UNKNOWN).localeCompare(b.nationality || UNKNOWN),
		// rank: (a, b) => (RANK_ORDER[b.rank] || 6) - (RANK_ORDER[a.rank] || 6),
		influence: (a, b) => a.total_score - b.total_score,
		age: (a, b) => {
			const [aYear, bYear] = [estimateBirthYear(a), estimateBirthYear(b)];
			const [aCat, bCat] = [
				getAgeCategory(aYear, periods),
				getAgeCategory(bYear, periods),
			];

			return aCat !== bCat
				? (aCat ?? 4) - (bCat ?? 4)
				: (aYear || 9999) - (bYear || 9999);
		},
	};

	return sortFunctions[criteria] || (() => 0);
};

// 헬퍼 함수(5/5): 그룹 키 생성
const getGroupKey = (person, sortCriteria, periods) => {
	if (!sortCriteria) return 'all';

	if (sortCriteria === 'age') {
		const birthYear = estimateBirthYear(person);
		return getAgeCategory(birthYear, periods);
	}

	if (sortCriteria === 'influence') {
		return {
			9: S_RANK,
			8: S_RANK,
			7: S_RANK,
			6: A_RANK,
			5: B_RANK,
			4: C_RANK,
			3: D_RANK,
			2: D_RANK,
			1: D_RANK,
			0: D_RANK,
		}[Math.floor(person.total_score / 10)];
	}
	return person[sortCriteria] || UNKNOWN;
};

// ---------------------------- 메인 함수 ----------------------------

// 메인 함수 (1/2): 데이터 정렬 및 그룹화
export const getSortedAndGroupedData = (
	data,
	sortCriteria,
	sortOrder,
	periods
) => {
	if (!Array.isArray(data)) return [];

	// 1-1. 정렬 함수 지정
	const sortFunction = createSortFunction(sortCriteria, periods);

	// 1-2. 값 정렬
	const sortedData = [...data].sort((a, b) => {
		const result = sortFunction(a, b);
		return sortOrder === 'asc' ? result : -result;
	});

	// 1-3. 그룹 생성
	const groups = new Map();

	for (const person of sortedData) {
		const key = getGroupKey(person, sortCriteria, periods);
		if (!groups.has(key)) {
			groups.set(key, { key, persons: [] });
		}
		groups.get(key).persons.push(person);
	}

	return Array.from(groups.values());
};

// 메인 함수 (2/2): 정렬 라벨 생성
export const getSortLabel = (criteria, value, periods, group) => {
	const labelGenerators = {
		nationality: (v) => {
			const countryName = COUNTRY_CODES[v] || v;
			return `국적: ${countryName} (${group?.persons?.length || 0}명)`;
		},
		influence: (v) => `${v} (${group?.persons?.length || 0}명)`,
		age: (v) => {
			const periodLimits = [
				periods.ancient,
				periods.medieval,
				periods.early_modern,
				periods.modern,
				Infinity,
			];

			if (typeof v !== 'number') return UNKNOWN;

			const start = v > 0 ? periodLimits[v - 1] + 1 : 0;
			const end = periodLimits[v] === Infinity ? '현재' : periodLimits[v];

			return `${AGES[v]} (${start} ~ ${end}) (${
				group?.persons?.length || 0
			}명)`;
		},
	};

	const label = labelGenerators[criteria]?.(value) || '';
	return `- ${label} -`;
};
