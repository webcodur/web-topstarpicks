import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
	Container,
	Typography,
	Slider,
	FormControl,
	FormLabel,
	RadioGroup,
	FormControlLabel,
	Radio,
} from '@mui/material';
import * as S from './styles/gameSettingsStyles';

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
		<S.SettingsContainer>
			<Container maxWidth="md">
				<S.Header>
					<Typography variant="h3">게임 설정</Typography>
					<S.BackButton onClick={() => navigate('/games')}>
						메인으로 돌아가기
					</S.BackButton>
				</S.Header>

				<S.SettingsContent>
					<S.SettingSection>
						<Typography variant="h6" gutterBottom>
							시작 카드 수
						</Typography>
						<Slider
							value={settings.initialHandSize}
							onChange={(_, value) => handleChange('initialHandSize', value)}
							min={3}
							max={6}
							step={1}
							marks
							valueLabelDisplay="auto"
						/>
					</S.SettingSection>

					<S.SettingSection>
						<Typography variant="h6" gutterBottom>
							난이도 설정
						</Typography>
						<FormControl component="fieldset">
							<RadioGroup
								value={settings.difficulty}
								onChange={(e) => handleChange('difficulty', e.target.value)}>
								<FormControlLabel
									value="easy"
									control={<Radio />}
									label="쉬움"
								/>
								<FormControlLabel
									value="normal"
									control={<Radio />}
									label="보통"
								/>
								<FormControlLabel
									value="hard"
									control={<Radio />}
									label="어려움"
								/>
							</RadioGroup>
						</FormControl>
					</S.SettingSection>

					<S.SettingSection>
						<Typography variant="h6" gutterBottom>
							AI 속도
						</Typography>
						<FormControl component="fieldset">
							<RadioGroup
								value={settings.aiSpeed}
								onChange={(e) => handleChange('aiSpeed', e.target.value)}>
								<FormControlLabel
									value="slow"
									control={<Radio />}
									label="느림"
								/>
								<FormControlLabel
									value="normal"
									control={<Radio />}
									label="보통"
								/>
								<FormControlLabel
									value="fast"
									control={<Radio />}
									label="빠름"
								/>
							</RadioGroup>
						</FormControl>
					</S.SettingSection>

					<S.SettingSection>
						<Typography variant="h6" gutterBottom>
							배경음악 볼륨
						</Typography>
						<Slider
							value={settings.bgmVolume}
							onChange={(_, value) => handleChange('bgmVolume', value)}
							min={0}
							max={1}
							step={0.1}
							valueLabelDisplay="auto"
							valueLabelFormat={(value) => `${Math.round(value * 100)}%`}
						/>
					</S.SettingSection>

					<S.SettingSection>
						<Typography variant="h6" gutterBottom>
							효과음 볼륨
						</Typography>
						<Slider
							value={settings.sfxVolume}
							onChange={(_, value) => handleChange('sfxVolume', value)}
							min={0}
							max={1}
							step={0.1}
							valueLabelDisplay="auto"
							valueLabelFormat={(value) => `${Math.round(value * 100)}%`}
						/>
					</S.SettingSection>

					<S.ButtonGroup>
						<S.SaveButton onClick={handleSave}>설정 저장</S.SaveButton>
					</S.ButtonGroup>
				</S.SettingsContent>
			</Container>
		</S.SettingsContainer>
	);
};

export default GameSettings;
