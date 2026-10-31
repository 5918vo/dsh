import { useEffect, useRef, useState, type KeyboardEvent } from 'react';
import type { Todo } from '../todos';

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: string) => void;
  onRemove: (id: string) => void;
  onUpdate: (id: string, title: string) => void;
}

export function TodoItem({ todo, onToggle, onRemove, onUpdate }: TodoItemProps) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(todo.title);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (editing) {
      inputRef.current?.focus();
      inputRef.current?.select();
    }
  }, [editing]);

  function startEditing() {
    setDraft(todo.title);
    setEditing(true);
  }

  function commit() {
    setEditing(false);
    if (draft.trim() !== todo.title) {
      onUpdate(todo.id, draft);
    }
  }

  function cancel() {
    setEditing(false);
    setDraft(todo.title);
  }

  function handleKeyDown(event: KeyboardEvent<HTMLInputElement>) {
    if (event.key === 'Enter') commit();
    if (event.key === 'Escape') cancel();
  }

  return (
    <li className={`todo-item${todo.completed ? ' todo-item--completed' : ''}`}>
      <label className="todo-item__check">
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={() => onToggle(todo.id)}
          aria-label={`标记「${todo.title}」为${todo.completed ? '未完成' : '已完成'}`}
        />
        <span className="todo-item__box" aria-hidden="true" />
      </label>

      {editing ? (
        <input
          ref={inputRef}
          className="todo-item__edit"
          value={draft}
          onChange={(event) => setDraft(event.target.value)}
          onBlur={commit}
          onKeyDown={handleKeyDown}
          aria-label="编辑待办事项"
        />
      ) : (
        <span
          className="todo-item__title"
          onDoubleClick={startEditing}
          title="双击可编辑"
        >
          {todo.title}
        </span>
      )}

      <div className="todo-item__actions">
        {!editing && (
          <button
            className="todo-item__action"
            onClick={startEditing}
            aria-label={`编辑「${todo.title}」`}
            title="编辑"
          >
            ✎
          </button>
        )}
        <button
          className="todo-item__action todo-item__action--danger"
          onClick={() => onRemove(todo.id)}
          aria-label={`删除「${todo.title}」`}
          title="删除"
        >
          ✕
        </button>
      </div>
    </li>
  );
}
