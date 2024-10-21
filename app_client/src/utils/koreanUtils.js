const CHOSUNG_LIST = [
	'ㄱ',
	'ㄲ',
	'ㄴ',
	'ㄷ',
	'ㄸ',
	'ㄹ',
	'ㅁ',
	'ㅂ',
	'ㅃ',
	'ㅅ',
	'ㅆ',
	'ㅇ',
	'ㅈ',
	'ㅉ',
	'ㅊ',
	'ㅋ',
	'ㅌ',
	'ㅍ',
	'ㅎ',
];

export const getChosung = (str) => {
	let result = '';
	for (let i = 0; i < str.length; i++) {
		const code = str.charCodeAt(i) - 44032;
		if (code > -1 && code < 11172)
			result += CHOSUNG_LIST[Math.floor(code / 588)];
		else result += str.charAt(i);
	}
	return result;
};

export const isChosung = (str) => {
	return /^[ㄱ-ㅎ]+$/.test(str);
};
