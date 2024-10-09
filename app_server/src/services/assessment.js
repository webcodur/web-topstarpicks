/**
 * 영향력 평가 결과를 처리하는 클래스
 */
class Assessment {
	/**
	 * 총점을 계산하고 등급을 결정하는 함수
	 * @param {number[]} scores - 각 평가 항목의 점수 배열
	 * @param {number} transhistoricity - 역사를 초월한 영향력 점수
	 * @returns {{totalScore: number, rank: string}} 총점과 등급
	 */
	calculateTotalScoreAndRank(scores, transhistoricity) {
		const totalScore = scores.reduce((a, b) => a + b, 0) + transhistoricity;
		const ranks = [
			{ min: 70, rank: 'S' },
			{ min: 60, rank: 'A' },
			{ min: 50, rank: 'B' },
			{ min: 40, rank: 'C' },
		];
		const rank = ranks.find((r) => totalScore >= r.min)?.rank || 'D';
		return { totalScore, rank };
	}

	/**
	 * 평가 결과의 유효성을 검사하는 함수
	 * @param {Object} result - 평가 결과 객체
	 * @throws {Error} 유효성 검사 실패 시 에러 발생
	 */
	validateResult(result) {
		const requiredFields = [
			'name',
			'scores',
			'explanations',
			'transhistoricity',
			'transhistoricity_explanation',
		];
		requiredFields.forEach((field) => {
			if (!(field in result)) {
				throw new Error(`필수 필드 '${field}'가 누락되었습니다.`);
			}
		});

		if (result.scores.length !== 6 || result.explanations.length !== 6) {
			throw new Error(
				'scores와 explanations는 각각 6개의 항목을 포함해야 합니다.'
			);
		}
	}

	/**
	 * 평가 결과를 처리하는 함수
	 * @param {Object} result - 원본 평가 결과
	 * @returns {Object} 처리된 평가 결과
	 */
	processResult(result) {
		this.validateResult(result);
		const { totalScore, rank } = this.calculateTotalScoreAndRank(
			result.scores,
			result.transhistoricity
		);
		return { ...result, total_score: totalScore, rank };
	}
}

module.exports = new Assessment();
