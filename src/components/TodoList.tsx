import type { Todo } from '../todos';
import { TodoItem } from './TodoItem';

interface TodoListProps {
  todos: Todo[];
  onToggle: (id: string) => void;
  onRemove: (id: string) => void;
  onUpdate: (id: string, title: string) => void;
}

export function TodoList({ todos, onToggle, onRemove, onUpdate }: TodoListProps) {
  if (todos.length === 0) {
    return (
      <p className="todo-empty" role="status">
        暂无待办事项，添加一条开始吧。
      </p>
    );
  }

  return (
    <ul className="todo-list">
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggle={onToggle}
          onRemove={onRemove}
          onUpdate={onUpdate}
        />
      ))}
    </ul>
  );
}
