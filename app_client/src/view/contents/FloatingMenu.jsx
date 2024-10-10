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
				<div className="floating-menu-content">
					{recommendations.map((recommendation, index) => (
						<FloatingMenuItem key={index} onClick={() => onItemClick(index)}>
							{index + 1}. {recommendation.title}
						</FloatingMenuItem>
					))}
				</div>
			</FloatingMenu>
		)}
	</>
);

export default FloatingMenuComponent;
