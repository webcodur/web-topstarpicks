import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../../components/ui/button';
import { Card, CardContent } from '../../../components/ui/card';
import { Label } from '../../../components/ui/label';

const GameSettings = () => {
	const navigate = useNavigate();
	const [settings, setSettings] = useState({
		initialHandSize: 4,
		difficulty: 'normal',
		bgmVolume: 0.5,
		sfxVolume: 0.7,
		aiSpeed: 'normal',
		cardAnimation: true,
	});

	const handleChange = (key, value) => {
		setSettings((prev) => ({
			...prev,
			[key]: value,
		}));
	};

	const handleSave = () => {
		// TODO: 설정 저장 로직
		localStorage.setItem('gameSettings', JSON.stringify(settings));
		navigate('/games');
	};

	return (
		<div className="min-h-screen py-10 px-4 bg-gray-100 dark:bg-gray-900">
			<div className="max-w-4xl mx-auto">
				<div className="flex justify-between items-center mb-10">
					<h1 className="text-4xl font-bold text-gray-800 dark:text-gray-200">게임 설정</h1>
					<Button
						onClick={() => navigate('/games')}
						variant="default"
						size="lg"
					>
						메인으로 돌아가기
					</Button>
				</div>

				<Card className="shadow-lg">
					<CardContent className="p-8 space-y-8">
						<div className="space-y-4">
							<h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
								시작 카드 수
							</h3>
							<div className="px-3">
								<input
									type="range"
									min={3}
									max={6}
									step={1}
									value={settings.initialHandSize}
									onChange={(e) => handleChange('initialHandSize', parseInt(e.target.value))}
									className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
								/>
								<div className="flex justify-between text-sm text-gray-600 dark:text-gray-400 mt-2">
									<span>3</span>
									<span>4</span>
									<span>5</span>
									<span>6</span>
								</div>
								<div className="text-center mt-2 text-lg font-semibold">
									{settings.initialHandSize}
								</div>
							</div>
						</div>

						<div className="space-y-4">
							<h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
								난이도 설정
							</h3>
							<div className="space-y-2">
								{['easy', 'normal', 'hard'].map((difficulty) => (
									<Label key={difficulty} className="flex items-center space-x-3 cursor-pointer">
										<input
											type="radio"
											name="difficulty"
											value={difficulty}
											checked={settings.difficulty === difficulty}
											onChange={(e) => handleChange('difficulty', e.target.value)}
											className="w-4 h-4 text-primary-main bg-gray-100 border-gray-300 dark:bg-gray-700 dark:border-gray-600"
										/>
										<span className="text-gray-700 dark:text-gray-300">
											{difficulty === 'easy' ? '쉬움' : difficulty === 'normal' ? '보통' : '어려움'}
										</span>
									</Label>
								))}
							</div>
						</div>

						<div className="space-y-4">
							<h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
								AI 속도
							</h3>
							<div className="space-y-2">
								{['slow', 'normal', 'fast'].map((speed) => (
									<Label key={speed} className="flex items-center space-x-3 cursor-pointer">
										<input
											type="radio"
											name="aiSpeed"
											value={speed}
											checked={settings.aiSpeed === speed}
											onChange={(e) => handleChange('aiSpeed', e.target.value)}
											className="w-4 h-4 text-primary-main bg-gray-100 border-gray-300 dark:bg-gray-700 dark:border-gray-600"
										/>
										<span className="text-gray-700 dark:text-gray-300">
											{speed === 'slow' ? '느림' : speed === 'normal' ? '보통' : '빠름'}
										</span>
									</Label>
								))}
							</div>
						</div>

						<div className="space-y-4">
							<h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
								배경음악 볼륨
							</h3>
							<div className="px-3">
								<input
									type="range"
									min={0}
									max={1}
									step={0.1}
									value={settings.bgmVolume}
									onChange={(e) => handleChange('bgmVolume', parseFloat(e.target.value))}
									className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
								/>
								<div className="text-center mt-2 text-lg font-semibold">
									{Math.round(settings.bgmVolume * 100)}%
								</div>
							</div>
						</div>

						<div className="space-y-4">
							<h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
								효과음 볼륨
							</h3>
							<div className="px-3">
								<input
									type="range"
									min={0}
									max={1}
									step={0.1}
									value={settings.sfxVolume}
									onChange={(e) => handleChange('sfxVolume', parseFloat(e.target.value))}
									className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
								/>
								<div className="text-center mt-2 text-lg font-semibold">
									{Math.round(settings.sfxVolume * 100)}%
								</div>
							</div>
						</div>

						<div className="flex justify-end mt-10">
							<Button onClick={handleSave} variant="default" size="lg" className="px-8">
								설정 저장
							</Button>
						</div>
					</CardContent>
				</Card>
			</div>
		</div>
	);
};

export default GameSettings;
