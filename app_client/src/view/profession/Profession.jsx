import React, { useCallback, useRef, useMemo, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Grid, Typography, Modal, Box } from '@mui/material';
import { formatNameForUrl } from 'utils/urlUtils';
import { useAtom } from 'jotai';
import { contentNameAtom } from 'store/atom';
import CelebImage from './celebImage/CelebImage';
import useProfessionData from './useProfessionData';
import LifespanDisplay from './LifespanDisplay';
import {
	StyledCard,
	StyledCardContent,
	Introduction,
	ButtonContainer,
	StyledButton,
	PersonName,
	PersonInfo,
	BiographyText,
} from './ProfessionStyles';
import { Public, Person, Score, Hexagon } from '@mui/icons-material';
import ScoreModal from './scoreModal/ScoreModal';

const Profession = () => {
	const [contentName] = useAtom(contentNameAtom);
	const containerRef = useRef(null);
	const navigate = useNavigate();
	const { profession } = useParams();
	const professionData = useProfessionData(profession, contentName);
	const [modalOpen, setModalOpen] = useState(false);
	const [selectedPerson, setSelectedPerson] = useState(null);

	const handleContentClick = useCallback(
		(personName, content) => {
			navigate(`/${profession}/${formatNameForUrl(personName)}/${content}`);
		},
		[profession, navigate]
	);

	const handleModalOpen = (person) => {
		setSelectedPerson(person);
		setModalOpen(true);
	};

	const handleModalClose = () => {
		setModalOpen(false);
	};

	const pageTitle = useMemo(() => {
		return profession === '전체' ? '유명인사' : profession;
	}, [profession]);

	if (!professionData || professionData.length === 0) return null;

	return (
		<div ref={containerRef}>
			<Typography
				variant="h4"
				component="h1"
				gutterBottom
				sx={{ mt: 4, mb: 4 }}>
				{contentName === '전체' ? pageTitle : `${pageTitle}들의 ${contentName}`}
			</Typography>

			<Grid container spacing={4}>
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
										rank={person.rank}
										contentNames={contentNames}
										oncontentNameClick={(content) =>
											handleContentClick(person.name, content)
										}
									/>

									<PersonName>{person.name}</PersonName>

									<Introduction>
										<PersonInfo>
											<Public fontSize="small" />
											{person.nationality}
										</PersonInfo>
										<PersonInfo>
											<Person fontSize="small" />
											{person.profession}, {person.gender}
										</PersonInfo>
										<PersonInfo>
											<Score fontSize="small" />
											총점: {person.total_score}
											<Hexagon
												fontSize="small"
												sx={{
													color: 'orange',
													marginLeft: '8px',
													cursor: 'pointer',
												}}
												onClick={() => handleModalOpen(person)}
											/>
										</PersonInfo>

										<LifespanDisplay
											birthDate={person.birth_date}
											dateOfDeath={person.date_of_death}
										/>
										<BiographyText>{person.biography}</BiographyText>
									</Introduction>

									<ButtonContainer style={{ marginTop: '16px' }}>
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

			<Modal
				open={modalOpen}
				onClose={handleModalClose}
				aria-labelledby="score-modal-title"
				aria-describedby="score-modal-description">
				<Box
					sx={{
						position: 'absolute',
						top: '50%',
						left: '50%',
						transform: 'translate(-50%, -50%)',
						bgcolor: 'background.paper',
						border: '2px solid #000',
						boxShadow: 24,
						p: 4,
					}}>
					{selectedPerson && (
						<ScoreModal person={selectedPerson} onClose={handleModalClose} />
					)}
				</Box>
			</Modal>
		</div>
	);
};

export default Profession;
