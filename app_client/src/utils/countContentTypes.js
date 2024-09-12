import { categories } from 'store/content/categories';

export const countContentTypes = (recData) => {
	const counts = Object.fromEntries(categories.map((cat) => [cat, 0]));
	Object.values(recData).forEach((person) => {
		Object.keys(person).forEach((type) => {
			if (counts.hasOwnProperty(type)) counts[type]++;
		});
	});
	counts.all = Object.values(counts).reduce((sum, count) => sum + count, 0);
	return counts;
};
// 사용: const result = countContentTypes(recommendationData);
