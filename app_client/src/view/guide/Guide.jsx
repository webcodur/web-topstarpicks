import React from 'react';
import {
	Box,
	Container,
	Typography,
	CardContent,
	AccordionDetails,
	AccordionSummary,
	useTheme,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import TouchAppIcon from '@mui/icons-material/TouchApp';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import {
	StyledHeader,
	HeaderContent,
	FeatureCard,
	StyledAccordion,
} from './Guide.styles';

const Guide = () => {
	const theme = useTheme();
	const features = [
		{
			icon: (
				<TouchAppIcon sx={{ fontSize: 40, color: 'primary.main', mb: 2 }} />
			),
			title: '직접 유명인사들의 영향력을 평가해볼 수 있습니다.',
			description:
				'사이트에 없는 유명인사들의 영향력 지표를 직접 측정해 볼 수 있습니다. chatGPT 를 활용한 영향력 생성기를 활용해 보세요! (개발중입니다)',
		},
		{
			icon: (
				<HelpOutlineIcon sx={{ fontSize: 40, color: 'primary.main', mb: 2 }} />
			),
			title: '24/7 지원',
			description: '언제든 연락주세요. 담당자가 도움드리겠습니다.',
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
				'기본 서비스 외에도 유명인사 데이터나 AI 를 활용한 여러가지 기능을 부착할 예정입니다. 인물 별 대사, 음성 서비스 등을 기획하고 있습니다.',
		},
	];

	return (
		<Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
			<StyledHeader theme={theme}>
				<HeaderContent>
					<Container maxWidth="lg">
						<Typography variant="h3" component="h1" gutterBottom>
							서비스 이용 가이드
						</Typography>
						<Typography variant="h6">
							더 나은 사이트 이용을 위해 TopStarPicks가 제공하는 기능을 확인해
							보세요
						</Typography>
					</Container>
				</HeaderContent>
			</StyledHeader>

			<Container maxWidth="lg" sx={{ py: 8 }}>
				{/* Features Section */}
				<Typography variant="h4" gutterBottom sx={{ mb: 4 }}>
					주요 기능
				</Typography>
				<Box
					sx={{
						display: 'grid',
						gridTemplateColumns: {
							xs: '1fr',
							md: 'repeat(2, 1fr)',
						},
						gap: 3,
						mb: 8,
					}}>
					{features.map((feature, index) => (
						<FeatureCard key={index} theme={theme} elevation={3}>
							<CardContent sx={{ p: 4 }}>
								{feature.icon}
								<Typography variant="h6" gutterBottom>
									{feature.title}
								</Typography>
								<Typography variant="body2" color="text.secondary">
									{feature.description}
								</Typography>
							</CardContent>
						</FeatureCard>
					))}
				</Box>

				{/* FAQ Section */}
				<Typography variant="h4" gutterBottom sx={{ mb: 4 }}>
					자주 묻는 질문
				</Typography>
				{faqs.map((faq, index) => (
					<StyledAccordion key={index} theme={theme}>
						<AccordionSummary
							expandIcon={<ExpandMoreIcon />}
							aria-controls={`panel${index}-content`}
							id={`panel${index}-header`}>
							<Typography variant="h6">{faq.question}</Typography>
						</AccordionSummary>
						<AccordionDetails>
							<Typography>{faq.answer}</Typography>
						</AccordionDetails>
					</StyledAccordion>
				))}
			</Container>
		</Box>
	);
};

export default Guide;
