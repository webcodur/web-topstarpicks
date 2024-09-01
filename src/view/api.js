// api.js

// 더 많은 더미 데이터 생성
const generateDummyTodos = (count) => {
	return Array.from({ length: count }, (_, i) => ({
		id: i + 1,
		title: `Todo item ${i + 1}`,
		completed: Math.random() > 0.5,
	}));
};

let todos = generateDummyTodos(100); // 100개의 todo 항목 생성
let nextId = todos.length + 1;

// 모든 할 일 가져오기
export const fetchTodos = async (page = 1, limit = 10) => {
	await new Promise((resolve) => setTimeout(resolve, 200));
	const start = (page - 1) * limit;
	const end = start + limit;
	return {
		todos: todos.slice(start, end),
		hasMore: end < todos.length,
		totalCount: todos.length,
	};
};

// 할 일 추가
export const addTodo = async (newTodo) => {
	await new Promise((resolve) => setTimeout(resolve, 200));
	const todo = { id: nextId++, title: newTodo, completed: false };
	todos.unshift(todo);
	return todo;
};

// 할 일 토글
export const toggleTodo = async (id) => {
	await new Promise((resolve) => setTimeout(resolve, 200));
	const todo = todos.find((todo) => todo.id === id);
	if (todo) {
		todo.completed = !todo.completed;
		return todo;
	}
	throw new Error('Todo not found');
};

// 할 일 삭제
export const deleteTodo = async (id) => {
	await new Promise((resolve) => setTimeout(resolve, 200));
	const index = todos.findIndex((todo) => todo.id === id);
	if (index !== -1) {
		todos.splice(index, 1);
		return id;
	}
	throw new Error('Todo not found');
};
