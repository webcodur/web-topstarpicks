export const backgroundImages = {
	추천정보: {
		pc: 'https://ik.imagekit.io/wnivma72t/loadingImage/1.jpg',
		mobile: 'https://ik.imagekit.io/wnivma72t/loadingImage/1.jpg',
	},
	인물도감: {
		pc: 'https://ik.imagekit.io/wnivma72t/loadingImage/2.jpg',
		mobile: 'https://ik.imagekit.io/wnivma72t/loadingImage/2.jpg',
	},
	전설도감: {
		pc: 'https://ik.imagekit.io/wnivma72t/loadingImage/31.jpg',
		mobile: 'https://ik.imagekit.io/wnivma72t/loadingImage/32.jpg',
	},
	신화도감: {
		pc: 'https://ik.imagekit.io/wnivma72t/loadingImage/41.png',
		mobile: 'https://ik.imagekit.io/wnivma72t/loadingImage/42.jpg',
	},
};

export const getLoadingMessage = (menuType) => {
	switch (menuType) {
		case '추천정보':
			return '추천정보 로딩중...';
		case '인물도감':
			return '인물도감 로딩중...';
		case '전설도감':
			return '전설도감 로딩중...';
		case '신화도감':
			return '신화도감 로딩중...';
		default:
			return '데이터 로딩중...';
	}
};
