import { useState, type FormEvent } from 'react';

interface TodoInputProps {
  onAdd: (title: string) => void;
}

export function TodoInput({ onAdd }: TodoInputProps) {
  const [title, setTitle] = useState('');

  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    if (!title.trim()) return;
    onAdd(title);
    setTitle('');
  }

  return (
    <form className="todo-input" onSubmit={handleSubmit}>
      <input
        className="todo-input__field"
        value={title}
        onChange={(event) => setTitle(event.target.value)}
        placeholder="需要做点什么？"
        aria-label="新待办事项"
        autoFocus
      />
      <button className="todo-input__button" type="submit" disabled={!title.trim()}>
        添加
      </button>
    </form>
  );
}
