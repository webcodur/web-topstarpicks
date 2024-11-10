import React from 'react';
import { Modal, Box, Typography, Divider } from '@mui/material';
import * as S from '../styles';

export const ManualModal = ({ open, onClose }) => {
	return (
		<Modal open={open} onClose={onClose}>
			<S.ModalContainer>
				<S.ModalHeader>
					<Typography variant="h5">게임 플레이 방법</Typography>
					<S.CloseButton onClick={onClose}>×</S.CloseButton>
				</S.ModalHeader>

				<S.ModalContent>
					<S.ManualSection>
						<Typography variant="h6" gutterBottom>
							게임 개요
						</Typography>
						<Box mb={3}>
							<Typography>• 1:1 턴제 대전 게임</Typography>
							<Typography>• 시작 체력: 100</Typography>
							<Typography>• 승리 조건: 상대방 체력을 0으로 만들기</Typography>
						</Box>

						<Typography variant="h6" gutterBottom>
							카드 시스템
						</Typography>
						<Box mb={3}>
							<Typography>• 매 턴 1장의 카드를 사용</Typography>
							<Typography>• 사용한 만큼 자동으로 보충</Typography>
							<Typography>• 카드 등급별 기본 점수:</Typography>
							<Box pl={2}>
								<Typography>- S등급: 60점</Typography>
								<Typography>- A등급: 50점</Typography>
								<Typography>- B등급: 40점</Typography>
								<Typography>- C등급: 30점</Typography>
								<Typography>- D등급: 20점</Typography>
							</Box>
						</Box>

						<Typography variant="h6" gutterBottom>
							행동 종류
						</Typography>
						<Box mb={3}>
							<Typography>• 통치: 자국 체력 회복 30</Typography>
							<Typography>• 외교: 자국 체력 +15, 상대 체력 -15</Typography>
							<Typography>• 교전: 상대 체력 -30</Typography>
							<Typography>• 모략: 승리 시 상대방 행동의 효과를 획득</Typography>
						</Box>

						<Typography variant="h6" gutterBottom>
							직군별 특수 효과
						</Typography>
						<Box mb={3}>
							<Typography>• 지도자: 모든 행동의 기본 점수 +15</Typography>
							<Typography>• 정치인: 외교 행동 선택 시 +25</Typography>
							<Typography>• 지휘관: 교전 행동 선택 시 +30</Typography>
							<Typography>• 기업가: 통치 행동 선택 시 +25</Typography>
							<Typography>• 투자자: 상대방의 점수를 15 감소</Typography>
							<Typography>• 학자: 모략 행동 선택 시 +25</Typography>
							<Typography>
								• 예술인: 현재 주제와 같은 행동 선택 시 추가로 +15
							</Typography>
							<Typography>
								• 작가: 모든 행동의 기본 점수 +10, 주제 보너스 +5
							</Typography>
							<Typography>
								• 배우: 상대 카드의 직군 점수 보너스를 복사
							</Typography>
							<Typography>• 인플루엔서: 주제 보너스를 2배로 적용</Typography>
							<Typography>
								• 스포츠인: 체력이 40 이하일 때 모든 점수 +20
							</Typography>
						</Box>

						<Typography variant="h6" gutterBottom>
							승리 조건
						</Typography>
						<Box mb={3}>
							<Typography>• 상대방의 체력을 0으로 만들면 승리</Typography>
							<Typography>• 높은 점수를 획득한 쪽이 행동 효과 발동</Typography>
							<Typography>• 동점 시 양측 효과 미발동</Typography>
						</Box>
					</S.ManualSection>
				</S.ModalContent>
			</S.ModalContainer>
		</Modal>
	);
};
