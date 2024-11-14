import React, { useEffect, useCallback, useMemo, useRef } from 'react';
import { motion, animate } from 'framer-motion';
import {
	StatsContainer,
	StatBox,
	StatNumber,
	StatLabel,
} from 'view/home/styles/StatisticsSectionStyles';

// 통계 섹션 컴포넌트 - 메모이제이션을 통한 성능 최적화
const StatisticsSection = React.memo(() => {
	// ref들을 컴포넌트 내부로 이동
	const profileCountRef = useRef();
	const insightCountRef = useRef();
	const userCountRef = useRef();

	// 숫자 애니메이션을 처리하는 콜백 함수
	// @param ref - DOM 요소 참조
	// @param target - 목표 숫자
	// @param format - 표시 형식 ('K' 또는 'default')
	const animateCount = useCallback((ref, target, format = 'default') => {
		// 이미 애니메이션이 실행됐거나 ref가 없으면 중단
		if (!ref.current || ref.current.dataset.animated === 'true') return;

		// 시작값을 목표값의 90%로 설정
		const startValue = Math.floor(target * 0.9);
		animate(startValue, target, {
			duration: 1.5,
			onUpdate: (value) => {
				if (ref.current) {
					// K 형식이면 천 단위로 나누어 표시 (예: 10.0K+)
					if (format === 'K') {
						ref.current.textContent =
							(Math.floor(value) / 1000).toFixed(1) + 'K+';
					} else {
						// 일반 형식은 천 단위 구분자 사용 (예: 1,000+)
						ref.current.textContent = Math.floor(value).toLocaleString() + '+';
					}
				}
			},
			// 애니메이션 완료 시 데이터셋 플래그 설정
			onComplete: () => {
				if (ref.current) {
					ref.current.dataset.animated = 'true';
				}
			},
			ease: 'easeOut',
		});
	}, []);

	// 통계 데이터 배열 수정
	const stats = useMemo(
		() => [
			{ ref: profileCountRef, label: '셀럽 프로필', value: 1000 },
			{ ref: insightCountRef, label: '인사이트', value: 5000 },
			{ ref: userCountRef, label: '월 사용자', value: 10000, format: 'K' },
		],
		[]
	);

	// 컴포넌트 마운트 시 각 통계 항목 애니메이션 시작
	useEffect(() => {
		stats.forEach((stat) => {
			animateCount(stat.ref, stat.value, stat.format);
		});
	}, [animateCount, stats]);

	return (
		<StatsContainer>
			{stats.map((stat, index) => (
				// 각 통계 항목을 순차적으로 페이드인 애니메이션과 함께 표시
				<motion.div
					key={index}
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ delay: index * 0.2 }}>
					<StatBox>
						<StatNumber ref={stat.ref} data-animated="false">
							0+
						</StatNumber>
						<StatLabel>{stat.label}</StatLabel>
					</StatBox>
				</motion.div>
			))}
		</StatsContainer>
	);
});

export default StatisticsSection;
