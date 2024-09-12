// utils/urlUtils.js

export const formatNameForUrl = (name) => {
	return name.replace(/\s+/g, '-').toLowerCase();
};

export const parseNameFromUrl = (urlName) => {
	return urlName.replace(/-/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase());
};
