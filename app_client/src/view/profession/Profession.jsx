import React, { useCallback, useRef, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Grid, Typography } from '@mui/material';
import { formatNameForUrl } from 'utils/urlUtils';
import { calculateAge } from 'utils/date';
import { useAtom } from 'jotai';
import { contentNameAtom } from 'store/atom';
import CelebImage from './CelebImage';
import useProfessionData from './useProfessionData';
import {
	StyledCard,
	StyledCardContent,
	Introduction,
	ButtonContainer,
	StyledButton,
} from './ProfessionStyles';
import { useState } from 'react';
import { fetchInfluenceIndex } from 'api/celebrityApi';

const Profession = () => {
	const [contentName] = useAtom(contentNameAtom);
	const containerRef = useRef(null);
	const navigate = useNavigate();
	const { profession } = useParams();
	const professionData = useProfessionData(profession, contentName);

	const handleContentClick = useCallback(
		(personName, content) => {
			navigate(`/${profession}/${formatNameForUrl(personName)}/${content}`);
		},
		[profession, navigate]
	);

	const pageTitle = useMemo(() => {
		return profession === '전체' ? '유명인사' : profession;
	}, [profession]);

	const [testName, setTestName] = useState('test');
	const handleChange = (e) => {
		setTestName(e.target.value);
	};
	const api호출 = async () => {
		const asdf = await fetchInfluenceIndex(testName);
		console.log('asdf', asdf);
	};

	if (!professionData || professionData.length === 0) return null;

	return (
		<div ref={containerRef}>
			<br />
			<input type="text" value={testName} onChange={handleChange} />
			<button onClick={api호출}>
				<b>BUTTON</b>
			</button>
			<br />
			<br />
			{contentName === '전체' && (
				<Typography variant="h4" component="h1" gutterBottom>
					{pageTitle}
				</Typography>
			)}

			{contentName !== '전체' && (
				<Typography variant="h4" component="h1" gutterBottom>
					{pageTitle}들의 {contentName}
				</Typography>
			)}

			<Grid container spacing={3}>
				{professionData.map((person) => {
					const contentNames = person.recommended_content_names
						? person.recommended_content_names.split(',')
						: [];

					return (
						<Grid item xs={12} sm={6} md={4} lg={3} key={person.id}>
							<StyledCard>
								<StyledCardContent>
									<CelebImage
										imgLink={person.img_link}
										name={person.name}
										contentNames={contentNames}
										oncontentNameClick={(content) =>
											handleContentClick(person.name, content)
										}
									/>

									<Typography variant="h6" gutterBottom>
										{person.name} ({person.nationality})
									</Typography>

									<Introduction>
										<Typography variant="body2">{person.profession}</Typography>

										{!person.date_of_death && (
											<Typography variant="body2">
												{person.gender}, {calculateAge(person.birth_date)}세
											</Typography>
										)}

										{person.date_of_death && (
											<Typography variant="body2">
												{person.gender}, {person.birth_date} ~{' '}
												{person.date_of_death}
											</Typography>
										)}

										<Typography variant="body2">{person.biography}</Typography>
									</Introduction>

									<ButtonContainer>
										{contentNames
											.filter(
												(content) =>
													contentName === '전체' || content === contentName
											)
											.map((content) => (
												<StyledButton
													key={`${person.name}-${content}`}
													onClick={() =>
														handleContentClick(person.name, content)
													}>
													{content}
												</StyledButton>
											))}
									</ButtonContainer>
								</StyledCardContent>
							</StyledCard>
						</Grid>
					);
				})}
			</Grid>
		</div>
	);
};

export default Profession;
