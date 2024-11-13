import React from 'react';
import { Box, Typography } from '@mui/material';
import { motion } from 'framer-motion';

const Statistics = () => {
	const stats = [
		{ number: '1000+', label: '셀럽 프로필' },
		{ number: '5000+', label: '인사이트' },
		{ number: '10K+', label: '월간 사용자' },
	];

	return (
		<Box
			sx={{
				display: 'flex',
				justifyContent: 'center',
				gap: { xs: 3, md: 6 },
				width: '100%',
			}}>
			{stats.map((stat, index) => (
				<motion.div
					key={index}
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ delay: index * 0.2 }}>
					<Box sx={{ textAlign: 'center', color: '#000' }}>
						<Typography
							variant="h3"
							sx={{
								fontSize: { xs: '1.4rem', md: '2rem' },
								fontWeight: 'bold',
								mb: 1,
							}}>
							{stat.number}
						</Typography>
						<Typography
							sx={{
								fontSize: { xs: '0.8rem', md: '0.9rem' },
								opacity: 0.8,
							}}>
							{stat.label}
						</Typography>
					</Box>
				</motion.div>
			))}
		</Box>
	);
};

export default Statistics;
