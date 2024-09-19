import React from 'react';
import { Fab } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import {
	FloatingMenuButton,
	FloatingMenu,
	FloatingMenuItem,
} from './ContentsStyle';

const FloatingMenuComponent = ({
	isOpen,
	onToggle,
	recommendations,
	onItemClick,
}) => (
	<>
		<FloatingMenuButton>
			<Fab color="primary" aria-label="menu" onClick={onToggle}>
				<MenuIcon />
			</Fab>
		</FloatingMenuButton>

		{isOpen && (
			<FloatingMenu>
				{recommendations.map((recommendation, index) => (
					<FloatingMenuItem key={index} onClick={() => onItemClick(index)}>
						{index + 1}. {recommendation.title}
					</FloatingMenuItem>
				))}
			</FloatingMenu>
		)}
	</>
);

export default FloatingMenuComponent;
