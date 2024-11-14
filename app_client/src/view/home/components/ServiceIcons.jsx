import React, { useCallback, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useAtom } from 'jotai';
import { menuInfoAtom } from 'store/atom';
import { services } from 'view/home/constants';
import {
	ServiceIconWrapper,
	ServiceInfo,
	IconsContainer,
	IconBox,
	ServiceText,
	StyledIcon,
	IconWrapperSx,
	ContainerSx,
} from 'view/home/styles/ServiceIconsStyles';

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
		<IconsContainer sx={ContainerSx}>
			{memoizedServices.map((service, index) => (
				<motion.div key={index}>
					<Link
						to={service.path}
						style={{ textDecoration: 'none' }}
						onClick={() => handleNavigate(service.path, service.title)}>
						<ServiceIconWrapper sx={IconWrapperSx}>
							<IconBox>
								{React.cloneElement(service.icon, { sx: StyledIcon })}
							</IconBox>
							<ServiceInfo>
								<ServiceText variant="h6">{service.title}</ServiceText>
							</ServiceInfo>
						</ServiceIconWrapper>
					</Link>
				</motion.div>
			))}
		</IconsContainer>
	);
});

export default ServiceIcons;
