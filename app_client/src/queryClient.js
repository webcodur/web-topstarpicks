// queryClient.js
import { QueryClient } from 'react-query';

export const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			refetchOnWindowFocus: false,
			retry: 1,
		},
	},
});

// queryClient는 React Query의 핵심 개체로, 캐시를 관리하고 쿼리 설정을 제어합니다.
// 이 파일에서 QueryClient 인스턴스를 생성하고 있습니다. 이 queryClient는 다음과 같은 역할을 합니다:

// 쿼리 캐시 관리: 서버에서 가져온 데이터를 저장하고 관리합니다.

// 쿼리 설정: 기본적인 쿼리 옵션을 설정합니다.
// 예를 들어, 위 코드에서는 창 포커스 시 자동으로 데이터를 다시 가져오지 않도록 설정하고 (refetchOnWindowFocus: false), 쿼리 실패 시 한 번만 재시도하도록 (retry: 1) 설정하고 있습니다.
// 쿼리 무효화: 특정 쿼리나 쿼리 그룹을 무효화하고 필요시 새로운 데이터를 가져오도록 합니다.

// 이 queryClient를 QueryClientProvider에 제공함으로써, 애플리케이션 전체에서 React Query의 기능을 사용할 수 있게 됩니다.
// 사용 방법을 정리하면 다음과 같습니다:

// queryClient.js 파일을 생성하고 위의 코드를 작성합니다.
// App.js (또는 애플리케이션의 루트 컴포넌트)에서 이 queryClient를 import하고 QueryClientProvider에 제공합니다.

// 이렇게 하면 "No QueryClient set" 오류가 해결되고, React Query를 사용할 준비가 완료됩니다.
// 혹시 이 부분에 대해 더 자세한 설명이 필요하거나 다른 질문이 있으시면 말씀해 주세요.
