import React from 'react';
import { useParams } from 'react-router-dom';
import { Typography, Container, Box } from '@mui/material';

import { recommendationData } from 'store/content/recommendationData';
import { parseNameFromUrl } from 'utils/urlUtils';
import {
	StyledCard,
	StyledCardContent,
	StyledTitle,
	QuoteContainer,
	QuoteText,
	QuoteIconStart,
	QuoteIconEnd,
	StyledImage,
	StyledBookImage,
	ImageContainer,
} from './ContentsStyle';
import { Link } from 'react-router-dom';

const ContentPage = () => {
	const { personName, contentType } = useParams();

	const person = recommendationData[parseNameFromUrl(personName)];
	const typeData = person?.[contentType];

	if (!person) return <Typography>Person not found</Typography>;

	const CelebImage = ({ imgWebSrc, name }) => {
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

	return (
		<Container maxWidth="md" sx={{ mt: 4 }}>
			<Box
				sx={{
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
					mb: 4,
					marginBottom: '100px',
				}}>
				<ImageContainer>
					<CelebImage imgWebSrc={person.imgWebSrc} name={person.name} />
				</ImageContainer>
				<Typography variant="h4" gutterBottom align="center">
					{personName}'s {contentType}
				</Typography>
			</Box>

			{typeData.title.map((title, index) => (
				<StyledCard key={index} sx={{ mb: 3 }}>
					<StyledCardContent>
						<StyledTitle variant="h5" align="center">
							NO {index + 1}: &nbsp; {title}
						</StyledTitle>

						<ImageContainer>
							<StyledBookImage
								src={typeData.contentImgSrc[index]}
								alt={typeData.contentImgSrc[index]}
							/>
						</ImageContainer>

						<QuoteContainer>
							<QuoteIconStart />
							<QuoteText variant="body1">{typeData.feelings[index]}</QuoteText>
							<QuoteIconEnd />
						</QuoteContainer>

						<Typography variant="body1" paragraph>
							{typeData.introduction[index]}
						</Typography>

						{/* yes24 링크 */}
						<Link style={{ color: 'red' }}>yes24</Link>
					</StyledCardContent>
				</StyledCard>
			))}
		</Container>
	);
};

export default ContentPage;
