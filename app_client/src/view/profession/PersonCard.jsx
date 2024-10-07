// PersonCard.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Public, Person, Score, Hexagon } from '@mui/icons-material';
import { formatNameForUrl } from 'utils/urlUtils';
import CelebImage from './celebImage/CelebImage';
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

const PersonCard = ({ person, contentName, onModalOpen }) => {
	const navigate = useNavigate();

	const handleContentClick = (personName, content) => {
		navigate(
			`/${person.profession}/${formatNameForUrl(personName)}/${content}`
		);
	};

	const contentNames = person.recommended_content_names
		? person.recommended_content_names.split(',')
		: [];

	return (
		<StyledCard>
			<StyledCardContent>
				{/* 초상화 */}
				<CelebImage
					imgLink={person.img_link}
					name={person.name}
					rank={person.rank}
					contentNames={contentNames}
					oncontentNameClick={(content) =>
						handleContentClick(person.name, content)
					}
				/>

				{/* 이름 */}
				<PersonName>{person.name || '이름 없음'}</PersonName>

				<Introduction>
					{/* 국적 */}
					<PersonInfo>
						<Public fontSize="small" />
						{person.nationality || '알 수 없음'}
					</PersonInfo>

					{/* 성별 / 직군 */}
					<PersonInfo>
						<Person fontSize="small" />
						{person.gender || '알 수 없음'} {person.profession || '알 수 없음'}
					</PersonInfo>

					{/* 영향력 점수 */}
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

					{/* 생애 및 나이 */}
					<LifespanDisplay
						birthDate={person.birth_date}
						dateOfDeath={person.date_of_death}
					/>

					{/* 약력 */}
					<BiographyText>
						{person.biography || '정보가 없습니다.'}
					</BiographyText>
				</Introduction>

				{/* 선택 가능 컨텐츠 종류 */}
				<ButtonContainer style={{ marginTop: '16px' }}>
					{contentNames
						.filter(
							(content) => contentName === '전체' || content === contentName
						)
						.map((content) => (
							<StyledButton
								key={`${person.name}-${content}`}
								onClick={() => handleContentClick(person.name, content)}>
								{content}
							</StyledButton>
						))}
				</ButtonContainer>
			</StyledCardContent>
		</StyledCard>
	);
};

export default PersonCard;
