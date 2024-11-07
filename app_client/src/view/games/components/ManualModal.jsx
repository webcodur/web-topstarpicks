import React from 'react';
import { Modal, Box, Typography, Divider } from '@mui/material';
import * as S from './styles/modalStyles';

const jobEffects = {
	지도자: {
		name: '카리스마',
		description: '같은 턴에 출전한 아군 카드들의 점수 +10',
	},
	정치인: {
		name: '외교술',
		description: '상대방의 점수가 더 높을 경우, 그 차이의 50%만큼 감소',
	},
	// ... 나머지 직군 효과들
};

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
							<Typography>• 턴제 방식의 1:1 대전 게임</Typography>
							<Typography>• 시작 체력: 100</Typography>
							<Typography>• 승리 조건: 상대방 체력을 0으로 만들기</Typography>
							<Typography>
								• 매 턴마다 하나의 주제가 주어지며, 다음 턴의 주제도 미리
								공개됩니다.
							</Typography>
						</Box>

						<Typography variant="h6" gutterBottom>
							카드 시스템
						</Typography>
						<Box mb={3}>
							<Typography>• 전체 카드 수: 30장</Typography>
							<Typography>
								• 시작 시 각 플레이어는 4장의 카드를 받습니다
							</Typography>
							<Typography>• 매 턴 1장의 카드를 사용해야 합니다</Typography>
							<Typography>
								• 매 턴 1장의 카드를 자동으로 보충받습니다
							</Typography>
						</Box>

						<Typography variant="h6" gutterBottom>
							등급 점수
						</Typography>
						<Box mb={3}>
							<Typography>• S등급: 60점</Typography>
							<Typography>• A등급: 50점</Typography>
							<Typography>• B등급: 40점</Typography>
							<Typography>• C등급: 30점</Typography>
							<Typography>• D등급: 20점</Typography>
						</Box>

						<Typography variant="h6" gutterBottom>
							직군별 특수 효과
						</Typography>
						<Box mb={3}>
							{Object.entries(jobEffects).map(([job, effect]) => (
								<Box key={job} mb={1}>
									<Typography variant="subtitle1" fontWeight="bold">
										{job}: {effect.name}
									</Typography>
									<Typography>{effect.description}</Typography>
								</Box>
							))}
						</Box>
					</S.ManualSection>
				</S.ModalContent>
			</S.ModalContainer>
		</Modal>
	);
};
