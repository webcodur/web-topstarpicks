// professionUtils.js

const RANK_ORDER = { S: 1, A: 2, B: 3, C: 4, D: 5 };
const UNKNOWN = '알 수 없음';
const AGES = {
	ANCIENT: 0, // 고대
	MEDIEVAL: 1, // 중세
	EARLY_MODERN: 2, // 근세
	MODERN: 3, // 근대
	CONTEMPORARY: 4, // 현대
};

/**
 * 주어진 출생년도에 따라 나이 카테고리를 결정합니다.
 *
 * @param {number} birthYear - 출생년도
 * @param {Object} periods - 각 시대의 경계년도를 정의하는 객체
 * @returns {number|null} 나이 카테고리 또는 null
 *
 * 사용 예:
 * const periods = { ancient: 500, medieval: 1500, modern: 1900 };
 * const category = getAgeCategory(1800, periods);
 * console.log(category); // 출력: 2 (근대)
 */
export const getAgeCategory = (birthYear, periods) => {
	if (!birthYear) return null;

	// 각 시대의 경계와 해당 카테고리를 정의
	const categories = [
		{ limit: periods.ancient, category: AGES.ANCIENT },
		{ limit: periods.medieval, category: AGES.MEDIEVAL },
		{ limit: periods.early_modern, category: AGES.EARLY_MODERN },
		{ limit: periods.modern, category: AGES.MODERN },
		{ limit: Infinity, category: AGES.CONTEMPORARY },
	];

	// 출생년도에 해당하는 첫 번째 카테고리를 찾아 반환
	return categories.find((cat) => birthYear <= cat.limit).category;
};

/**
 * 정렬 함수를 생성합니다.
 *
 * @param {string} criteria - 정렬 기준 ('nationality', 'rank', 'age' 중 하나)
 * @param {Object} periods - 각 시대의 경계년도를 정의하는 객체
 * @returns {Function} 정렬 함수
 *
 * 사용 예:
 * const sortFn = createSortFunction('rank', periods);
 * const sortedData = data.sort((a, b) => sortFn(a, b));
 */
const createSortFunction = (criteria, periods) => {
	const sortFunctions = {
		// 이름순 정렬: 알파벳 순서
		name: (a, b) => a.name.localeCompare(b.name),

		// 국적순 정렬: 알파벳 순서, 없으면 '알 수 없음'으로 처리
		nationality: (a, b) =>
			(a.nationality || UNKNOWN).localeCompare(b.nationality || UNKNOWN),

		// 랭크순 정렬: S > A > B > C > D 순서, 없으면 가장 낮은 순위로 처리
		rank: (a, b) => (RANK_ORDER[b.rank] || 0) - (RANK_ORDER[a.rank] || 0),

		// 나이순 정렬: 시대 카테고리 우선, 같은 카테고리 내에서는 출생년도순
		age: (a, b) => {
			const getYear = (date) => (date ? new Date(date).getFullYear() : 9999);
			const aYear = getYear(a.birth_date);
			const bYear = getYear(b.birth_date);
			const aCat = getAgeCategory(aYear, periods);
			const bCat = getAgeCategory(bYear, periods);
			return aCat !== bCat ? (aCat ?? 4) - (bCat ?? 4) : aYear - bYear;
		},
	};

	return sortFunctions[criteria] || (() => 0);
};
/**
 * 그룹 키 생성 함수를 반환합니다.
 *
 * @param {string} criteria - 그룹화 기준 ('nationality', 'rank', 'age' 중 하나)
 * @param {Object} periods - 각 시대의 경계년도를 정의하는 객체
 * @returns {Function} 그룹 키 생성 함수
 *
 * 사용 예:
 * const getGroupKey = getGroupKeyFunction('nationality', periods);
 * const groupKey = getGroupKey({ nationality: 'USA' });
 * console.log(groupKey); // 출력: 'USA'
 */
