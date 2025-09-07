import React, { useState } from 'react';
import { ChevronDown, Hand, HelpCircle } from 'lucide-react';
import { Card, CardContent } from '../../components/ui/card';
import { useAtom } from 'jotai';
import { darkModeAtom } from '../../store/atom';

const Guide = () => {
	const [expandedFaq, setExpandedFaq] = useState(null);
	const [darkMode] = useAtom(darkModeAtom);
	
	const features = [
		{
			icon: <Hand className="w-10 h-10 text-primary mb-4" />,
			title: '직접 유명인사들의 영향력을 평가해볼 수 있습니다.',
			description:
				'사이트에 없는 유명인사들의 영향력 지표를 직접 측정해 볼 수 있습니다. chatGPT 를 활용한 영향력 생성기를 활용해 보세요! (개발중입니다)',
		},
		{
			icon: <HelpCircle className="w-10 h-10 text-primary mb-4" />,
			title: '24/7 지원',
			description: '언제든 연락주세요. 담당자가 도움드리겠습니다.',
		},
	];
	
	const toggleFaq = (index) => {
		setExpandedFaq(expandedFaq === index ? null : index);
	};

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
		<div className={`min-h-screen ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
			{/* Header Section */}
			<div className={`py-16 px-4 ${darkMode ? 'bg-gray-800' : 'bg-white'} border-b`}>
				<div className="max-w-4xl mx-auto text-center">
					<h1 className={`text-4xl font-bold mb-4 ${
						darkMode ? 'text-white' : 'text-gray-900'
					}`}>
						서비스 이용 가이드
					</h1>
					<p className={`text-xl ${
						darkMode ? 'text-gray-300' : 'text-gray-600'
					}`}>
						더 나은 사이트 이용을 위해 TopStarPicks가 제공하는 기능을 확인해 보세요
					</p>
				</div>
			</div>

			<div className="max-w-4xl mx-auto py-16 px-4">
				{/* Features Section */}
				<h2 className={`text-3xl font-bold mb-8 ${
					darkMode ? 'text-white' : 'text-gray-900'
				}`}>
					주요 기능
				</h2>
				<div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
					{features.map((feature, index) => (
						<Card key={index} className={`p-6 shadow-lg ${
							darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white'
						}`}>
							<CardContent className="p-0">
								{React.cloneElement(feature.icon, {
									className: `w-10 h-10 mb-4 ${
										darkMode ? 'text-blue-400' : 'text-blue-600'
									}`
								})}
								<h3 className={`text-xl font-semibold mb-2 ${
									darkMode ? 'text-white' : 'text-gray-900'
								}`}>
									{feature.title}
								</h3>
								<p className={`text-sm leading-relaxed ${
									darkMode ? 'text-gray-300' : 'text-gray-600'
								}`}>
									{feature.description}
								</p>
							</CardContent>
						</Card>
					))}
				</div>

				{/* FAQ Section */}
				<h2 className={`text-3xl font-bold mb-8 ${
					darkMode ? 'text-white' : 'text-gray-900'
				}`}>
					자주 묻는 질문
				</h2>
				<div className="space-y-4">
					{faqs.map((faq, index) => (
						<div key={index} className={`border rounded-lg ${
							darkMode ? 'border-gray-700 bg-gray-800' : 'border-gray-200 bg-white'
						}`}>
							<button
								className={`w-full p-4 text-left flex items-center justify-between hover:bg-opacity-50 ${
									darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-50'
								}`}
								onClick={() => toggleFaq(index)}>
								<h3 className={`text-lg font-semibold ${
									darkMode ? 'text-white' : 'text-gray-900'
								}`}>
									{faq.question}
								</h3>
								<ChevronDown className={`w-5 h-5 transition-transform ${
									expandedFaq === index ? 'rotate-180' : ''
								} ${darkMode ? 'text-gray-400' : 'text-gray-500'}`} />
							</button>
							{expandedFaq === index && (
								<div className={`px-4 pb-4 border-t ${
									darkMode ? 'border-gray-700' : 'border-gray-200'
								}`}>
									<p className={`pt-4 ${
										darkMode ? 'text-gray-300' : 'text-gray-700'
									}`}>
										{faq.answer}
									</p>
								</div>
							)}
						</div>
					))}
				</div>
			</div>
		</div>
	);
};

export default Guide;