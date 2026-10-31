import { useCallback, useEffect, useState } from 'react';
import {
  addTodo as addTodoToList,
  clearCompleted as clearCompletedFromList,
  removeTodo as removeTodoFromList,
  toggleTodo as toggleTodoInList,
  updateTodo as updateTodoInList,
  type Todo,
} from '../todos';

const STORAGE_KEY = 'react-todolist:todos';

function createId(): string {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return crypto.randomUUID();
  }
  return `${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

export function loadTodos(): Todo[] {
  if (typeof localStorage === 'undefined') return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(
      (item): item is Todo =>
        !!item &&
        typeof item === 'object' &&
        typeof (item as Todo).id === 'string' &&
        typeof (item as Todo).title === 'string' &&
        typeof (item as Todo).completed === 'boolean',
    );
  } catch {
    return [];
  }
}

export function useTodos() {
  const [todos, setTodos] = useState<Todo[]>(loadTodos);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
    } catch {
      // Storage can be unavailable (private mode / quota); the app still works in memory.
    }
  }, [todos]);

  const addTodo = useCallback((title: string) => {
    setTodos((current) => addTodoToList(current, title, createId()));
  }, []);

  const toggleTodo = useCallback((id: string) => {
    setTodos((current) => toggleTodoInList(current, id));
  }, []);

  const updateTodo = useCallback((id: string, title: string) => {
    setTodos((current) => updateTodoInList(current, id, title));
  }, []);

  const removeTodo = useCallback((id: string) => {
    setTodos((current) => removeTodoFromList(current, id));
  }, []);

  const clearCompleted = useCallback(() => {
    setTodos((current) => clearCompletedFromList(current));
  }, []);

  return { todos, addTodo, toggleTodo, updateTodo, removeTodo, clearCompleted };
}
