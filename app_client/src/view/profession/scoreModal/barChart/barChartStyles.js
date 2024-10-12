export const barChartStyles = {
	container: {
		height: 350,
		width: '100%',
		maxWidth: 300,
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'center',
		border: '1px solid #e0e0e0',
		padding: '20px',
		borderRadius: '10px',
		boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
	},
	title: {
		fontWeight: 'bold',
		marginBottom: '15px',
	},
	bar: {
		fill: '#4CAF50',
		maxBarSize: 40,
	},
	axisLabel: {
		fontSize: 12,
		fontWeight: 'bold',
		fill: '#333',
	},
	chartMargin: {
		top: 5,
		right: 30,
		left: 20,
		bottom: 5,
	},
	tooltip: {
		backgroundColor: 'rgba(255, 255, 255, 0.9)',
		borderRadius: '5px',
		boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
		padding: '10px',
	},
	totalScore: {
		marginTop: '15px',
		fontWeight: 'bold',
	},
};
