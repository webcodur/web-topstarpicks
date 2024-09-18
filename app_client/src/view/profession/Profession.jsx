import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Grid, Typography } from '@mui/material';
import { formatNameForUrl } from 'utils/urlUtils';
import { calculateAge } from 'utils/date';
import { fetchCelebrities } from 'api/celebrityApi';
import {
	StyledCard,
	StyledCardContent,
	ImageContainer,
	StyledImage,
	Introduction,
	ButtonContainer,
	StyledButton,
} from './ProfessionStyles';

import { useAtom } from 'jotai';
import { contentTypeAtom } from 'store/atom';

const CelebImage = ({ imgLink, name }) => {
	if (imgLink) return <StyledImage src={imgLink} alt={name} />;
	return (
		<StyledImage
			src={`https://via.placeholder.com/150?text=${encodeURIComponent(name)}`}
			alt={name}
		/>
	);
};

const Profession = () => {
	const { profession } = useParams();
	const [contentType, setContentType] = useAtom(contentTypeAtom);
	const navigate = useNavigate();
	const [professionData, setProfessionData] = useState(null);

	useEffect(() => {
		const loadCelebrities = async () => {
			try {
				const data = await fetchCelebrities(profession);

				let filteredData;
				console.log('contentType', contentType);
				if (contentType !== '전체') {
					filteredData = data.filter((celeb) => {
						return (
							celeb.recommended_content_types &&
							celeb.recommended_content_types.includes(contentType)
						);
					});
					setProfessionData(filteredData);
				} else setProfessionData(data);
			} catch (error) {
				console.error('Failed to load celebrity data:', error);
			}
		};

		loadCelebrities();
	}, [profession, contentType]);

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
		<div>
			<Typography variant="h4" component="h1" gutterBottom>
				{pageTitle}
			</Typography>

			<Grid container spacing={3}>
				{professionData.map((person) => (
					<Grid item xs={12} sm={6} md={4} lg={3} key={person.id}>
						<StyledCard>
							<StyledCardContent>
								<ImageContainer>
									<CelebImage imgLink={person.img_link} name={person.name} />
								</ImageContainer>

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
									{person.recommended_content_types &&
										person.recommended_content_types
											.split(',')
											.filter(
												(content) =>
													contentType === '전체' || content === contentType
											) // 전체일 땐 모든 버튼, 그 외엔 선택한 contentType만
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
				))}
			</Grid>
		</div>
	);
};

export default Profession;
