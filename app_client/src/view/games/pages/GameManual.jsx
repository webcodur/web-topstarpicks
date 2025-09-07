import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '../../../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../../../components/ui/card';
import { ArrowLeft } from 'lucide-react';

const GameManual = () => {
	const navigate = useNavigate();

	const containerVariants = {
		hidden: { opacity: 0 },
		visible: {
			opacity: 1,
			transition: {
				staggerChildren: 0.1,
			},
		},
	};

	const cardVariants = {
		hidden: {
			opacity: 0,
			y: 20,
		},
		visible: {
			opacity: 1,
			y: 0,
			transition: {
				duration: 0.5,
				ease: 'easeOut',
			},
		},
	};

	const titleVariants = {
		hidden: {
			opacity: 0,
			x: -20,
		},
		visible: {
			opacity: 1,
			x: 0,
			transition: {
				duration: 0.5,
			},
		},
	};

	const getRankColor = (rank) => {
		const colors = {
			'S': 'bg-gradient-to-r from-yellow-400 to-orange-500 text-white',
			'A': 'bg-gradient-to-r from-purple-400 to-pink-500 text-white',
			'B': 'bg-gradient-to-r from-blue-400 to-cyan-500 text-white',
			'C': 'bg-gradient-to-r from-green-400 to-teal-500 text-white',
			'D': 'bg-gradient-to-r from-gray-400 to-gray-500 text-white',
		};
		return colors[rank] || 'bg-gray-500 text-white';
	};

	const getActionColor = (type) => {
		const colors = {
			'rule': 'bg-blue-500/20 border-blue-500',
			'diplomacy': 'bg-green-500/20 border-green-500',
			'battle': 'bg-red-500/20 border-red-500',
			'strategy': 'bg-purple-500/20 border-purple-500',
		};
		return colors[type] || 'bg-gray-500/20 border-gray-500';
	};

	return (
		<div className="min-h-screen bg-gradient-to-br from-blue-600 via-purple-600 to-blue-800 p-6">
			<div className="max-w-6xl mx-auto">
				<div className="flex justify-between items-center mb-8">
					<motion.div
						initial="hidden"
						animate="visible"
						variants={titleVariants}
						className="text-white">
						<h1 className="text-4xl font-bold mb-2">카드의 전설: 천하쟁패</h1>
						<p className="text-xl opacity-90">게임 플레이 방법</p>
					</motion.div>
					<Button 
						onClick={() => navigate('/games')}
						variant="secondary"
						className="flex items-center gap-2">
						<ArrowLeft className="w-4 h-4" />
						메인으로 돌아가기
					</Button>
				</div>

				<motion.div
					initial="hidden"
					animate="visible"
					variants={containerVariants}
					className="grid grid-cols-1 md:grid-cols-2 gap-6">
					
					{/* 게임 개요 */}
					<motion.div variants={cardVariants}>
						<Card className="bg-white/10 backdrop-blur-sm border-white/20">
							<CardHeader>
								<CardTitle className="flex items-center gap-3 text-white">
									<span className="text-3xl">🎮</span>
									<span className="text-2xl">게임 개요</span>
								</CardTitle>
							</CardHeader>
							<CardContent className="text-white/90">
								<ul className="space-y-2 list-disc list-inside">
									<li>턴제 카드 전략 게임</li>
									<li>1:1 대전 방식</li>
									<li>시작 체력: 100</li>
									<li>승리 조건: 상대방 체력을 0으로 만들기</li>
								</ul>
							</CardContent>
						</Card>
					</motion.div>

					{/* 카드 시스템 */}
					<motion.div variants={cardVariants}>
						<Card className="bg-white/10 backdrop-blur-sm border-white/20">
							<CardHeader>
								<CardTitle className="flex items-center gap-3 text-white">
									<span className="text-3xl">🃏</span>
									<span className="text-2xl">카드 시스템</span>
								</CardTitle>
							</CardHeader>
							<CardContent className="text-white/90">
								<ul className="space-y-2 list-disc list-inside mb-4">
									<li>전체 카드 수: 30장</li>
									<li>시작 시 각자 4장의 카드를 받음</li>
									<li>매 턴 1장씩 드로우</li>
									<li>매 턴 1장의 카드를 사용해야 함</li>
								</ul>
								<div className="mt-4">
									<div className="grid grid-cols-2 gap-2 bg-black/20 rounded-lg p-3">
										<div className="font-bold text-center">등급</div>
										<div className="font-bold text-center">기본 점수</div>
										{[
											['S', 60],
											['A', 50],
											['B', 40],
											['C', 30],
											['D', 20],
										].map(([rank, score]) => (
											<React.Fragment key={rank}>
												<div className={`text-center py-1 px-2 rounded ${getRankColor(rank)}`}>
													{rank}등급
												</div>
												<div className="text-center py-1">{score}점</div>
											</React.Fragment>
										))}
									</div>
								</div>
							</CardContent>
						</Card>
					</motion.div>

					{/* 행동 시스템 */}
					<motion.div variants={cardVariants}>
						<Card className="bg-white/10 backdrop-blur-sm border-white/20">
							<CardHeader>
								<CardTitle className="flex items-center gap-3 text-white">
									<span className="text-3xl">⚔️</span>
									<span className="text-2xl">행동 시스템</span>
								</CardTitle>
							</CardHeader>
							<CardContent>
								<div className="grid grid-cols-2 gap-3">
									<div className={`p-3 rounded-lg border-2 ${getActionColor('rule')}`}>
										<h3 className="font-bold text-white mb-1">통치</h3>
										<p className="text-white/90 text-sm">자국 체력 +30</p>
										<p className="text-xs text-white/70 mt-1">안정적인 체력 회복</p>
									</div>
									<div className={`p-3 rounded-lg border-2 ${getActionColor('diplomacy')}`}>
										<h3 className="font-bold text-white mb-1">외교</h3>
										<p className="text-white/90 text-sm">
											자국 체력 +15<br />
											상대 체력 -15
										</p>
										<p className="text-xs text-white/70 mt-1">밸런스 있는 체력 교환</p>
									</div>
									<div className={`p-3 rounded-lg border-2 ${getActionColor('battle')}`}>
										<h3 className="font-bold text-white mb-1">교전</h3>
										<p className="text-white/90 text-sm">상대 체력 -30</p>
										<p className="text-xs text-white/70 mt-1">강력한 공격</p>
									</div>
									<div className={`p-3 rounded-lg border-2 ${getActionColor('strategy')}`}>
										<h3 className="font-bold text-white mb-1">모략</h3>
										<p className="text-white/90 text-sm">상대의 효과를 가로채서 사용</p>
										<p className="text-xs text-white/70 mt-1">모략 vs 모략: 패자 -15</p>
									</div>
								</div>
							</CardContent>
						</Card>
					</motion.div>

					{/* 직군별 특수 효과 */}
					<motion.div variants={cardVariants}>
						<Card className="bg-white/10 backdrop-blur-sm border-white/20">
							<CardHeader>
								<CardTitle className="flex items-center gap-3 text-white">
									<span className="text-3xl">👥</span>
									<span className="text-2xl">직군별 특수 효과</span>
								</CardTitle>
							</CardHeader>
							<CardContent>
								<div className="grid grid-cols-1 gap-2 max-h-96 overflow-y-auto pr-2">
									{[
										['지도자', '군주의 위엄', '모든 행동의 기본 점수 +15'],
										['정치인', '외교술', '외교 행동 선택 시 +25'],
										['지휘관', '전술 지휘', '교전 행동 선택 시 +30'],
										['기업가', '자금력', '통치 행동 선택 시 +25'],
										['투자자', '시장 조작', '상대방의 점수를 15 감소'],
										['학자', '전략 분석', '모략 행동 선택 시 +25'],
										['예술인', '예술적 영감', '현재 주제와 같은 행동 선택 시 추가로 +15'],
										['작가', '서사 창작', '모든 행동의 기본 점수 +10, 주제 보너스 +5'],
										['배우', '변신', '상대 카드의 직군 점수 보너스를 복사'],
										['인플루엔서', '여론 주도', '주제 보너스를 2배로 적용'],
										['스포츠인', '승부욕', '체력이 40 이하일 때 모든 점수 +20'],
									].map(([job, name, effect]) => (
										<div key={job} className="bg-black/20 rounded-lg p-2">
											<div className="font-bold text-white text-sm">{job}</div>
											<div className="text-yellow-400 text-xs">{name}</div>
											<div className="text-white/80 text-xs mt-1">{effect}</div>
										</div>
									))}
								</div>
							</CardContent>
						</Card>
					</motion.div>

					{/* 주제 시스템 */}
					<motion.div variants={cardVariants} className="md:col-span-2">
						<Card className="bg-white/10 backdrop-blur-sm border-white/20">
							<CardHeader>
								<CardTitle className="flex items-center gap-3 text-white">
									<span className="text-3xl">🎯</span>
									<span className="text-2xl">주제 시스템</span>
								</CardTitle>
							</CardHeader>
							<CardContent>
								<div className="grid md:grid-cols-2 gap-4">
									<div>
										<h3 className="font-bold text-white mb-2">주제 보너스</h3>
										<ul className="space-y-2 list-disc list-inside text-white/90">
											<li>현재 턴 주제와 같은 행동 선택 시 +20점</li>
											<li>매 턴 새로운 주제가 선정됨</li>
											<li>다음 턴 주제 미리 공개</li>
										</ul>
									</div>
									<div>
										<p className="text-white/70 mb-2">예시</p>
										<div className="space-y-2">
											<div className="bg-blue-500/30 border border-blue-400 rounded-lg p-2 text-white">
												현재 주제: 통치
											</div>
											<div className="bg-gray-500/30 border border-gray-400 rounded-lg p-2 text-white/70">
												다음 주제: 외교
											</div>
										</div>
									</div>
								</div>
							</CardContent>
						</Card>
					</motion.div>
				</motion.div>
			</div>
		</div>
	);
};

export default GameManual;