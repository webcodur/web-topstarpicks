import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../../../components/ui/dialog';
import { X } from 'lucide-react';

export const ManualModal = ({ open, onClose }) => {
	return (
		<Dialog open={open} onOpenChange={onClose}>
			<DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
				<DialogHeader>
					<DialogTitle className="text-2xl">게임 플레이 방법</DialogTitle>
					<button 
						onClick={onClose}
						className="absolute top-2 right-2 w-7 h-7 bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 border-none rounded-full cursor-pointer flex items-center justify-center text-lg"
					>
						<X size={16} />
					</button>
				</DialogHeader>

				<div className="p-6 overflow-y-auto">
					<div className="space-y-6">
						<div>
							<h3 className="text-xl font-semibold text-primary-main dark:text-primary-light mb-3">
								게임 개요
							</h3>
							<div className="space-y-2 text-gray-700 dark:text-gray-300">
								<p>• 1:1 턴제 대전 게임</p>
								<p>• 시작 체력: 100</p>
								<p>• 승리 조건: 상대방 체력을 0으로 만들기</p>
							</div>
						</div>

						<div>
							<h3 className="text-xl font-semibold text-primary-main dark:text-primary-light mb-3">
								카드 시스템
							</h3>
							<div className="space-y-2 text-gray-700 dark:text-gray-300">
								<p>• 매 턴 1장의 카드를 사용</p>
								<p>• 사용한 만큼 자동으로 보충</p>
								<p>• 카드 등급별 기본 점수:</p>
								<div className="ml-4 space-y-1">
									<p>- S등급: 60점</p>
									<p>- A등급: 50점</p>
									<p>- B등급: 40점</p>
									<p>- C등급: 30점</p>
									<p>- D등급: 20점</p>
								</div>
							</div>
						</div>

						<div>
							<h3 className="text-xl font-semibold text-primary-main dark:text-primary-light mb-3">
								행동 종류
							</h3>
							<div className="space-y-2 text-gray-700 dark:text-gray-300">
								<p>• 통치: 자국 체력 회복 30</p>
								<p>• 외교: 자국 체력 +15, 상대 체력 -15</p>
								<p>• 교전: 상대 체력 -30</p>
								<p>• 모략: 승리 시 상대방 행동의 효과를 획득</p>
							</div>
						</div>

						<div>
							<h3 className="text-xl font-semibold text-primary-main dark:text-primary-light mb-3">
								직군별 특수 효과
							</h3>
							<div className="space-y-2 text-gray-700 dark:text-gray-300">
								<p>• 지도자: 모든 행동의 기본 점수 +15</p>
								<p>• 정치인: 외교 행동 선택 시 +25</p>
								<p>• 지휘관: 교전 행동 선택 시 +30</p>
								<p>• 기업가: 통치 행동 선택 시 +25</p>
								<p>• 투자자: 상대방의 점수를 15 감소</p>
								<p>• 학자: 모략 행동 선택 시 +25</p>
								<p>• 예술인: 현재 주제와 같은 행동 선택 시 추가로 +15</p>
								<p>• 작가: 모든 행동의 기본 점수 +10, 주제 보너스 +5</p>
								<p>• 배우: 상대 카드의 직군 점수 보너스를 복사</p>
								<p>• 인플루엔서: 주제 보너스를 2배로 적용</p>
								<p>• 스포츠인: 체력이 40 이하일 때 모든 점수 +20</p>
							</div>
						</div>

						<div>
							<h3 className="text-xl font-semibold text-primary-main dark:text-primary-light mb-3">
								승리 조건
							</h3>
							<div className="space-y-2 text-gray-700 dark:text-gray-300">
								<p>• 상대방의 체력을 0으로 만들면 승리</p>
								<p>• 높은 점수를 획득한 쪽이 행동 효과 발동</p>
								<p>• 동점 시 양측 효과 미발동</p>
							</div>
						</div>
					</div>
				</div>
			</DialogContent>
		</Dialog>
	);
};
