// TodoList.js
import React, { useState } from 'react';
import { useMutation, useQueryClient, useInfiniteQuery } from 'react-query';
import { fetchTodos, addTodo, toggleTodo, deleteTodo } from './api';

const styles = {
	container: {
		maxWidth: '800px',
		margin: '0 auto',
		padding: '20px',
		fontFamily: 'Arial, sans-serif',
	},
	header: {
		textAlign: 'center',
		marginBottom: '20px',
	},
	form: {
		display: 'flex',
		marginBottom: '20px',
	},
	input: {
		flex: 1,
		padding: '10px',
		fontSize: '16px',
	},
	button: {
		padding: '10px 20px',
		fontSize: '16px',
		backgroundColor: '#007bff',
		color: 'white',
		border: 'none',
		cursor: 'pointer',
	},
	todoItem: {
		display: 'flex',
		alignItems: 'center',
		padding: '10px',
		borderBottom: '1px solid #eee',
	},
	checkbox: {
		marginRight: '10px',
	},
	deleteButton: {
		marginLeft: 'auto',
		padding: '5px 10px',
		backgroundColor: '#dc3545',
		color: 'white',
		border: 'none',
		cursor: 'pointer',
	},
	loadMoreButton: {
		display: 'block',
		width: '100%',
		padding: '10px',
		marginTop: '20px',
		backgroundColor: '#28a745',
		color: 'white',
		border: 'none',
		cursor: 'pointer',
	},
	footer: {
		marginTop: '20px',
		textAlign: 'center',
	},
};

function TodoList() {
	const [newTodo, setNewTodo] = useState('');
	const queryClient = useQueryClient();

	const {
		data,
		fetchNextPage,
		hasNextPage,
		isLoading,
		isError,
		error,
		isFetchingNextPage,
	} = useInfiniteQuery('todos', ({ pageParam = 1 }) => fetchTodos(pageParam), {
		getNextPageParam: (lastPage, pages) => {
			if (lastPage.hasMore) {
				return pages.length + 1;
			}
			return undefined;
		},
	});

	const addTodoMutation = useMutation(addTodo, {
		onSuccess: () => {
			queryClient.invalidateQueries('todos');
			setNewTodo('');
		},
	});

	const toggleTodoMutation = useMutation(toggleTodo, {
		onMutate: async (todoId) => {
			await queryClient.cancelQueries('todos');
			const previousTodos = queryClient.getQueryData('todos');
			queryClient.setQueryData('todos', (old) => ({
				...old,
				pages: old.pages.map((page) => ({
					...page,
					todos: page.todos.map((t) =>
						t.id === todoId ? { ...t, completed: !t.completed } : t
					),
				})),
			}));
			return { previousTodos };
		},
		onError: (err, variables, context) => {
			queryClient.setQueryData('todos', context.previousTodos);
		},
		onSettled: () => {
			queryClient.invalidateQueries('todos');
		},
	});

	const deleteTodoMutation = useMutation(deleteTodo, {
		onMutate: async (todoId) => {
			await queryClient.cancelQueries('todos');
			const previousTodos = queryClient.getQueryData('todos');
			queryClient.setQueryData('todos', (old) => ({
				...old,
				pages: old.pages.map((page) => ({
					...page,
					todos: page.todos.filter((t) => t.id !== todoId),
				})),
			}));
			return { previousTodos };
		},
		onError: (err, variables, context) => {
			queryClient.setQueryData('todos', context.previousTodos);
		},
		onSettled: () => {
			queryClient.invalidateQueries('todos');
		},
	});

	if (isLoading) return <div style={styles.container}>로딩 중...</div>;
	if (isError)
		return <div style={styles.container}>에러 발생: {error.message}</div>;

	return (
		<div style={styles.container}>
			<h1 style={styles.header}>Todo List</h1>
			<form
				style={styles.form}
				onSubmit={(e) => {
					e.preventDefault();
					addTodoMutation.mutate(newTodo);
				}}>
				<input
					style={styles.input}
					type="text"
					value={newTodo}
					onChange={(e) => setNewTodo(e.target.value)}
					placeholder="새 할 일 입력"
				/>
				<button style={styles.button} type="submit">
					추가
				</button>
			</form>

			{data.pages.map((page, i) => (
				<React.Fragment key={i}>
					{page.todos.map((todo) => (
						<div
							key={todo.id}
							style={{
								...styles.todoItem,
								opacity:
									toggleTodoMutation.isLoading || deleteTodoMutation.isLoading
										? 0.5
										: 1,
								transition: 'opacity 0.2s',
							}}>
							<input
								style={styles.checkbox}
								type="checkbox"
								checked={todo.completed}
								onChange={() => toggleTodoMutation.mutate(todo.id)}
								disabled={
									toggleTodoMutation.isLoading || deleteTodoMutation.isLoading
								}
							/>
							<span
								style={{
									textDecoration: todo.completed ? 'line-through' : 'none',
									color:
										toggleTodoMutation.isLoading || deleteTodoMutation.isLoading
											? '#888'
											: '#000',
								}}>
								{todo.title}
							</span>
							<button
								style={styles.deleteButton}
								onClick={() => deleteTodoMutation.mutate(todo.id)}
								disabled={
									toggleTodoMutation.isLoading || deleteTodoMutation.isLoading
								}>
								삭제
							</button>
						</div>
					))}
				</React.Fragment>
			))}

			{hasNextPage && (
				<button
					style={styles.loadMoreButton}
					onClick={() => fetchNextPage()}
					disabled={isFetchingNextPage}>
					{isFetchingNextPage ? '로딩 중...' : '더 보기'}
				</button>
			)}

			<div style={styles.footer}>
				총 할 일 개수: {data.pages[0].totalCount} | 현재 페이지:{' '}
				{data.pages.length} | 항목 수:{' '}
				{data.pages.reduce((acc, page) => acc + page.todos.length, 0)}
			</div>
		</div>
	);
}

export default TodoList;
