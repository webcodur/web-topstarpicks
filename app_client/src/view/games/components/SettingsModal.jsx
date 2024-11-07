import React, { useState } from 'react';
import { Modal, Typography, Slider } from '@mui/material';
import * as S from './styles/modalStyles';

export const SettingsModal = ({ open, onClose, settings, onSave }) => {
	const [localSettings, setLocalSettings] = useState(settings);

	const handleChange = (key, value) => {
		setLocalSettings((prev) => ({
			...prev,
			[key]: value,
		}));
	};

	const handleSave = () => {
		onSave(localSettings);
	};

	return (
		<Modal open={open} onClose={onClose}>
			<S.ModalContainer>
				<S.ModalHeader>
					<Typography variant="h5">게임 설정</Typography>
					<S.CloseButton onClick={onClose}>×</S.CloseButton>
				</S.ModalHeader>

				<S.ModalContent>
					<S.SettingSection>
						<Typography gutterBottom>시작 카드 수</Typography>
						<Slider
							value={localSettings.initialHandSize}
							onChange={(_, value) => handleChange('initialHandSize', value)}
							min={3}
							max={6}
							step={1}
							marks
							valueLabelDisplay="auto"
						/>
					</S.SettingSection>

					<S.SettingSection>
						<Typography gutterBottom>난이도</Typography>
						<S.ButtonGroup>
							{['easy', 'normal', 'hard'].map((difficulty) => (
								<S.SettingButton
									key={difficulty}
									isActive={localSettings.difficulty === difficulty}
									onClick={() => handleChange('difficulty', difficulty)}>
									{difficulty === 'easy'
										? '쉬움'
										: difficulty === 'normal'
										? '보통'
										: '어려움'}
								</S.SettingButton>
							))}
						</S.ButtonGroup>
					</S.SettingSection>

					<S.SettingSection>
						<Typography gutterBottom>배경음악 볼륨</Typography>
						<Slider
							value={localSettings.bgmVolume}
							onChange={(_, value) => handleChange('bgmVolume', value)}
							min={0}
							max={1}
							step={0.1}
							valueLabelDisplay="auto"
							valueLabelFormat={(value) => `${Math.round(value * 100)}%`}
						/>
					</S.SettingSection>

					<S.SettingSection>
						<Typography gutterBottom>효과음 볼륨</Typography>
						<Slider
							value={localSettings.sfxVolume}
							onChange={(_, value) => handleChange('sfxVolume', value)}
							min={0}
							max={1}
							step={0.1}
							valueLabelDisplay="auto"
							valueLabelFormat={(value) => `${Math.round(value * 100)}%`}
						/>
					</S.SettingSection>

					<S.ButtonGroup>
						<S.SaveButton onClick={handleSave}>저장</S.SaveButton>
						<S.CancelButton onClick={onClose}>취소</S.CancelButton>
					</S.ButtonGroup>
				</S.ModalContent>
			</S.ModalContainer>
		</Modal>
	);
};
