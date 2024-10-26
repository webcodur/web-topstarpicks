import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Score, Hexagon, Description } from '@mui/icons-material';
import { Chip } from '@mui/material';
import { formatNameForUrl } from 'utils/urlUtils';
import CelebImage from './celebImage/CelebImage';
import LifespanDisplay from './LifespanDisplay';
import BiographyModal from './BiographyModal';
import {
	StyledCard,
	StyledCardContent,
	Introduction,
	ButtonContainer,
	StyledButton,
	PersonPreName,
	PersonName,
	PersonInfo,
	BiographyText,
	ReadMoreButton,
	BiographyContainer,
	TagContainer,
} from './personCard.style';

import { useAtom } from 'jotai';
import { menuInfoAtom } from 'store/atom';

const MAX_BIOGRAPHY_LENGTH = 40;
const NO_DATA = '';

const PersonCard = ({ person, contentName, onModalOpen }) => {
	const [isBiographyModalOpen, setIsBiographyModalOpen] = useState(false);
	const [isExpanded, setIsExpanded] = useState(false);
	const [menuInfo] = useAtom(menuInfoAtom);

	const contentNames = person.recommended_content_names
		? person.recommended_content_names.split(',')
		: [];

	const getContentLink = (personName, content) =>
		`/${formatNameForUrl(personName)}/${content}`;

	const handleReadMoreClick = () => {
		if (person.biography && person.biography.length > MAX_BIOGRAPHY_LENGTH) {
			setIsBiographyModalOpen(true);
		} else {
			setIsExpanded(!isExpanded);
		}
	};

	const handleCloseModal = () => {
		setIsBiographyModalOpen(false);
	};

	const truncatedBiography =
		person.biography && person.biography.length > MAX_BIOGRAPHY_LENGTH
			? `${person.biography.slice(0, MAX_BIOGRAPHY_LENGTH)}...`
			: person.biography;

	return (
		<StyledCard>
			<StyledCardContent>
				<CelebImage
					imgLink={person.img_link}
					vidLink={person.vid_link}
					name={person.name}
					rank={person.rank}
				/>

				<PersonPreName>
					{person.prename}
					{person.prename && <br />}
				</PersonPreName>

				<PersonName>
					{person.name} {person.postname}
				</PersonName>

				<Introduction>
					<PersonInfo>
						<Score fontSize="small" />
						{person.total_score || NO_DATA}점
						<Hexagon
							fontSize="small"
							sx={{
								color: 'orange',
								marginLeft: '8px',
								cursor: 'pointer',
							}}
							onClick={() => onModalOpen(person)}
						/>
					</PersonInfo>

					<LifespanDisplay
						BIRTH={person.birth_date}
						DEATH={person.death_date}
					/>

					<PersonInfo component="div">
						<Description fontSize="small" />
						<BiographyContainer>
							<BiographyText component="span">
								{isExpanded ? person.biography : truncatedBiography}
								{person.biography &&
									person.biography.length > MAX_BIOGRAPHY_LENGTH && (
										<ReadMoreButton
											onClick={handleReadMoreClick}
											variant="span">
											더 보기
										</ReadMoreButton>
									)}
							</BiographyText>
						</BiographyContainer>
					</PersonInfo>
				</Introduction>

				{/* 태그 컨테이너 추가 */}
				<TagContainer>
					<Chip
						label={person.profession}
						size="small"
						sx={{
							backgroundColor: 'rgba(156, 39, 176, 0.1)',
							color: '#9c27b0',
							border: '1px solid wheat',
							fontSize: '1rem',
							// height: '24px',
							marginLeft: '20px',
							'& .MuiChip-label': {
								padding: '0 8px',
							},
						}}
					/>
					{person.is_historical === 1 && menuInfo === '인물도감' && (
						<Chip
							label="역사"
							size="small"
							sx={{
								backgroundColor: 'rgba(33, 150, 243, 0.1)',
								color: '#2196f3',
								border: '1px solid wheat',
								fontSize: '1rem',
								// height: '24px',
							}}
						/>
					)}
					{person.is_fictional === 1 && menuInfo === '인물도감' && (
						<Chip
							label="신화"
							size="small"
							sx={{
								backgroundColor: 'lightyellow',
								color: 'hotpink',
								border: '1px solid wheat',
								fontSize: '1rem',
								// height: '24px',
								'& .MuiChip-label': {
									padding: '0 8px',
								},
							}}
						/>
					)}
				</TagContainer>

				{menuInfo === '추천정보' && (
					<ButtonContainer style={{ marginTop: '16px' }}>
						{contentNames
							.filter(
								(content) => contentName === '전체' || content === contentName
							)
							.map((content) => (
								<Link
									key={`${person.name}-${content}`}
									to={getContentLink(person.name, content)}
									style={{ textDecoration: 'none' }}>
									<StyledButton>{content}</StyledButton>
								</Link>
							))}
					</ButtonContainer>
				)}
			</StyledCardContent>

			<BiographyModal
				isOpen={isBiographyModalOpen}
				onClose={handleCloseModal}
				biography={person.biography}
				name={person.name}
			/>
		</StyledCard>
	);
};

export default PersonCard;
