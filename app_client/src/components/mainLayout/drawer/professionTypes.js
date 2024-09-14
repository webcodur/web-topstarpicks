import AllInclusiveIcon from '@mui/icons-material/AllInclusive';
import BusinessIcon from '@mui/icons-material/Business';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import SchoolIcon from '@mui/icons-material/School';
import TheatersIcon from '@mui/icons-material/Theaters';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import PaletteIcon from '@mui/icons-material/Palette';
import SportsBasketballIcon from '@mui/icons-material/SportsBasketball';
import PersonAddIcon from '@mui/icons-material/PersonAdd';

const professionTypes = [
	{
		key: 'all',
		text: 'all',
		icon: <AllInclusiveIcon />,
		to: 'all',
	},
	{
		key: 'entrepreneur',
		text: 'entrepreneur',
		icon: <BusinessIcon />,
		to: 'entrepreneur',
	},
	{
		key: 'investor',
		text: 'investor',
		icon: <AccountBalanceWalletIcon />,
		to: 'investor',
	},
	{
		key: 'politician',
		text: 'politician',
		icon: <AccountBalanceIcon />,
		to: 'politician',
	},
	{ key: 'scholar', text: 'scholar', icon: <SchoolIcon />, to: 'scholar' },
	{ key: 'actor', text: 'actor', icon: <TheatersIcon />, to: 'actor' },
	{ key: 'writer', text: 'writer', icon: <MenuBookIcon />, to: 'writer' },
	{ key: 'artist', text: 'artist', icon: <PaletteIcon />, to: 'artist' },
	{
		key: 'athlete',
		text: 'athlete',
		icon: <SportsBasketballIcon />,
		to: 'athlete',
	},
	{
		key: 'influencer',
		text: 'influencer',
		icon: <PersonAddIcon />,
		to: 'influencer',
	},
];

export default professionTypes;
