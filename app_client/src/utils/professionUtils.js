// Constants
const UNKNOWN = '알 수 없음';
const AGES = ['고대', '중세', '근세', '근대', '현대'];
const RANK_ORDER = { S: 1, A: 2, B: 3, C: 4, D: 5 };

// Helper functions
const getYear = (date) => (date ? new Date(date).getFullYear() : null);

const estimateBirthYear = (person) => {
	if (person.birth_date && person.birth_date !== '') {
		return getYear(person.birth_date);
	}
	if (person.death_date && person.death_date !== '') {
		return getYear(person.death_date) - 70; // Estimate birth as 70 years before death
	}
	return null;
};

const getAgeCategory = (birthYear, periods) => {
	if (!birthYear) return null;
	const limits = [
		periods.ancient,
		periods.medieval,
		periods.early_modern,
		periods.modern,
		Infinity,
	];
	return limits.findIndex((limit) => birthYear <= limit);
};

// Main functions
export const getSortedAndGroupedData = (
	data,
	sortCriteria,
	sortOrder,
	periods
) => {
	if (!Array.isArray(data)) return [];

	const sortFunctions = {
		name: (a, b) => a.name.localeCompare(b.name),
		nationality: (a, b) =>
			(a.nationality || UNKNOWN).localeCompare(b.nationality || UNKNOWN),
		rank: (a, b) => (RANK_ORDER[b.rank] || 6) - (RANK_ORDER[a.rank] || 6),
		age: (a, b) => {
			const aYear = estimateBirthYear(a);
			const bYear = estimateBirthYear(b);
			const aCat = getAgeCategory(aYear, periods);
			const bCat = getAgeCategory(bYear, periods);
			return aCat !== bCat
				? (aCat ?? 4) - (bCat ?? 4)
				: (aYear || 9999) - (bYear || 9999);
		},
	};

	const getGroupKey = (person) => {
		if (!sortCriteria) return 'all';
		if (sortCriteria === 'age') {
			const birthYear = estimateBirthYear(person);
			return getAgeCategory(birthYear, periods);
		}
		return person[sortCriteria] || UNKNOWN;
	};

	const sortedData = [...data].sort((a, b) => {
		const result = sortFunctions[sortCriteria]?.(a, b) || 0;
		return sortOrder === 'asc' ? result : -result;
	});

	return sortedData.reduce((groups, person) => {
		const key = getGroupKey(person);
		const group = groups.find((g) => g.key === key) || { key, persons: [] };
		if (!groups.includes(group)) groups.push(group);
		group.persons.push(person);
		return groups;
	}, []);
};

export const getSortLabel = (criteria, value, periods) => {
	const labels = {
		nationality: (v) => `국적: ${v}`,
		rank: (v) => `${v} rank`,
		age: (v) => {
			const ageLimits = [
				periods.ancient,
				periods.medieval,
				periods.early_modern,
				periods.modern,
				Infinity,
			];
			const start = v > 0 ? ageLimits[v - 1] + 1 : 0;
			return `${AGES[v]} (${start} ~ ${
				ageLimits[v] === Infinity ? '현재' : ageLimits[v]
			})`;
		},
	};

	const label = labels[criteria]?.(value) || '';
	return label ? `- ${label} -` : '';
};
