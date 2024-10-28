import React from 'react';
import { Chip } from '@mui/material';
import { TagContainerWrapper } from './tagContainer.style';

const TagContainer = ({ profession, isHistorical, isFictional, menuInfo }) => {
	return (
		<TagContainerWrapper>
			<Chip
				label={profession}
				size="small"
				sx={{
					backgroundColor: 'rgba(156, 39, 176, 0.1)',
					color: '#9c27b0',
					border: '1px solid wheat',
					fontSize: '1rem',
					marginLeft: '20px',
					'& .MuiChip-label': {
						padding: '0 8px',
					},
				}}
			/>
			{isHistorical === 1 && menuInfo === '인물도감' && (
				<Chip
					label="실존인물"
					size="small"
					sx={{
						backgroundColor: 'rgba(33, 150, 243, 0.1)',
						color: '#2196f3',
						border: '1px solid wheat',
						fontSize: '1rem',
					}}
				/>
			)}
			{isFictional === 1 && menuInfo === '인물도감' && (
				<Chip
					label="신화인물"
					size="small"
					sx={{
						backgroundColor: 'lightyellow',
						color: 'hotpink',
						border: '1px solid wheat',
						fontSize: '1rem',
						'& .MuiChip-label': {
							padding: '0 8px',
						},
					}}
				/>
			)}
		</TagContainerWrapper>
	);
};

export default TagContainer;
