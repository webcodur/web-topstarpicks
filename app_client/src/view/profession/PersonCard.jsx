import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
	Public,
	Person,
	Score,
	Hexagon,
	Description,
} from '@mui/icons-material';
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
	PersonName,
	PersonInfo,
	BiographyText,
	ReadMoreButton,
} from './ProfessionStyles';

const MAX_BIOGRAPHY_LENGTH = 70; // 변경된 최대 글자 수

const PersonCard = ({ person, contentName, onModalOpen }) => {
	const [isBiographyModalOpen, setIsBiographyModalOpen] = useState(false);
	const [isExpanded, setIsExpanded] = useState(false);

	const contentNames = person.recommended_content_names
		? person.recommended_content_names.split(',')
		: [];

	const getContentLink = (personName, content) =>
		`/${person.profession}/${formatNameForUrl(personName)}/${content}`;

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
					name={person.name}
					rank={person.rank}
					contentNames={contentNames}
					oncontentNameClick={(content) => (
						<Link to={getContentLink(person.name, content)}>{content}</Link>
					)}
				/>

				<PersonName>{person.name || '이름 없음'}</PersonName>

				<Introduction>
					<PersonInfo>
						<Public fontSize="small" />
						{person.nationality || '알 수 없음'}
					</PersonInfo>

					<PersonInfo>
						<Person fontSize="small" />
						{person.gender || '알 수 없음'} {person.profession || '알 수 없음'}
					</PersonInfo>

					<PersonInfo>
						<Score fontSize="small" />
						영향력: {person.total_score || '알 수 없음'}
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
						birthDate={person.birth_date}
						dateOfDeath={person.date_of_death}
					/>

					<PersonInfo
						style={{
							display: 'inline-flex',
							alignItems: 'flex-start',
							flexWrap: 'wrap',
						}}>
						<Description
							fontSize="small"
							style={{ marginRight: '8px', marginTop: '4px' }}
						/>
						<BiographyText style={{ flex: '1 1 auto' }}>
							{isExpanded
								? person.biography
								: truncatedBiography || '정보가 없습니다.'}
							{person.biography &&
								person.biography.length > MAX_BIOGRAPHY_LENGTH &&
								!isExpanded && (
									<ReadMoreButton
										onClick={handleReadMoreClick}
										style={{
											marginLeft: '4px',
											padding: '0',
											minWidth: 'auto',
										}}>
										더 보기
									</ReadMoreButton>
								)}
						</BiographyText>
						{isExpanded && (
							<ReadMoreButton
								onClick={handleReadMoreClick}
								style={{ marginLeft: '4px', padding: '0', minWidth: 'auto' }}>
								접기
							</ReadMoreButton>
						)}
					</PersonInfo>
				</Introduction>

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
