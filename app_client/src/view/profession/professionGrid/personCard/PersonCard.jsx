import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Score, Hexagon, Description } from '@mui/icons-material';
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
} from './ProfessionStyles';

// 전기 텍스트의 최대 길이를 정의
const MAX_BIOGRAPHY_LENGTH = 60;
const NO_DATA = '';

// PersonCard 컴포넌트: 개인 정보를 카드 형태로 표시
const PersonCard = ({ person, contentName, onModalOpen }) => {
	// 전기 모달의 열림/닫힘 상태
	const [isBiographyModalOpen, setIsBiographyModalOpen] = useState(false);
	// 전기 텍스트 확장/축소 상태
	const [isExpanded, setIsExpanded] = useState(false);

	// 추천 컨텐츠 이름을 배열로 변환
	const contentNames = person.recommended_content_names
		? person.recommended_content_names.split(',')
		: [];

	// 컨텐츠 링크를 생성하는 함수
	const getContentLink = (personName, content) =>
		`/${person.profession}/${formatNameForUrl(personName)}/${content}`;

	// '더 보기' 버튼 클릭 핸들러
	const handleReadMoreClick = () => {
		if (person.biography && person.biography.length > MAX_BIOGRAPHY_LENGTH) {
			setIsBiographyModalOpen(true);
		} else {
			setIsExpanded(!isExpanded);
		}
	};

	// 전기 모달을 닫는 핸들러
	const handleCloseModal = () => {
		setIsBiographyModalOpen(false);
	};

	// 전기 텍스트를 최대 길이로 절단
	const truncatedBiography =
		person.biography && person.biography.length > MAX_BIOGRAPHY_LENGTH
			? `${person.biography.slice(0, MAX_BIOGRAPHY_LENGTH)}...`
			: person.biography;

	// 개인 인물 카드
	return (
		<StyledCard>
			<StyledCardContent>
				{/* CelebImage 컴포넌트: 인물 이미지와 관련 정보를 표시합니다. */}
				<CelebImage
					imgLink={person.img_link}
					vidLink={person.vid_link}
					name={person.name}
					rank={person.rank}
					getContentLink={getContentLink}
					person={person}
					contentNames={contentNames}
					oncontentNameClick={(content) => (
						<Link to={getContentLink(person.name, content)}>{content}</Link>
					)}
				/>

				{/* 이름 */}
				<PersonPreName>
					{person.prename}
					{person.prename && <br />}
				</PersonPreName>

				<PersonName>
					{person.name} {person.postname}
				</PersonName>

				<Introduction>
					{/* 영향력 */}
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

					{/* 생년월일 - 사망일 */}
					<LifespanDisplay
						BIRTH={person.birth_date}
						DEATH={person.death_date}
					/>

					{/* 전기 정보 */}
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

				{/* 컨텐츠 버튼 */}
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
