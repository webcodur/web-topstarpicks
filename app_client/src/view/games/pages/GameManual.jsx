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
							천하삼국 전략카드대전
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

					{/* 직군별 행동 보너스 */}
					<S.ManualCard variants={cardVariants}>
						<S.CardHeader>
							<S.IconWrapper>👥</S.IconWrapper>
							<Typography variant="h5">직군별 행동 보너스</Typography>
						</S.CardHeader>
						<S.CardContent>
							<S.BonusTable>
								<S.BonusTableRow>
									<div>직군</div>
									<div>통치</div>
									<div>외교</div>
									<div>교전</div>
									<div>모략</div>
								</S.BonusTableRow>
								<S.BonusTableRow>
									<div>---</div>
									<div>---</div>
									<div>---</div>
									<div>---</div>
									<div>---</div>
								</S.BonusTableRow>
								{[
									['지도자', '+25', '+20', '+10', '-10'],
									['정치인', '+15', '+25', '-5', '+20'],
									['지휘관', '+10', '-5', '+25', '-10'],
									['기업가', '+20', '+20', '-10', '+15'],
									['투자자', '+10', '+20', '-10', '+25'],
									['학자', '+15', '+15', '-5', '+20'],
									['예술인', '+5', '+15', '-10', '+25'],
									['작가', '+5', '+20', '-10', '+20'],
									['배우', '0', '+15', '-10', '+20'],
									['인플루엔서', '+5', '+15', '-10', '+15'],
									['스포츠인', '+10', '-5', '+20', '-10'],
								].map((row, index) => (
									<S.BonusTableRow key={index}>
										<div>{row[0]}</div>
										<S.BonusCell>{row[1]}</S.BonusCell>
										<S.BonusCell>{row[2]}</S.BonusCell>
										<S.BonusCell>{row[3]}</S.BonusCell>
										<S.BonusCell>{row[4]}</S.BonusCell>
									</S.BonusTableRow>
								))}
							</S.BonusTable>
						</S.CardContent>
					</S.ManualCard>
				</S.ContentGrid>
			</Container>
		</S.ManualContainer>
	);
};

export default GameManual;
