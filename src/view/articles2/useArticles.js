import { useInfiniteQuery, useMutation, useQueryClient } from 'react-query';
import { articleService } from './articleService';

export const useArticles = () => {
	const queryClient = useQueryClient();

	const { data, fetchNextPage, hasNextPage, isFetchingNextPage, status } =
		useInfiniteQuery(
			'articles',
			({ pageParam = 1 }) => articleService.getAll(pageParam),
			{
				getNextPageParam: (lastPage, pages) => {
					if (lastPage.length === 0) return undefined;
					return pages.length + 1;
				},
			}
		);

	const createMutation = useMutation(articleService.create, {
		onSuccess: () => {
			queryClient.invalidateQueries('articles');
		},
	});

	const updateMutation = useMutation(articleService.update, {
		onSuccess: () => {
			queryClient.invalidateQueries('articles');
		},
	});

	const deleteMutation = useMutation(articleService.delete, {
		onSuccess: () => {
			queryClient.invalidateQueries('articles');
		},
	});

	const handleCreate = (newArticle) => {
		createMutation.mutate({
			...newArticle,
			createdAt: new Date().toISOString(),
			updatedAt: new Date().toISOString(),
		});
	};

	const handleUpdate = (updatedArticle) => {
		updateMutation.mutate({
			id: updatedArticle.id,
			article: {
				...updatedArticle,
				updatedAt: new Date().toISOString(),
			},
		});
	};

	const handleDelete = (id) => {
		deleteMutation.mutate(id);
	};

	return {
		articles: data?.pages.flat() ?? [],
		fetchNextPage,
		hasNextPage,
		isFetchingNextPage,
		status,
		handleCreate,
		handleUpdate,
		handleDelete,
	};
};
