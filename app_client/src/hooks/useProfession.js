import { useState, useEffect } from 'react';
import { fetchProfessions } from 'api/professionApi';

export const useProfession = () => {
	const [professions, setProfessions] = useState([]);

	useEffect(() => {
		const loadProfessions = async () => {
			try {
				const response = await fetchProfessions();
				if (response?.data) {
					setProfessions(response.data);
				}
			} catch (error) {
				console.error('Failed to load professions:', error);
				setProfessions([]);
			}
		};

		loadProfessions();
	}, []);

	return professions;
};
