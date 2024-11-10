import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Typography } from '@mui/material';
import * as S from './styles/gameManualStyles';

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

	return (
		<S.ManualContainer>
			<Container maxWidth="lg">
				<S.Header>
					<S.TitleWrapper
						initial="hidden"
						animate="visible"
						variants={titleVariants}>
						<Typography variant="h3" component="h1">
							카드의 전설: 천하쟁패
						</Typography>
						<Typography variant="h6" color="textSecondary">
							게임 플레이 방법
						</Typography>
					</S.TitleWrapper>
					<S.BackButton onClick={() => navigate('/games')}>
						메인으로 돌아가기
					</S.BackButton>
				</S.Header>

				<S.ContentGrid
					initial="hidden"
					animate="visible"
					variants={containerVariants}>
					{/* 게임 개요 */}
					<S.ManualCard variants={cardVariants}>
						<S.CardHeader>
							<S.IconWrapper>🎮</S.IconWrapper>
							<Typography variant="h5">게임 개요</Typography>
						</S.CardHeader>
						<S.CardContent>
							<S.FeatureList>
								<li>턴제 카드 전략 게임</li>
								<li>1:1 대전 방식</li>
								<li>시작 체력: 100</li>
								<li>승리 조건: 상대방 체력을 0으로 만들기</li>
							</S.FeatureList>
						</S.CardContent>
					</S.ManualCard>

					{/* 카드 시스템 */}
					<S.ManualCard variants={cardVariants}>
						<S.CardHeader>
							<S.IconWrapper>🃏</S.IconWrapper>
							<Typography variant="h5">카드 시스템</Typography>
						</S.CardHeader>
						<S.CardContent>
							<S.FeatureList>
								<li>전체 카드 수: 30장</li>
								<li>시작 시 각자 4장의 카드를 받음</li>
								<li>매 턴 1장씩 드로우</li>
								<li>매 턴 1장의 카드를 사용해야 함</li>
							</S.FeatureList>
							<S.RankTable>
								<S.TableHeader>
									<div>등급</div>
									<div>기본 점수</div>
								</S.TableHeader>
								{[
									['S', 60],
									['A', 50],
									['B', 40],
									['C', 30],
									['D', 20],
								].map(([rank, score]) => (
									<S.TableRow key={rank}>
										<S.RankCell rank={rank}>{rank}등급</S.RankCell>
										<div>{score}점</div>
									</S.TableRow>
								))}
							</S.RankTable>
						</S.CardContent>
					</S.ManualCard>

					{/* 행동 시스템 */}
					<S.ManualCard variants={cardVariants}>
						<S.CardHeader>
							<S.IconWrapper>⚔️</S.IconWrapper>
							<Typography variant="h5">행동 시스템</Typography>
						</S.CardHeader>
						<S.CardContent>
							<S.ActionGrid>
								<S.ActionBox type="rule">
									<Typography variant="h6">통치</Typography>
									<Typography>자국 체력 +30</Typography>
									<S.ActionEffect>안정적인 체력 회복</S.ActionEffect>
								</S.ActionBox>

								<S.ActionBox type="diplomacy">
									<Typography variant="h6">외교</Typography>
									<Typography>
										자국 체력 +15
										<br />
										상대 체력 -15
									</Typography>
									<S.ActionEffect>밸런스 있는 체력 교환</S.ActionEffect>
								</S.ActionBox>

								<S.ActionBox type="battle">
									<Typography variant="h6">교전</Typography>
									<Typography>상대 체력 -30</Typography>
									<S.ActionEffect>강력한 공격</S.ActionEffect>
								</S.ActionBox>

								<S.ActionBox type="strategy">
									<Typography variant="h6">모략</Typography>
									<Typography>상대의 효과를 가로채서 사용</Typography>
									<S.ActionEffect>모략 vs 모략: 패자 -15</S.ActionEffect>
								</S.ActionBox>
							</S.ActionGrid>
						</S.CardContent>
					</S.ManualCard>

					{/* 직군별 특수 효과 */}
					<S.ManualCard variants={cardVariants}>
						<S.CardHeader>
							<S.IconWrapper>👥</S.IconWrapper>
							<Typography variant="h5">직군별 특수 효과</Typography>
						</S.CardHeader>
						<S.CardContent>
							<S.JobEffectGrid>
								{[
									['지도자', '군주의 위엄', '모든 행동의 기본 점수 +15'],
									['정치인', '외교술', '외교 행동 선택 시 +25'],
									['지휘관', '전술 지휘', '교전 행동 선택 시 +30'],
									['기업가', '자금력', '통치 행동 선택 시 +25'],
									['투자자', '시장 조작', '상대방의 점수를 15 감소'],
									['학자', '전략 분석', '모략 행동 선택 시 +25'],
									[
										'예술인',
										'예술적 영감',
										'현재 주제와 같은 행동 선택 시 추가로 +15',
									],
									[
										'작가',
										'서사 창작',
										'모든 행동의 기본 점수 +10, 주제 보너스 +5',
									],
									['배우', '변신', '상대 카드의 직군 점수 보너스를 복사'],
									['인플루엔서', '여론 주도', '주제 보너스를 2배로 적용'],
									['스포츠인', '승부욕', '체력이 40 이하일 때 모든 점수 +20'],
								].map(([job, name, effect]) => (
									<S.JobEffectBox key={job}>
										<S.JobTitle>{job}</S.JobTitle>
										<S.EffectName>{name}</S.EffectName>
										<S.EffectDescription>{effect}</S.EffectDescription>
									</S.JobEffectBox>
								))}
							</S.JobEffectGrid>
						</S.CardContent>
					</S.ManualCard>

					{/* 주제 시스템 */}
					<S.ManualCard variants={cardVariants}>
						<S.CardHeader>
							<S.IconWrapper>🎯</S.IconWrapper>
							<Typography variant="h5">주제 시스템</Typography>
						</S.CardHeader>
						<S.CardContent>
							<S.TopicInfo>
								<div>
									<Typography variant="h6" gutterBottom>
										주제 보너스
									</Typography>
									<S.FeatureList>
										<li>현재 턴 주제와 같은 행동 선택 시 +20점</li>
										<li>매 턴 새로운 주제가 선정됨</li>
										<li>다음 턴 주제 미리 공개</li>
									</S.FeatureList>
								</div>
								<S.TopicExample>
									<Typography variant="subtitle2" gutterBottom>
										예시
									</Typography>
									<S.TopicBox>현재 주제: 통치</S.TopicBox>
									<S.TopicBox next>다음 주제: 외교</S.TopicBox>
								</S.TopicExample>
							</S.TopicInfo>
						</S.CardContent>
					</S.ManualCard>
				</S.ContentGrid>
			</Container>
		</S.ManualContainer>
	);
};

export default GameManual;
