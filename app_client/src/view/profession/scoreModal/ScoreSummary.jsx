import React from 'react';

const ScoreSummary = ({ person, totalScore, grade }) => {
	return (
		<div
			style={{
				fontColor: 'red',
				textAlign: 'center',
				display: 'flex',
				flexDirection: 'column',
				alignItems: 'center',
				justifyContent: 'center',
				fontWeight: 'bold',
				border: '1px solid lightgray',
				borderRadius: '10px',
				padding: '10px',
				margin: '10px',
			}}>
			<p sx={{ mt: 2 }}>총계: {totalScore}/100</p>
			<p sx={{ mt: 2 }}>등급: {grade} RANK</p>
		</div>
	);
};

export default ScoreSummary;
