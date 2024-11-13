import React from 'react';
import { Box, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import * as Icons from '@mui/icons-material';
import { ServiceIconWrapper, ServiceInfo } from '../styles';
import { services } from '../constants';

const ServiceIcons = ({ onNavigate }) => {
	return (
		<Box
			sx={{
				display: 'flex',
				justifyContent: 'center',
				gap: { xs: 2, md: 4 },
				flexWrap: 'wrap',
				width: '100%',
			}}>
			{services.map((service, index) => {
				const Icon = Icons[service.icon];
				return (
					<motion.div
						key={index}
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ delay: index * 0.1 }}>
						<Link
							to={service.path}
							style={{ textDecoration: 'none' }}
							onClick={() => onNavigate(service.path, service.title)}>
							<ServiceIconWrapper>
								<Box
									sx={{
										color: '#000000',
										transition: 'transform 0.3s ease',
										'&:hover': {
											transform: 'scale(1.1)',
										},
									}}>
									<Icon sx={{ fontSize: 28 }} />
								</Box>
								<ServiceInfo className="service-info">
									<Typography
										variant="h6"
										sx={{ color: '#000000' }}
										gutterBottom>
										{service.title}
									</Typography>
									<Typography variant="body2" color="text.secondary">
										{service.description}
									</Typography>
								</ServiceInfo>
							</ServiceIconWrapper>
						</Link>
					</motion.div>
				);
			})}
		</Box>
	);
};

export default ServiceIcons;
