// Profession.styles.js
import styled from '@emotion/styled';
import { Typography } from '@mui/material';

export const PageTitle = styled(Typography)`
	margin-top: 32px;
	margin-bottom: 32px;
	font-family: 'Gowun Batang', serif;
	font-weight: bold;
	word-break: keep-all;
	word-wrap: break-word;

	@media screen and (max-width: 768px) {
		font-size: 1.5rem;
		margin-top: 24px;
		margin-bottom: 24px;
	}
`;

export const ContentWrapper = styled.div`
	max-width: 100%;
	padding: 0 16px;
	box-sizing: border-box;
`;

export const Divider = styled.hr`
	// 구분선의 스타일을 여기에 정의할 수 있습니다.
	// 예: border, margin 등
`;

export const Spacer = styled.div`
	height: 16px; // br 태그 두 개를 대체하는 높이
`;
