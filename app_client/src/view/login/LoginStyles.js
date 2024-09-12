import styled from '@emotion/styled';

export const LoginWrapper = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	padding: 2rem;
	background-color: #f8f9fa;
	min-height: 100vh;
`;

export const LoginForm = styled.form`
	display: flex;
	flex-direction: column;
	width: 100%;
	max-width: 300px;
	background-color: white;
	padding: 2rem;
	border-radius: 8px;
	box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

export const Input = styled.input`
	margin-bottom: 0.5rem;
	padding: 0.75rem;
	font-size: 1rem;
	border: 1px solid #dee2e6;
	border-radius: 4px;
	&:focus {
		outline: none;
		border-color: #228be6;
	}
`;

export const Button = styled.button`
	padding: 0.75rem;
	font-size: 1rem;
	border: none;
	border-radius: 4px;
	cursor: pointer;
	transition: background-color 0.2s, color 0.2s;
	background-color: ${(props) => (props.disabled ? '#e9ecef' : '#228be6')};
	color: ${(props) => (props.disabled ? '#adb5bd' : 'white')};

	&:hover {
		background-color: ${(props) => (props.disabled ? '#e9ecef' : '#1c7ed6')};
	}

	&:disabled {
		cursor: not-allowed;
	}
`;

export const ErrorMessage = styled.p`
	color: #e03131;
	font-size: 0.875rem;
	margin-top: 0.25rem;
	margin-bottom: 0.75rem;
`;
