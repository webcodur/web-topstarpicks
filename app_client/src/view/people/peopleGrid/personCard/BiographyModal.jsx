import React from 'react';
import { Dialog, DialogContent } from 'components/ui/dialog';
import { Button } from 'components/ui/button';
import { X } from 'lucide-react';
import { useAtom } from 'jotai';
import { darkModeAtom } from '../../../../store/atom';

const BiographyModal = ({ isOpen, onClose, biography, name }) => {
	const [darkMode] = useAtom(darkModeAtom);

	return (
		<Dialog open={isOpen} onOpenChange={onClose}>
			<DialogContent className="max-w-2xl w-full max-h-[80vh] overflow-y-auto">
				<Button
					variant="ghost"
					size="sm"
					className="absolute top-2 right-2 p-2 h-auto"
					onClick={onClose}>
					<X className="h-4 w-4" />
				</Button>
				<h2 className={`text-2xl font-semibold mb-4 text-center font-['Song_Myung'] ${
					darkMode ? 'text-gray-200' : 'text-gray-800'
				}`}>
					{name}
				</h2>
				<p className={`leading-relaxed ${
					darkMode ? 'text-gray-300' : 'text-gray-700'
				}`}>
					{biography || '정보가 없습니다.'}
				</p>
			</DialogContent>
		</Dialog>
	);
};

export default BiographyModal;
