// SettingsModal.jsx
/* 우상단 설정창 */
import React, { memo } from 'react';
import { X } from 'lucide-react';
import { useAtom } from 'jotai';
import { darkModeAtom, languageAtom } from 'store/atom';
import { useLanguage } from 'i18n/i18nUtils';
import { useTranslation } from 'react-i18next';
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
} from '../../ui/dialog';
import { Switch } from '../../ui/switch';
import { Label } from '../../ui/label';
import { Button } from '../../ui/button';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '../../ui/dropdown-menu';

const SettingsModal = memo(({ open, onClose }) => {
	const [darkMode, setDarkMode] = useAtom(darkModeAtom);
	const [language, setLanguage] = useAtom(languageAtom);
	const { handleLanguageChange } = useLanguage(language, setLanguage);
	const { t } = useTranslation();

	const handleDarkModeToggle = () => setDarkMode(!darkMode);

	const languageOptions = {
		ko: t('korean'),
		en: t('english'),
	};

	return (
		<Dialog open={open} onOpenChange={onClose}>
			<DialogContent className="sm:max-w-[425px]">
				<DialogHeader>
					<DialogTitle>{t('settings')}</DialogTitle>
				</DialogHeader>
				
				<div className="space-y-6 py-4">
					{/* 다크 모드 */}
					<div className="flex items-center justify-between">
						<Label htmlFor="dark-mode" className="text-base">
							{t(darkMode ? 'dark_mode' : 'light_mode')}
						</Label>
						<Switch
							id="dark-mode"
							checked={darkMode}
							onCheckedChange={handleDarkModeToggle}
						/>
					</div>

					{/* 다국어 설정 */}
					<div className="space-y-2">
						<Label className="text-base">{t('language_settings')}</Label>
						<DropdownMenu>
							<DropdownMenuTrigger asChild>
								<Button variant="outline" className="w-full justify-between">
									{languageOptions[language]}
									<span className="ml-2">▼</span>
								</Button>
							</DropdownMenuTrigger>
							<DropdownMenuContent className="w-full">
								<DropdownMenuItem onClick={() => handleLanguageChange('ko')}>
									{t('korean')}
								</DropdownMenuItem>
								<DropdownMenuItem onClick={() => handleLanguageChange('en')}>
									{t('english')}
								</DropdownMenuItem>
							</DropdownMenuContent>
						</DropdownMenu>
					</div>
				</div>
			</DialogContent>
		</Dialog>
	);
});

export default SettingsModal;