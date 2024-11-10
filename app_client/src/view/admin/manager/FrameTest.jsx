import React, { useState } from 'react';
import styled from '@emotion/styled';
import { Box, Paper } from '@mui/material';

// 액자 설정 데이터
const frameSettings = [
	{
		id: 1,
		frameUrl:
			'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhg09XoNb8k00ZI9mre03Z3PYWrldeVnAmlGWH72Ncdv8H1IshbEumRSXc8YlxbvN3EnAwaGwMc4Ab5Zp1_8r7bhqMdYd13JCPJSK6qIp3t01nJlPK7yurEBsMUoiSZUIIrQwqw5oJfgZW-PMFLvHitHXeTsjVx2hMuSIU6jRP-8yPd3zaKD-h_DCjHP3k/s1600/0.png',
		scale: 0.9,
		frameExpand: 1.2,
	},
	{
		id: 2,
		frameUrl:
			'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEh8yEwhsoHgA55ItJRk_K1boNk7gnDZnEmkqledaXumVqbWYagdoRbd3TlfVyIRixaapXjoDQNGuGuxH7acxi4RxJiBPaQaWBGWtE4DqI6If7idICc_fZaMztQKElroXN4kNdfzHPeIZF47aTTItoc1poXugnr0k2bb7QB-mUax1HrzYToy33rqsfxfSr0/s1600/1.png',
		scale: 0.9,
		frameExpand: 1.4,
	},
	{
		id: 3,
		frameUrl:
			'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgklM5d3v7KSxfi-HB6Wsbw6AjQhy8l2q065y1sXpNj4uOF8OY_FwANNmUyXnRDpgRmCWWI42qv17nT8YmvCmbaAx9wSHPIgWFofTnIT8pt-Tq2xHY6oLI_gY0UGI7Jmg4lmAmAMGbFQ3Ki15TpMDsJy37fhV6SA33pVlxRlhqcO27kOWOMg1iW1gZjSt8/s1600/2.png',
		scale: 0.9,
		frameExpand: 1.35,
	},
	{
		id: 4,
		frameUrl:
			'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgPSkSfRC4jjvTUsAP0q7NAfUIXzisbfoJLeJy-mMfqtfBtnGNfqp8w576mumzYx7CaXlICD633x1p8MJo5Ceqwt2yovdfVJ4TpvL9xrOoX1LHY_c1RluVYDgibiboLNbeiZOeqGBG6_VvHG457vTEF3eLiKeEE-CWFatDk0mkSzo4pYlqU3Sb7IyDBmBI/s1600/3.png',
		scale: 0.95,
		frameExpand: 1.15,
	},
	{
		id: 5,
		frameUrl:
			'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEiZ0VmDBUEcfYc7ob5xVfo_RpQfeS4Rh_Qn9WBhDLnhb4uGJVBPtW42-TzdqZtLPUdo1V4HLy2-50DxFq56ZXvcNIZMf8f0OkNGjrZc-EVf9V8TwYDN8OpvcAv995_pHSa3I3nCynqAu_LtnGKOdtIeTdzJVlBbx6nY1zT_bePTGGbSCPZhTawmRJsYGak/s1600/4.png',
		scale: 0.97,
		frameExpand: 1.15,
	},
];

// 테스트용 이미지
const testImage =
	'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgAKkF3bco1uDM79L1vTQ8LYtK58wIAgnTUcmA6Tv-a7Cl4JX0AkkxWTdJEBEelZCLdLiZvkI8lRCxpmrdOFFYDY9WBhM4_2DUMcxpo67jNNJfks7U0150pWh2-q8nQWusALQBkhXPsQDy47-dK3hTzJq7miWy-cch7o7mnzH-29V4ILj8ultIVlRodjHM/s1600/chrome_TxX2TSuvF0.png';

const Frame = ({ frameUrl, scale, frameExpand, children }) => {
	return (
		<FrameWrapper>
			<FrameContainer>
				<FrameImage src={frameUrl} frameExpand={frameExpand} />
			</FrameContainer>
			<ImageContainer scale={scale}>{children}</ImageContainer>
		</FrameWrapper>
	);
};

const FrameTest = () => {
	const [selectedFrame, setSelectedFrame] = useState(frameSettings[0]);

	return (
		<Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, p: 2 }}>
			<Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
				{frameSettings.map((frame) => (
					<Paper
						key={frame.id}
						elevation={selectedFrame.id === frame.id ? 8 : 1}
						sx={{
							cursor: 'pointer',
							border: (theme) =>
								selectedFrame.id === frame.id
									? `2px solid ${theme.palette.primary.main}`
									: '2px solid transparent',
							p: 0.5,
						}}
						onClick={() => setSelectedFrame(frame)}>
						<Box
							component="img"
							src={frame.frameUrl}
							alt={`프레임 ${frame.id}`}
							sx={{
								width: 80,
								height: 120,
								objectFit: 'fill',
							}}
						/>
					</Paper>
				))}
			</Box>

			<Box sx={{ display: 'flex', justifyContent: 'center' }}>
				<Frame
					frameUrl={selectedFrame.frameUrl}
					scale={selectedFrame.scale}
					frameExpand={selectedFrame.frameExpand}>
					<DisplayImage src={testImage} alt="테스트 이미지" />
				</Frame>
			</Box>
		</Box>
	);
};

const FrameWrapper = styled.div`
	position: relative;
	width: fit-content;
`;

const FrameContainer = styled.div`
	width: 400px;
	height: 600px;
	position: relative;
	display: flex;
	align-items: center;
	justify-content: center;
`;

const FrameImage = styled.img`
	width: 100%;
	height: 100%;
	object-fit: fill;
	position: relative;
	z-index: 2;
	transform: scale(${(props) => props.frameExpand});
	transform-origin: center;
`;

const ImageContainer = styled.div`
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	width: ${(props) => props.scale * 100}%;
	height: ${(props) => props.scale * 100}%;
	display: flex;
	align-items: center;
	justify-content: center;
	z-index: 1;
	aspect-ratio: 2/3;
`;

const DisplayImage = styled.img`
	width: 100%;
	height: 100%;
	object-fit: cover;
`;

export default FrameTest;
