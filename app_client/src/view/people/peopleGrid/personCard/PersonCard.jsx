import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Award, Hexagon, FileText } from 'lucide-react';
import { Button } from 'components/ui/button';
import { formatNameForUrl } from 'utils/urlUtils';
import CelebImage from './celebImage/CelebImage';
import LifespanDisplay from './LifespanDisplay';
import BiographyModal from './BiographyModal';
import TagContainer from './tagContainer/TagContainer';

import { useAtom } from 'jotai';
import { menuInfoAtom, darkModeAtom } from 'store/atom';

const MAX_BIOGRAPHY_LENGTH = 40;
const NO_DATA = '';

const PersonCard = ({ person, contentName, onModalOpen }) => {
	const [isBiographyModalOpen, setIsBiographyModalOpen] = useState(false);
	const [isExpanded, setIsExpanded] = useState(false);
	const [menuInfo] = useAtom(menuInfoAtom);
	const [darkMode] = useAtom(darkModeAtom);

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
		<div className={`
			h-full flex flex-col rounded-2xl overflow-hidden 
			shadow-lg transition-all duration-100 ease-in-out 
			hover:-translate-y-0.5 hover:shadow-xl hover:shadow-gray-500/50
			${darkMode ? 'bg-gray-800' : 'bg-white'}
		`}>
			<div className="p-4">
				<CelebImage
					imgLink={person.img_link}
					vidLink={person.vid_link}
					name={person.name}
					rank={person.rank}
				/>

				<div className={`text-center text-lg mt-4 font-serif ${
					darkMode ? 'text-gray-200' : 'text-gray-800'
				}`}>
					{person.prename}
					{person.prename && <br />}
				</div>

				<div className={`text-center text-xl font-extrabold mb-2 font-serif ${
					darkMode ? 'text-gray-100' : 'text-gray-900'
				}`}>
					{person.name} {person.postname}
				</div>

				<div className={`mb-4 flex-grow ${
					darkMode ? 'text-gray-300' : 'text-gray-800'
				}`}>
					<div className="mb-1 flex items-center">
						<Award className="w-4 h-4 mr-2.5" />
						{person.total_score || NO_DATA}점
						<Hexagon
							className="w-4 h-4 ml-2 text-orange-500 cursor-pointer"
							onClick={() => onModalOpen(person)}
						/>
					</div>

					<LifespanDisplay
						BIRTH={person.birth_date}
						DEATH={person.death_date}
					/>

					<div className="mb-1 flex">
						<FileText className="w-4 h-4 mr-2.5 mt-0.5 flex-shrink-0" />
						<div className="relative">
							<span className="text-sm leading-relaxed max-h-[7.2em] overflow-hidden block">
								{isExpanded ? person.biography : truncatedBiography}
								{person.biography &&
									person.biography.length > MAX_BIOGRAPHY_LENGTH && (
										<button
											onClick={handleReadMoreClick}
											className="p-0 ml-1 text-sm text-blue-500 hover:underline bg-transparent border-none cursor-pointer inline">
											더 보기
										</button>
									)}
							</span>
						</div>
					</div>
				</div>

				<TagContainer
					profession={person.profession}
					isHistorical={person.is_real}
					isLegend={person.is_legend}
					menuInfo={menuInfo}
				/>

				{menuInfo === '추천정보' && (
					<div className="flex gap-2 flex-wrap mt-4">
						{contentNames
							.filter(
								(content) => contentName === '전체' || content === contentName
							)
							.map((content) => (
								<Link
									key={`${person.name}-${content}`}
									to={getContentLink(person.name, content)}
									className="no-underline">
									<Button 
										variant="ghost" 
										className={`
											rounded-lg h-14 transition-all duration-100 
											hover:bg-blue-100 hover:text-white dark:hover:bg-blue-600
											${darkMode ? 'bg-gray-700 text-gray-200 hover:bg-blue-600' : 'bg-gray-100 text-gray-800 hover:bg-blue-500'}
										`}>
										{content}
									</Button>
								</Link>
							))}
					</div>
				)}
			</div>

			<BiographyModal
				isOpen={isBiographyModalOpen}
				onClose={handleCloseModal}
				biography={person.biography}
				name={person.name}
			/>
		</div>
	);
};

export default PersonCard;
