import React, { useState } from 'react';
import {
	Card,
	CardContent,
	Container,
	Typography,
	Box,
	IconButton,
	Divider,
	Snackbar,
	Alert,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import EmailIcon from '@mui/icons-material/Email';

const ProfileImage = styled(Box)({
	width: '180px',
	height: '180px',
	borderRadius: '50%',
	overflow: 'hidden',
	margin: '0 auto 24px',
	border: '3px solid #fff',
	boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
	'& img': {
		width: '100%',
		height: '100%',
		objectFit: 'cover',
	},
});

const ContactButton = styled(IconButton)(({ theme }) => ({
	margin: theme.spacing(0, 1),
	color: theme.palette.text.secondary,
	cursor: 'pointer',
	'&:hover': {
		color: theme.palette.primary.main,
		transform: 'scale(1.1)',
		transition: 'all 0.2s ease-in-out',
		backgroundColor: 'rgba(0, 0, 0, 0.04)',
	},
}));

const ContactItem = styled(Box)({
	display: 'flex',
	alignItems: 'center',
	marginBottom: '8px',
});

const About = () => {
	const [snackbar, setSnackbar] = useState({
		open: false,
		message: '',
		severity: 'success',
	});

	const contactInfo = {
		email: 'webcodur@gmail.com',
	};

	const handleCopyEmail = () => {
		navigator.clipboard
			.writeText(contactInfo.email)
			.then(() => {
				setSnackbar({
					open: true,
					message: '이메일이 복사되었습니다',
					severity: 'success',
				});
			})
			.catch(() => {
				setSnackbar({
					open: true,
					message: '복사 실패',
					severity: 'error',
				});
			});
	};

	const handleCloseSnackbar = () => {
		setSnackbar((prev) => ({ ...prev, open: false }));
	};

	return (
		<Box
			sx={{
				minHeight: '100vh',
				bgcolor: 'grey.50',
				py: 8,
				px: 2,
			}}>
			<Container maxWidth="md">
				<Card
					sx={{
						p: 4,
						boxShadow: '0 8px 24px rgba(0,0,0,0.1)',
						borderRadius: 2,
					}}>
					<CardContent>
						<ProfileImage>
							<img
								src="https://images.ctfassets.net/o78em1y1w4i4/LHN0F94cNFCx1drEcfcsY/984e632abf38018f2a6ab22c4b61fdc6/teaser-book-with-heart-pages.jpg?fm=webp&w=1160&q=75"
								alt="Profile"
							/>
						</ProfileImage>

						<Typography
							variant="h4"
							align="center"
							gutterBottom
							sx={{ fontWeight: 'bold' }}>
							webcodur
						</Typography>

						<Typography
							variant="subtitle1"
							align="center"
							color="text.secondary"
							sx={{ mb: 3 }}>
							TopStarPicks 운영자
						</Typography>

						<Box sx={{ display: 'flex', justifyContent: 'center', mb: 4 }}>
							<ContactButton
								onClick={handleCopyEmail}
								aria-label="Copy email address">
								<EmailIcon />
							</ContactButton>
						</Box>

						<Divider sx={{ my: 4 }} />

						<Box sx={{ mb: 4 }}>
							<Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold' }}>
								서비스 소개
							</Typography>
							<Typography variant="body1" color="text.secondary" paragraph>
								TopStarPicks는 셀럽들의 다양한 콘텐츠를 큐레이션하고 추천하는
								온라인 아카이브 서비스입니다. 책, 영화 등 셀럽들의 트렌디한
								선택을 한눈에 확인할 수 있으며, 인물 별 영향력 수치를
								제공합니다.
							</Typography>
							<Typography variant="body1" color="text.secondary">
								셀럽들의 데이터를 활용한 여러가지 흥미로운 서비스를 보여주는
								공간이 되고자 합니다. 셀럽들의 자료에서 지식을 얻고 당신만의
								유니크한 인사이트를 만들어 보세요.
							</Typography>
						</Box>

						<Box>
							<Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold' }}>
								연락처
							</Typography>
							<ContactItem>
								<Typography variant="body1" color="text.secondary">
									Email: {contactInfo.email}
								</Typography>
							</ContactItem>
						</Box>
					</CardContent>
				</Card>
			</Container>

			<Snackbar
				open={snackbar.open}
				autoHideDuration={2000}
				onClose={handleCloseSnackbar}
				anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}>
				<Alert
					onClose={handleCloseSnackbar}
					severity={snackbar.severity}
					sx={{ width: '100%' }}>
					{snackbar.message}
				</Alert>
			</Snackbar>
		</Box>
	);
};

export default About;
