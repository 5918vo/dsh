export type Filter = 'all' | 'active' | 'completed';

export interface Todo {
  id: string;
  title: string;
  completed: boolean;
  createdAt: number;
}

/** Create a new todo item from a title. Blank titles are trimmed away by callers. */
export function createTodo(title: string, id: string, createdAt: number = Date.now()): Todo {
  return { id, title: title.trim(), completed: false, createdAt };
}

export function addTodo(todos: Todo[], title: string, id: string, createdAt?: number): Todo[] {
  const trimmed = title.trim();
  if (!trimmed) return todos;
  return [createTodo(trimmed, id, createdAt), ...todos];
}

export function toggleTodo(todos: Todo[], id: string): Todo[] {
  return todos.map((todo) => (todo.id === id ? { ...todo, completed: !todo.completed } : todo));
}

export function updateTodo(todos: Todo[], id: string, title: string): Todo[] {
  const trimmed = title.trim();
  if (!trimmed) return removeTodo(todos, id);
  return todos.map((todo) => (todo.id === id ? { ...todo, title: trimmed } : todo));
}

export function removeTodo(todos: Todo[], id: string): Todo[] {
  return todos.filter((todo) => todo.id !== id);
}

export function clearCompleted(todos: Todo[]): Todo[] {
  return todos.filter((todo) => !todo.completed);
}

export function filterTodos(todos: Todo[], filter: Filter): Todo[] {
  switch (filter) {
    case 'active':
      return todos.filter((todo) => !todo.completed);
    case 'completed':
      return todos.filter((todo) => todo.completed);
    default:
      return todos;
  }
}

export function remainingCount(todos: Todo[]): number {
  return todos.reduce((count, todo) => (todo.completed ? count : count + 1), 0);
}
