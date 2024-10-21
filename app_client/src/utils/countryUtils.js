export const getCountryName = (code) => {
	const countryNames = new Intl.DisplayNames(['ko'], { type: 'region' });
	return countryNames.of(code);
};
