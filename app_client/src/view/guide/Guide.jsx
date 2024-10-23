import React from 'react';
// import { styled } from '@emotion/styled';
import styled from '@emotion/styled';
import {
	Box,
	Container,
	Typography,
	Card,
	CardContent,
	Stepper,
	Step,
	StepLabel,
	StepContent,
	Button,
	Paper,
	AccordionDetails,
	AccordionSummary,
	Accordion,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import TouchAppIcon from '@mui/icons-material/TouchApp';
import LiveHelpIcon from '@mui/icons-material/LiveHelp';

// Styled Components
const StyledHeader = styled.div`
	background: linear-gradient(45deg, #2196f3 30%, #21cbf3 90%);
	padding: 40px 0;
	color: white;
	margin-bottom: 40px;
`;

const FeatureCard = styled(Card)`
	height: 100%;
	transition: transform 0.2s;
	&:hover {
		transform: translateY(-5px);
		box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
	}
`;

const Guide = () => {
	const [activeStep, setActiveStep] = React.useState(0);

	const handleNext = () => {
		setActiveStep((prevActiveStep) => prevActiveStep + 1);
	};

	const handleBack = () => {
		setActiveStep((prevActiveStep) => prevActiveStep - 1);
	};

	const steps = [
		{
			label: '회원가입 및 로그인',
			description: '간단한 이메일 인증으로 시작하세요.',
		},
		{
			label: '프로필 설정',
			description: '나만의 프로필을 만들고 관심사를 설정하세요.',
		},
		{
			label: '서비스 이용하기',
			description: '다양한 기능을 활용하여 서비스를 시작하세요.',
		},
	];

	const faqs = [
		{
			question: '서비스 이용은 무료인가요?',
			answer:
				'기본 서비스는 무료로 제공됩니다. 제휴 링크를 이용할 경우 소정의 수수료가 제작자에게 전달됩니다.',
		},
		{
			question: '원하는 유명인사 정보를 만들어 주세요.',
			answer:
				'webcodur@gmail.com으로 문의해주세요. 이미지 및 유명인사 정보를 전달주시면 반영할 수 있습니다',
		},
		{
			question: '서비스는 어떻게 운영하나요?',
			answer:
				'기본 서비스 위에 유명인사 데이터나 AI 를 활용한 여러가지 기능을 부착할 예정입니다. 인물 별 대사, 음성 서비스 등을 기획하고 있습니다.',
		},
	];

	return (
		<>
			<StyledHeader>
				<Container maxWidth="lg">
					<Typography variant="h3" gutterBottom>
						서비스 이용 가이드
					</Typography>
					<Typography variant="h6">
						더 나은 사이트 이용을 위해 TopStarPicks가 제공하는 기능을 확인해
						보세요
					</Typography>
				</Container>
			</StyledHeader>

			<Container maxWidth="lg">
				{/* 주요 기능 섹션 */}
				<Typography variant="h4" gutterBottom>
					주요 기능
				</Typography>
				<Box
					sx={{
						display: 'grid',
						gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
						gap: 3,
						mb: 6,
					}}>
					<FeatureCard>
						<CardContent>
							<TouchAppIcon
								sx={{ fontSize: 40, color: 'primary.main', mb: 2 }}
							/>
							<Typography variant="h6" gutterBottom>
								직접 유명인사 영향력 평가할 수 있습니다.
							</Typography>
							<Typography variant="body2" color="text.secondary">
								사이트에 없는 유명인사 영향력 지표도 직접 확인해 볼 수 있습니다.
								chatGPT 를 활용해 궁금한 인물의 영향력을 생성해 보세요!
								(개발중입니다)
							</Typography>
						</CardContent>
					</FeatureCard>

					<FeatureCard>
						<CardContent>
							<HelpOutlineIcon
								sx={{ fontSize: 40, color: 'primary.main', mb: 2 }}
							/>
							<Typography variant="h6" gutterBottom>
								24/7 지원
							</Typography>
							<Typography variant="body2" color="text.secondary">
								언제든 연락주세요. 담당자가 도움드리겠습니다.
							</Typography>
						</CardContent>
					</FeatureCard>
				</Box>

				{/* 시작하기 스텝 */}
				{/* <Paper elevation={0} sx={{ p: 3, mb: 6, bgcolor: 'grey.50' }}>
					<Typography variant="h4" gutterBottom>
						시작하기
					</Typography>
					<Stepper activeStep={activeStep} orientation="vertical">
						{steps.map((step, index) => (
							<Step key={step.label}>
								<StepLabel>
									<Typography variant="h6">{step.label}</Typography>
								</StepLabel>
								<StepContent>
									<Typography>{step.description}</Typography>
									<Box sx={{ mb: 2 }}>
										<div>
											<Button
												variant="contained"
												onClick={handleNext}
												sx={{ mt: 1, mr: 1 }}>
												{index === steps.length - 1 ? '완료' : '다음'}
											</Button>
											<Button
												disabled={index === 0}
												onClick={handleBack}
												sx={{ mt: 1, mr: 1 }}>
												이전
											</Button>
										</div>
									</Box>
								</StepContent>
							</Step>
						))}
					</Stepper>
				</Paper> */}

				{/* FAQ 섹션 */}
				<Typography variant="h4" gutterBottom>
					자주 묻는 질문
				</Typography>
				{faqs.map((faq, index) => (
					<Accordion key={index}>
						<AccordionSummary expandIcon={<ExpandMoreIcon />}>
							<Typography variant="h6">{faq.question}</Typography>
						</AccordionSummary>
						<AccordionDetails>
							<Typography>{faq.answer}</Typography>
						</AccordionDetails>
					</Accordion>
				))}

				{/* 추가 도움말 */}
				{/* <Box
					sx={{
						mt: 6,
						p: 3,
						bgcolor: 'primary.light',
						borderRadius: 2,
						color: 'white',
					}}>
					<Typography variant="h5" gutterBottom>
						추가 도움이 필요하신가요?
					</Typography>
					<Typography variant="body1">
						더 자세한 내용은 고객센터를 통해 문의해주세요.
					</Typography>
					<Button variant="contained" color="secondary" sx={{ mt: 2 }}>
						고객센터 바로가기
					</Button>
				</Box> */}
			</Container>
		</>
	);
};

export default Guide;
