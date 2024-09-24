import React, { useCallback, useRef, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Grid, Typography } from '@mui/material';
import { formatNameForUrl } from 'utils/urlUtils';
import { calculateAge } from 'utils/date';
import { useAtom } from 'jotai';
import { contentTypeAtom } from 'store/atom';
import CelebImage from './CelebImage';
import useProfessionData from './useProfessionData';
import {
	StyledCard,
	StyledCardContent,
	Introduction,
	ButtonContainer,
	StyledButton,
} from './ProfessionStyles';

const Profession = () => {
	const { profession } = useParams();
	const [contentType] = useAtom(contentTypeAtom);
	const navigate = useNavigate();
	const containerRef = useRef(null);

	const professionData = useProfessionData(profession, contentType);

	const handleContentClick = useCallback(
		(personName, content) => {
			navigate(`/${profession}/${formatNameForUrl(personName)}/${content}`);
		},
		[profession, navigate]
	);

	const pageTitle = useMemo(() => {
		return profession === 'all'
			? '전체 셀럽'
			: `${profession.charAt(0).toUpperCase() + profession.slice(1)} 셀럽`;
	}, [profession]);

	if (!professionData || professionData.length === 0) return null;

	return (
		<div ref={containerRef}>
			<Typography variant="h4" component="h1" gutterBottom>
				{pageTitle}
			</Typography>

			<Grid container spacing={3}>
				{professionData.map((person) => {
					const contentTypes = person.recommended_content_types
						? person.recommended_content_types.split(',')
						: [];

					return (
						<Grid item xs={12} sm={6} md={4} lg={3} key={person.id}>
							<StyledCard>
								<StyledCardContent>
									<CelebImage
										imgLink={person.img_link}
										name={person.name}
										contentTypes={contentTypes}
										onContentTypeClick={(content) =>
											handleContentClick(person.name, content)
										}
									/>

									<Typography variant="h6" gutterBottom>
										{person.name} ({person.nationality})
									</Typography>

									<Introduction>
										<Typography variant="body2">{person.profession}</Typography>
										<Typography variant="body2">
											{person.gender}, {calculateAge(person.birth_date)}세
										</Typography>
										<Typography variant="body2">{person.biography}</Typography>
									</Introduction>

									<ButtonContainer>
										{contentTypes
											.filter(
												(content) =>
													contentType === '전체' || content === contentType
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
