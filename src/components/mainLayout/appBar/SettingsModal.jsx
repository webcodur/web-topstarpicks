// SettingsModal.jsx
import React, { memo } from 'react';
import {
	Modal,
	Typography,
	IconButton,
	Switch,
	FormControlLabel,
	Select,
	MenuItem,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useAtom } from 'jotai';
import { darkModeAtom, languageAtom } from 'store/atom';
import { useLanguage } from 'i18n/i18nUtils';
import { useTranslation } from 'react-i18next';
import {
	SettingsModalContainer,
	SettingsModalHeader,
	LanguageSelectWrapper,
} from './AppBarStyles';

const SettingsModal = memo(({ open, onClose }) => {
	const [darkMode, setDarkMode] = useAtom(darkModeAtom);
	const [language, setLanguage] = useAtom(languageAtom);
	const { handleLanguageChange } = useLanguage(language, setLanguage);
	const { t } = useTranslation();

	const handleDarkModeToggle = () => setDarkMode(!darkMode);

	return (
		<Modal open={open} onClose={onClose} aria-labelledby="settings-modal-title">
			<SettingsModalContainer>
				<SettingsModalHeader>
					<Typography id="settings-modal-title" variant="h6" component="h2">
						{t('settings')}
					</Typography>
					<IconButton onClick={onClose} aria-label="close">
						<CloseIcon />
					</IconButton>
				</SettingsModalHeader>

				<FormControlLabel
					control={
						<Switch checked={darkMode} onChange={handleDarkModeToggle} />
					}
					label={t(darkMode ? 'dark_mode' : 'light_mode')}
				/>

				<LanguageSelectWrapper>
					<Typography variant="subtitle1">{t('language_settings')}</Typography>
					<Select
						value={language}
						onChange={(e) => handleLanguageChange(e.target.value)}
						fullWidth>
						<MenuItem value="ko">{t('korean')}</MenuItem>
						<MenuItem value="en">{t('english')}</MenuItem>
					</Select>
				</LanguageSelectWrapper>
			</SettingsModalContainer>
		</Modal>
	);
});

export default SettingsModal;
