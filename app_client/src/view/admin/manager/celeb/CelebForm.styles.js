export const styles = {
	formContainer: {
		maxWidth: '800px',
		margin: '0 auto',
	},
	modeToggleContainer: {
		display: 'flex',
		justifyContent: 'center',
		mb: 3,
		maxWidth: '800px',
		margin: '0 auto',
	},
	toggleButtonGroup: {
		backgroundColor: '#fff',
		'& .MuiToggleButton-root': {
			px: 4,
			py: 1,
		},
	},
	searchResultsPaper: {
		maxHeight: 200,
		overflow: 'auto',
		mt: 1,
		border: '1px solid #ddd',
	},
	previewImage: {
		height: 100,
		width: 'auto',
		objectFit: 'contain',
		cursor: 'pointer',
		'&:hover': {
			opacity: 0.8,
		},
	},
	dialogPreviewImage: {
		width: '100%',
		height: 'auto',
		maxHeight: '80vh',
		objectFit: 'contain',
	},
};
