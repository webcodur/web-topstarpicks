export const prepareBarData = (transhistoricity) => [
	{ name: '통시성', score: transhistoricity || 0 },
];

export const getTranshistoricityDescription = (transhistoricity) => {
	// 통시성 점수에 대한 설명을 반환하는 함수
	return `이 인물의 통시성 점수는 ${transhistoricity}점입니다. 이는 시대를 넘어서며 세상에 영향을 준 정도를 나타냅니다.`;
};
