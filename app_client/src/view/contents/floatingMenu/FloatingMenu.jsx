import React from 'react';
import { Fab, Drawer, List, ListItem, ListItemText } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { FloatingMenuButton } from './floatingMenuStyle';

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

		<Drawer anchor="right" open={isOpen} onClose={onToggle}>
			<List>
				{recommendations.map((recommendation, index) => (
					<ListItem
						key={index}
						onClick={() => {
							onItemClick(index);
							onToggle();
						}}>
						<ListItemText primary={`${index + 1}. ${recommendation.title}`} />
					</ListItem>
				))}
			</List>
		</Drawer>
	</>
);

export default FloatingMenuComponent;
