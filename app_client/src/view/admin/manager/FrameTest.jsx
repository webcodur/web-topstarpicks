import React, { useState } from 'react';
import { Card } from '../../../components/ui/card';

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
		<div className="flex flex-col gap-6 p-4">
			<div className="flex gap-2 mb-4">
				{frameSettings.map((frame) => (
					<Card
						key={frame.id}
						className={`cursor-pointer p-2 transition-all hover:shadow-lg ${
							selectedFrame.id === frame.id
								? 'border-2 border-primary shadow-lg'
								: 'border-2 border-transparent'
						}`}
						onClick={() => setSelectedFrame(frame)}>
						<img
							src={frame.frameUrl}
							alt={`프레임 ${frame.id}`}
							className="w-20 h-30 object-fill"
						/>
					</Card>
				))}
			</div>

			<div className="flex justify-center">
				<Frame
					frameUrl={selectedFrame.frameUrl}
					scale={selectedFrame.scale}
					frameExpand={selectedFrame.frameExpand}>
					<DisplayImage src={testImage} alt="테스트 이미지" />
				</Frame>
			</div>
		</div>
	);
};

// Tailwind CSS equivalent components
const FrameWrapper = ({ children }) => (
	<div className="relative w-fit">{children}</div>
);

const FrameContainer = ({ children }) => (
	<div className="w-[400px] h-[600px] relative flex items-center justify-center">
		{children}
	</div>
);

const FrameImage = ({ src, frameExpand, alt }) => (
	<img
		src={src}
		alt={alt}
		className="w-full h-full object-fill relative z-20"
		style={{
			transform: `scale(${frameExpand})`,
			transformOrigin: 'center'
		}}
	/>
);

const ImageContainer = ({ scale, children }) => (
	<div 
		className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center z-10 aspect-[2/3]"
		style={{
			width: `${scale * 100}%`,
			height: `${scale * 100}%`
		}}
	>
		{children}
	</div>
);

const DisplayImage = ({ src, alt }) => (
	<img
		src={src}
		alt={alt}
		className="w-full h-full object-cover"
	/>
);

export default FrameTest;
