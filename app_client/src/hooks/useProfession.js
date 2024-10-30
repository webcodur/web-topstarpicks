import { useState, useEffect } from 'react';
import { fetchProfessions } from 'api/professionApi';

export const useProfession = () => {
	const [professions, setProfessions] = useState([]);

	useEffect(() => {
		fetchProfessions()
			.then((response) => setProfessions(response.data))
			.catch((error) => console.error('Error fetching professions:', error));
	}, []);

	return professions;
};
