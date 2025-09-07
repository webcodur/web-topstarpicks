import React, { useCallback, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useAtom } from 'jotai';
import { menuInfoAtom } from 'store/atom';
import { services } from 'view/home/constants';
// Using Tailwind classes instead of styled-components

const ServiceIcons = React.memo(() => {
	const [, setMenuInfo] = useAtom(menuInfoAtom);

	const handleNavigate = useCallback(
		(path, title) => {
			setMenuInfo(title);
		},
		[setMenuInfo]
	);

	const memoizedServices = useMemo(() => services, []);

	return (
		<div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
			{memoizedServices.map((service, index) => (
				<motion.div 
					key={index}
					whileHover={{ scale: 1.05 }}
					whileTap={{ scale: 0.95 }}
				>
					<Link
						to={service.path}
						className="block no-underline"
						onClick={() => handleNavigate(service.path, service.title)}>
						<div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 text-center">
							<div className="flex justify-center mb-4">
								<div className="text-4xl text-blue-600">
									{React.cloneElement(service.icon, { className: "w-12 h-12" })}
								</div>
							</div>
							<div>
								<h3 className="text-lg font-semibold text-gray-800">{service.title}</h3>
							</div>
						</div>
					</Link>
				</motion.div>
			))}
		</div>
	);
});

export default ServiceIcons;
