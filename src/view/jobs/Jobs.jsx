import React, { useMemo, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { celebData } from 'store/content/celebData';
import { Grid, Typography } from '@mui/material';
import { formatNameForUrl } from 'utils/urlUtils';
import { jobsMap } from 'store/content/jobs';
import {
	StyledCard,
	StyledCardContent,
	ImageContainer,
	StyledImage,
	Introduction,
	ButtonContainer,
	StyledButton,
} from './JobsStyles';

// 이미지 컴포넌트 분리
const CelebImage = ({ imgSrc, imgWebSrc, name }) => {
	if (imgWebSrc) {
		return <StyledImage src={imgWebSrc} alt={name} />;
	}
	return (
		<StyledImage
			src={`https://via.placeholder.com/150?text=${encodeURIComponent(name)}`}
			alt={name}
		/>
	);
};

const Jobs = () => {
	const { jobs } = useParams();
	const navigate = useNavigate();

	const filteredData = useMemo(() => {
		if (jobs === 'all') return celebData;
		return celebData.filter((person) => person.jobType === jobsMap[jobs]);
	}, [jobs]);

	const handleContentClick = useCallback(
		(personName, content) => {
			navigate(`/${jobs}/${formatNameForUrl(personName)}/${content}`);
		},
		[jobs, navigate]
	);

	const pageTitle = useMemo(() => {
		return jobs === '전체'
			? '전체 카테고리'
			: `${jobs.charAt(0).toUpperCase() + jobs.slice(1)} 셀럽들`;
	}, [jobs]);

	return (
		<div>
			<Typography variant="h4" component="h1" gutterBottom>
				{pageTitle}
			</Typography>

			{/* 셀럽 그리드 */}
			<Grid container spacing={3}>
				{filteredData.map((person) => (
					<Grid item xs={12} sm={6} md={4} lg={3} key={person.name}>
						<StyledCard>
							<StyledCardContent>
								{/* 이미지 컨테이너 */}
								<ImageContainer>
									<CelebImage
										imgSrc={person.imgSrc}
										imgWebSrc={person.imgWebSrc}
										name={person.name}
									/>
								</ImageContainer>

								<Typography variant="h6" gutterBottom>
									{person.name} ({person.nationality})
								</Typography>
								<Introduction>
									<Typography variant="body2">{person.introduction}</Typography>
								</Introduction>
								<ButtonContainer>
									{person.contentType.map((content) => (
										<StyledButton
											key={`${person.name}-${content}`}
											onClick={() => handleContentClick(person.name, content)}>
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

export default Jobs;
