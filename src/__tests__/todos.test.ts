import { describe, expect, it } from 'vitest';
import {
  addTodo,
  clearCompleted,
  createTodo,
  filterTodos,
  remainingCount,
  removeTodo,
  toggleTodo,
  updateTodo,
  type Todo,
} from '../todos';

function sample(): Todo[] {
  return [
    createTodo('写代码', '1', 1),
    { ...createTodo('跑步', '2', 2), completed: true },
    createTodo('读书', '3', 3),
  ];
}

describe('todos logic', () => {
  it('creates a trimmed todo', () => {
    expect(createTodo('  买菜  ', 'x', 42)).toEqual({
      id: 'x',
      title: '买菜',
      completed: false,
      createdAt: 42,
    });
  });

  it('adds a todo to the front and ignores blank titles', () => {
    const list = addTodo([], '  第一项 ', 'a', 10);
    expect(list).toHaveLength(1);
    expect(list[0]).toMatchObject({ title: '第一项', completed: false });
    expect(addTodo(list, '   ', 'b')).toHaveLength(1);
  });

  it('toggles a todo without mutating the original array', () => {
    const list = sample();
    const next = toggleTodo(list, '1');
    expect(next[0].completed).toBe(true);
    expect(list[0].completed).toBe(false);
  });

  it('updates a title and removes on blank update', () => {
    const list = sample();
    expect(updateTodo(list, '1', ' 写测试 ')[0].title).toBe('写测试');
    expect(updateTodo(list, '1', '   ').find((t) => t.id === '1')).toBeUndefined();
  });

  it('removes a todo', () => {
    expect(removeTodo(sample(), '2').map((t) => t.id)).toEqual(['1', '3']);
  });

  it('clears completed todos', () => {
    expect(clearCompleted(sample()).map((t) => t.id)).toEqual(['1', '3']);
  });

  it('filters by status', () => {
    const list = sample();
    expect(filterTodos(list, 'all')).toHaveLength(3);
    expect(filterTodos(list, 'active').map((t) => t.id)).toEqual(['1', '3']);
    expect(filterTodos(list, 'completed').map((t) => t.id)).toEqual(['2']);
  });

  it('counts remaining items', () => {
    expect(remainingCount(sample())).toBe(2);
  });
});
