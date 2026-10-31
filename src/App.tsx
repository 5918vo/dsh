import { useMemo, useState } from 'react';
import { Filters } from './components/Filters';
import { TodoInput } from './components/TodoInput';
import { TodoList } from './components/TodoList';
import { useTodos } from './hooks/useTodos';
import { filterTodos, remainingCount, type Filter } from './todos';

export default function App() {
  const { todos, addTodo, toggleTodo, updateTodo, removeTodo, clearCompleted } = useTodos();
  const [filter, setFilter] = useState<Filter>('all');

  const visibleTodos = useMemo(() => filterTodos(todos, filter), [todos, filter]);
  const remaining = useMemo(() => remainingCount(todos), [todos]);
  const completed = todos.length - remaining;

  return (
    <main className="app">
      <section className="card">
        <header className="app__header">
          <h1 className="app__title">待办清单</h1>
          <p className="app__subtitle">专注当下，逐项完成。</p>
        </header>

        <TodoInput onAdd={addTodo} />

        <Filters current={filter} onChange={setFilter} />

        <TodoList
          todos={visibleTodos}
          onToggle={toggleTodo}
          onRemove={removeTodo}
          onUpdate={updateTodo}
        />

        {todos.length > 0 && (
          <footer className="app__footer">
            <span className="app__count">
              还剩 <strong>{remaining}</strong> 项未完成
            </span>
            <button
              type="button"
              className="app__clear"
              onClick={clearCompleted}
              disabled={completed === 0}
            >
              清除已完成{completed > 0 ? ` (${completed})` : ''}
            </button>
          </footer>
        )}
      </section>
    </main>
  );
}
