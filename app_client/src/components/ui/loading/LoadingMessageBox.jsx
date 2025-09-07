import React from 'react';
import { motion } from 'framer-motion';

const LoadingMessageBox = ({ loadingStatus }) => {
	return (
		<div className="relative text-center w-full flex justify-center items-center">
			<motion.div 
				className="p-2.5 text-2xl"
				style={{ fontFamily: "'Song Myung', serif" }}
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				exit={{ opacity: 0 }}
				transition={{ duration: 0.5 }}
			>
				{loadingStatus}
			</motion.div>
		</div>
	);
};

export default LoadingMessageBox;