const getGroupKeyFunction = (criteria, periods) => {
	const groupKeyFunctions = {
		nationality: (person) => person.nationality || UNKNOWN,
		rank: (person) => person.rank || UNKNOWN,
		age: (person) =>
			getAgeCategory(
				person.birth_date ? new Date(person.birth_date).getFullYear() : null,
				periods
			),
	};

	return groupKeyFunctions[criteria] || (() => 'all');
};

/**
 * 주어진 데이터를 정렬하고 그룹화합니다.
 *
 * @param {Array} data - 정렬할 데이터 배열
 * @param {string} sortCriteria - 정렬 기준 ('nationality', 'rank', 'age' 중 하나)
 * @param {string} sortOrder - 정렬 순서 ('asc' 또는 'desc')
 * @param {Object} periods - 각 시대의 경계년도를 정의하는 객체
 * @returns {Array} 정렬되고 그룹화된 데이터 배열
 *
 * 사용 예:
 * const data = [
 *   { name: 'John', nationality: 'USA', rank: 'A', birth_date: '1990-01-01' },
 *   { name: 'Alice', nationality: 'UK', rank: 'S', birth_date: '1985-05-15' },
 * ];
 *
 * const periods = { ancient: 500, medieval: 1500, modern: 1900 };
 * const result = getSortedAndGroupedData(data, 'nationality', 'asc', periods);
 * console.log(result);
 *
 * 출력: [
 *   { key: 'UK', persons: [{ name: 'Alice', ... }] },
 *   { key: 'USA', persons: [{ name: 'John', ... }] }
 * ]
 */
export const getSortedAndGroupedData = (
	data,
	sortCriteria,
	sortOrder,
	periods
) => {
	if (!Array.isArray(data)) return [];

	// 정렬 함수 생성
	const sortFunction = createSortFunction(sortCriteria, periods);

	// 데이터 정렬
	const sortedData = [...data].sort((a, b) => {
		const result = sortFunction(a, b);
		return sortOrder === 'asc' ? result : -result;
	});

	// 정렬 기준이 없으면 전체 데이터를 하나의 그룹으로 반환
	if (!sortCriteria) return [{ key: 'all', persons: sortedData }];

	// 그룹 키 생성 함수 가져오기
	const getGroupKey = getGroupKeyFunction(sortCriteria, periods);

	// 데이터 그룹화
	return sortedData.reduce((groups, person) => {
		if (!person) return groups;

		const groupKey = getGroupKey(person);
		const existingGroup = groups.find((group) => group.key === groupKey);

		if (existingGroup) {
			existingGroup.persons.push(person);
		} else {
			groups.push({ key: groupKey, persons: [person] });
		}

		return groups;
	}, []);
};

/**
 * 정렬 기준과 값에 따른 레이블을 생성합니다.
 *
 * @param {string} criteria - 정렬 기준 ('nationality', 'rank', 'age' 중 하나)
 * @param {*} value - 정렬 값
 * @param {Object} periods - 각 시대의 경계년도를 정의하는 객체
 * @returns {string} 생성된 레이블
 *
 * 사용 예:
 * const periods = { ancient: 500, medieval: 1500, modern: 1900 };
 * const label = getSortLabel('age', 2, periods);
 * console.log(label); // 출력: '시대: 근대 (1501년 ~ 1900년)'
 */
export const getSortLabel = (criteria, value, periods) => {
	const labels = {
		nationality: (value) => `국적: ${value}`,
		rank: (value) => `${value} rank`,
		age: (value) => {
			const ageLabelMap = {
				[AGES.ANCIENT]: `고대 (~ ${periods.ancient})`,
				[AGES.MEDIEVAL]: `중세 (${periods.ancient + 1} ~ ${periods.medieval})`,
				[AGES.EARLY_MODERN]: `근세 (${periods.medieval + 1} ~ ${
					periods.early_modern
				})`,
				[AGES.MODERN]: `근대 (${periods.early_modern + 1} ~ ${periods.modern})`,
				[AGES.CONTEMPORARY]: `현대 (${periods.modern + 1} ~)`,
			};
			return ageLabelMap[value] || '알 수 없음';
		},
	};

	const result = labels[criteria]?.(value) || '';
	return result ? `- ${result} -` : '';
};
