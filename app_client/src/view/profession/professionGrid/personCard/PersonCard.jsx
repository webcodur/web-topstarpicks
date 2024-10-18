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
	BiographyContainer,
} from '../../ProfessionStyles';

// 전기 텍스트의 최대 길이를 정의합니다.
const MAX_BIOGRAPHY_LENGTH = 60;
const NO_DATA = '';

// PersonCard 컴포넌트: 개인 정보를 카드 형태로 표시합니다.
const PersonCard = ({ person, contentName, onModalOpen }) => {
	// 전기 모달의 열림/닫힘 상태를 관리합니다.
	const [isBiographyModalOpen, setIsBiographyModalOpen] = useState(false);
	// 전기 텍스트의 확장/축소 상태를 관리합니다.
	const [isExpanded, setIsExpanded] = useState(false);

	// 추천 컨텐츠 이름을 배열로 변환합니다.
	const contentNames = person.recommended_content_names
		? person.recommended_content_names.split(',')
		: [];

	// 컨텐츠 링크를 생성하는 함수입니다.
	const getContentLink = (personName, content) =>
		`/${person.profession}/${formatNameForUrl(personName)}/${content}`;

	// '더 보기' 버튼 클릭 핸들러입니다.
	const handleReadMoreClick = () => {
		if (person.biography && person.biography.length > MAX_BIOGRAPHY_LENGTH) {
			setIsBiographyModalOpen(true);
		} else {
			setIsExpanded(!isExpanded);
		}
	};

	// 전기 모달을 닫는 핸들러입니다.
	const handleCloseModal = () => {
		setIsBiographyModalOpen(false);
	};

	// 전기 텍스트를 최대 길이로 자릅니다.
	const truncatedBiography =
		person.biography && person.biography.length > MAX_BIOGRAPHY_LENGTH
			? `${person.biography.slice(0, MAX_BIOGRAPHY_LENGTH)}...`
			: person.biography;

	return (
		<StyledCard>
			<StyledCardContent>
				{/* CelebImage 컴포넌트: 인물 이미지와 관련 정보를 표시합니다. */}
				<CelebImage
					imgLink={person.img_link}
					name={person.name}
					rank={person.rank}
					contentNames={contentNames}
					oncontentNameClick={(content) => (
						<Link to={getContentLink(person.name, content)}>{content}</Link>
					)}
				/>

				<PersonName>{person.name || NO_DATA}</PersonName>

				<Introduction>
					{/* 국적 */}
					<PersonInfo>
						<Public fontSize="small" />
						{person.nationality || NO_DATA}
					</PersonInfo>

					{/* 성별과 직업 정보 */}
					<PersonInfo>
						<Person fontSize="small" />
						{person.gender || NO_DATA} {person.profession || NO_DATA}
					</PersonInfo>

					{/* 영향력 점수*/}
					<PersonInfo>
						<Score fontSize="small" />
						영향력: {person.total_score || NO_DATA}
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

					{/* LifespanDisplay 컴포넌트: 생년월일과 사망일을 표시합니다. */}
					<LifespanDisplay
						BIRTH={person.birth_date}
						DEATH={person.date_of_death}
					/>

					{/* 전기 정보*/}
					<PersonInfo component="div">
						<Description fontSize="small" />
						<BiographyContainer>
							<BiographyText component="span">
								{isExpanded ? person.biography : truncatedBiography || NO_DATA}
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

				{/* 컨텐츠 버튼을 표시합니다. */}
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

			{/* BiographyModal 컴포넌트: 전체 전기를 모달로 표시합니다. */}
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
