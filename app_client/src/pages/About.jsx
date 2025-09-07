import React, { useState } from 'react';
import { Card, CardContent } from '../components/ui';
import { Button } from '../components/ui';
import { useToast } from '../hooks/use-toast';
import { Mail } from 'lucide-react';




const About = () => {
	const { toast } = useToast();

	const contactInfo = {
		email: 'webcodur@gmail.com',
	};

	const handleCopyEmail = () => {
		navigator.clipboard
			.writeText(contactInfo.email)
			.then(() => {
				toast({
					title: '성공',
					description: '이메일이 복사되었습니다',
				});
			})
			.catch(() => {
				toast({
					title: '오류',
					description: '복사 실패',
					variant: 'destructive',
				});
			});
	};


	return (
		<div className="min-h-screen bg-gray-50 py-8 px-2">
			<div className="max-w-4xl mx-auto">
				<Card className="p-6 shadow-lg">
					<CardContent className="p-0">
						<div className="w-44 h-44 rounded-full overflow-hidden mx-auto mb-6 border-3 border-white shadow-lg">
							<img
								src="https://images.ctfassets.net/o78em1y1w4i4/LHN0F94cNFCx1drEcfcsY/984e632abf38018f2a6ab22c4b61fdc6/teaser-book-with-heart-pages.jpg?fm=webp&w=1160&q=75"
								alt="Profile"
								className="w-full h-full object-cover"
							/>
						</div>

						<h1 className="text-3xl font-bold text-center mb-4">
							webcodur
						</h1>

						<p className="text-lg text-center text-gray-600 mb-6">
							TopStarPicks 운영자
						</p>

						<div className="flex justify-center mb-8">
							<Button
								variant="ghost"
								size="icon"
								onClick={handleCopyEmail}
								aria-label="Copy email address"
								className="hover:scale-110 transition-all duration-200">
								<Mail className="h-5 w-5" />
							</Button>
						</div>

						<div className="border-t my-8"></div>

						<div className="mb-8">
							<h2 className="text-xl font-bold mb-4">
								서비스 소개
							</h2>
							<p className="text-gray-600 mb-4">
								TopStarPicks는 셀럽들의 다양한 콘텐츠를 큐레이션하고 추천하는
								온라인 아카이브 서비스입니다. 책, 영화 등 셀럽들의 트렌디한
								선택을 한눈에 확인할 수 있으며, 인물 별 영향력 수치를
								제공합니다.
							</p>
							<p className="text-gray-600">
								셀럽들의 데이터를 활용한 여러가지 흥미로운 서비스를 보여주는
								공간이 되고자 합니다. 셀럽들의 자료에서 지식을 얻고 당신만의
								유니크한 인사이트를 만들어 보세요.
							</p>
						</div>

						<div>
							<h2 className="text-xl font-bold mb-4">
								연락처
							</h2>
							<div className="flex items-center">
								<p className="text-gray-600">
									Email: {contactInfo.email}
								</p>
							</div>
						</div>
					</CardContent>
				</Card>
			</div>
		</div>
	);
};

export default About;
