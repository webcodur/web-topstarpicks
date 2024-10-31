import { useState } from 'react';

export const useModalState = () => {
	const [modalOpen, setModalOpen] = useState(false);
	const [selectedPerson, setSelectedPerson] = useState(null);

	const handleModalOpen = (person) => {
		setSelectedPerson(person);
		setModalOpen(true);
	};

	const handleModalClose = () => setModalOpen(false);

	return {
		modalOpen,
		selectedPerson,
		handleModalOpen,
		handleModalClose,
	};
};
