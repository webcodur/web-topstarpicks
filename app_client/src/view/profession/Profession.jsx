import React, { useCallback, useRef, useMemo, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
	Grid,
	Typography,
	Modal,
	Box,
	FormControl,
	InputLabel,
	Select,
	MenuItem,
	Divider,
	TextField,
} from '@mui/material';
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
import {
	Public,
	Person,
	Score,
	Hexagon,
	ArrowUpward,
	ArrowDownward,
} from '@mui/icons-material';
import ScoreModal from './scoreModal/ScoreModal';

const rankOrder = { S: 5, A: 4, B: 3, C: 2, D: 1 };

const Profession = () => {
	const [contentName] = useAtom(contentNameAtom);
	const containerRef = useRef(null);
	const navigate = useNavigate();
	const { profession } = useParams();
	const professionData = useProfessionData(profession, contentName);
	const [modalOpen, setModalOpen] = useState(false);
	const [selectedPerson, setSelectedPerson] = useState(null);
	const [sortCriteria, setSortCriteria] = useState('');
	const [sortOrder, setSortOrder] = useState('asc');
	const [eraBoundaries, setEraBoundaries] = useState({
		ancient: 500,
		medieval: 1500,
		modern: 1900,
	});

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

	const handleSortChange = (event) => {
		setSortCriteria(event.target.value);
	};

	const handleSortOrderChange = () => {
		setSortOrder((prevOrder) => (prevOrder === 'asc' ? 'desc' : 'asc'));
	};

	const handleEraBoundaryChange = (era) => (event) => {
		setEraBoundaries((prev) => ({
			...prev,
			[era]: parseInt(event.target.value),
		}));
	};

	const pageTitle = useMemo(() => {
		return profession === '전체' ? '유명인사' : profession;
	}, [profession]);

	const getAgeCategory = (birthYear) => {
		if (!birthYear) return null;
		if (birthYear <= eraBoundaries.ancient) return 0; // 고대
		if (birthYear <= eraBoundaries.medieval) return 1; // 중세
		if (birthYear <= eraBoundaries.modern) return 2; // 근대
		return 3; // 현대
	};

	const sortedData = useMemo(() => {
		if (!Array.isArray(professionData)) return [];

		return [...professionData].sort((a, b) => {
			let comparison = 0;
			switch (sortCriteria) {
				case 'nationality':
					comparison = (a.nationality || '').localeCompare(b.nationality || '');
					break;
				case 'rank':
					comparison = (rankOrder[b.rank] || 0) - (rankOrder[a.rank] || 0);
					break;
				case 'age':
					const aYear = a.birth_date
						? new Date(a.birth_date).getFullYear()
						: 9999;
					const bYear = b.birth_date
						? new Date(b.birth_date).getFullYear()
						: 9999;
					const aCat = getAgeCategory(aYear);
					const bCat = getAgeCategory(bYear);
					if (aCat !== bCat) {
						comparison = (aCat ?? 4) - (bCat ?? 4); // 알 수 없는 경우 가장 뒤로
					} else {
						comparison = aYear - bYear;
					}
					break;
				default:
					return 0;
			}
			return sortOrder === 'asc' ? comparison : -comparison;
		});
	}, [professionData, sortCriteria, sortOrder, eraBoundaries]);

	const groupedData = useMemo(() => {
		if (!Array.isArray(sortedData) || sortedData.length === 0) return [];
		if (!sortCriteria) return [{ key: 'all', persons: sortedData }];

		let groups = [];
		let currentGroup = null;

		sortedData.forEach((person) => {
			if (!person) return; // Skip if person is undefined or null

			let groupKey;
			switch (sortCriteria) {
				case 'nationality':
					groupKey = person.nationality || '알 수 없음';
					break;
				case 'rank':
					groupKey = person.rank || '알 수 없음';
					break;
				case 'age':
					const birthYear = person.birth_date
						? new Date(person.birth_date).getFullYear()
						: null;
					groupKey = getAgeCategory(birthYear);
					break;
				default:
					groupKey = 'all';
			}

			if (groupKey !== currentGroup) {
				currentGroup = groupKey;
				groups.push({ key: groupKey, persons: [person] });
			} else if (groups.length > 0) {
				groups[groups.length - 1].persons.push(person);
			}
		});

		return groups;
	}, [sortedData, sortCriteria, eraBoundaries]);

	const getSortLabel = (criteria, value) => {
		switch (criteria) {
			case 'nationality':
				return `국적: ${value}`;
			case 'rank':
				return `랭크: ${value}`;
			case 'age':
				if (value === 0) return `시대: 고대 (~ ${eraBoundaries.ancient}년)`;
				if (value === 1)
					return `시대: 중세 (${eraBoundaries.ancient + 1}년 ~ ${
						eraBoundaries.medieval
					}년)`;
				if (value === 2)
					return `시대: 근대 (${eraBoundaries.medieval + 1}년 ~ ${
						eraBoundaries.modern
					}년)`;
				if (value === 3) return `시대: 현대 (${eraBoundaries.modern + 1}년 ~)`;
				return '시대: 알 수 없음';
			default:
				return '';
		}
	};

	if (!Array.isArray(professionData) || professionData.length === 0) {
		return <Typography>데이터를 불러오는 중입니다...</Typography>;
	}

	return (
		<div ref={containerRef}>
			<Typography
				variant="h4"
				component="h1"
				gutterBottom
				sx={{ mt: 4, mb: 4 }}>
				{contentName === '전체' ? pageTitle : `${pageTitle}들의 ${contentName}`}
			</Typography>

			<Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
				<FormControl sx={{ minWidth: 200, mr: 2 }}>
					<InputLabel id="sort-select-label">정렬 기준</InputLabel>
					<Select
						labelId="sort-select-label"
						id="sort-select"
						value={sortCriteria}
						label="정렬 기준"
						onChange={handleSortChange}>
						<MenuItem value="">
							<em>없음</em>
						</MenuItem>
						<MenuItem value="nationality">국적</MenuItem>
						<MenuItem value="rank">랭크</MenuItem>
						<MenuItem value="age">나이/시대</MenuItem>
					</Select>
				</FormControl>
				{sortCriteria && (
					<StyledButton onClick={handleSortOrderChange}>
						{sortOrder === 'asc' ? <ArrowUpward /> : <ArrowDownward />}
					</StyledButton>
				)}
			</Box>

			{sortCriteria === 'age' && (
				<Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 4 }}>
					<TextField
						label="고대/중세 경계"
						type="number"
						value={eraBoundaries.ancient}
						onChange={handleEraBoundaryChange('ancient')}
						sx={{ width: '30%' }}
					/>
					<TextField
						label="중세/근대 경계"
						type="number"
						value={eraBoundaries.medieval}
						onChange={handleEraBoundaryChange('medieval')}
						sx={{ width: '30%' }}
					/>
					<TextField
						label="근대/현대 경계"
						type="number"
						value={eraBoundaries.modern}
						onChange={handleEraBoundaryChange('modern')}
						sx={{ width: '30%' }}
					/>
				</Box>
			)}

			{groupedData.map((group, groupIndex) => (
				<React.Fragment key={group.key ?? groupIndex}>
					{groupIndex > 0 && sortCriteria && <Divider sx={{ my: 2 }} />}
					{sortCriteria && (
						<Typography variant="h6" sx={{ my: 2 }}>
							{getSortLabel(sortCriteria, group.key)}
						</Typography>
					)}
					<Grid container spacing={4}>
						{group.persons.map((person) => {
							if (!person) return null; // Skip if person is undefined or null

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

											<PersonName>{person.name || '이름 없음'}</PersonName>

											<Introduction>
												<PersonInfo>
													<Public fontSize="small" />
													{person.nationality || '알 수 없음'}
												</PersonInfo>
												<PersonInfo>
													<Person fontSize="small" />
													{person.gender || '알 수 없음'}{' '}
													{person.profession || '알 수 없음'}
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
														onClick={() => handleModalOpen(person)}
													/>
												</PersonInfo>

												<LifespanDisplay
													birthDate={person.birth_date}
													dateOfDeath={person.date_of_death}
												/>
												<BiographyText>
													{person.biography || '정보가 없습니다.'}
												</BiographyText>
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
				</React.Fragment>
			))}

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
