import styled from '@emotion/styled';

export const StyledImage = styled.img`
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	object-fit: cover;
`;

export const StyledVideo = styled.video`
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	object-fit: cover;
`;

export const ImageContainer = styled.div`
	position: relative;
	width: 100%;
	padding-top: 180%;
	overflow: hidden;
	border-radius: 5px;
`;

const borderThickness = '15px';

export const RankBorder = styled.div`
	position: relative;
	padding: ${borderThickness};
	border-radius: 5px;
	background: ${({ rank }) => {
		switch (rank) {
			case 'S':
				return `
        linear-gradient(45deg, rgba(255, 215, 0, 1), rgba(255, 140, 0, 1)),
        url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100' height='100' filter='url(%23noise)' opacity='0.4'/%3E%3C/svg%3E")
    `;
			case 'A':
				return `
        linear-gradient(45deg, rgba(255, 192, 203, 1), rgba(255, 107, 107, 1)),
        url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100' height='100' filter='url(%23noise)' opacity='0.4'/%3E%3C/svg%3E")
    `;
			case 'B':
				return `
        linear-gradient(45deg, rgba(144, 238, 144, 1), rgba(32, 178, 170, 1)),
        url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100' height='100' filter='url(%23noise)' opacity='0.4'/%3E%3C/svg%3E")
    `;
			case 'C':
				return `
        linear-gradient(45deg, rgba(230, 243, 255, 1), rgba(70, 130, 180, 1)),
        url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100' height='100' filter='url(%23noise)' opacity='0.4'/%3E%3C/svg%3E")
    `;
			case 'D':
				return `
        linear-gradient(45deg, rgba(240, 248, 255, 1), rgba(169, 169, 169, 1)),
        url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100' height='100' filter='url(%23noise)' opacity='0.4'/%3E%3C/svg%3E")
    `;
			default:
				return 'none';
		}
	}};

	background-blend-mode: overlay;
	background-size: cover;
`;

export const RankScore = styled.div`
	position: absolute;
	top: 5px;
	left: 5px;
	background-color: rgba(0, 0, 0, 0.7);
	color: white;
	padding: 4px 7px;
	border-radius: 5px;
	z-index: 1;
	font-family: 'Permanent Marker', cursive;
	font-size: 20px;
	transform: rotate(-5deg);
	text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
`;
