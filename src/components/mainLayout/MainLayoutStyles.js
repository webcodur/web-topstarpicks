import styled from '@emotion/styled';

export const colors = {
	primary: '#3f51b5',
	secondary: '#f50057',
	background: '#f8f9fa',
	text: '#333',
	hover: '#e8eaf6',
};

const DRAWER_WIDTH = 300;
const MOBILE_BREAKPOINT = '768px';

export const StyledContainer = styled.div`
	display: flex;
	flex-direction: column;
	min-height: 100vh;
	width: 100%;
	background-color: ${colors.background};
	color: ${colors.text};
`;

export const Navbar = styled.nav`
	width: 100%;
	background-color: ${colors.primary};
	color: white;
	display: flex;
	align-items: center;
	padding: 0 24px;
	z-index: 1100;
`;

export const ContentWrapper = styled.div`
	flex: 1;
	display: flex;
	position: relative;
	overflow: hidden;
`;

export const MainContent = styled.main`
	flex: 1;
	overflow-y: auto;
	transition: margin-left 0.3s ease-in-out, width 0.3s ease-in-out;
	width: 100%;

	@media (min-width: ${MOBILE_BREAKPOINT}) {
		width: ${(props) =>
			props.sidebarOpen ? `calc(100% - ${DRAWER_WIDTH}px)` : '100%'};
		margin-left: ${(props) => (props.sidebarOpen ? `${DRAWER_WIDTH}px` : '0')};
	}
`;

export const StyledDrawer = styled.div`
	position: absolute;
	top: 0;
	left: 0;
	bottom: 0;
	width: ${DRAWER_WIDTH}px;
	background-color: white;
	z-index: 1200;
	box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1);
	overflow-y: auto;
	transition: transform 0.3s ease-in-out;
	transform: translateX(
		${(props) => (props.isOpen ? '0' : `-${DRAWER_WIDTH}px`)}
	);

	@media (min-width: ${MOBILE_BREAKPOINT}) {
		position: absolute;
		transform: none;
		left: ${(props) => (props.isOpen ? '0' : `-${DRAWER_WIDTH}px`)};
	}
`;

export const MenuItemButton = styled.button`
	width: 100%;
	padding: 12px 16px;
	display: flex;
	align-items: center;
	text-align: left;
	background: none;
	border: none;
	cursor: pointer;
	transition: background-color 0.2s ease;
	color: ${colors.text};
	text-decoration: none;

	&:hover {
		background-color: ${colors.hover};
	}

	.MuiListItemIcon-root {
		min-width: 40px;
		color: ${colors.primary};
	}

	.menu-text {
		margin-left: 16px;
	}
`;

export const styles = {
	container: StyledContainer,
	navbar: Navbar,
	contentWrapper: ContentWrapper,
	mainContent: MainContent,
	drawer: StyledDrawer,
	menuItemButton: MenuItemButton,
};
