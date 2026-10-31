import { beforeEach, describe, expect, it } from 'vitest';
import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';

beforeEach(() => {
  localStorage.clear();
});

describe('App', () => {
  it('adds, completes and filters todos', async () => {
    const user = userEvent.setup();
    render(<App />);

    const input = screen.getByLabelText('新待办事项');
    await user.type(input, '写周报{Enter}');
    await user.type(input, '买牛奶{Enter}');

    expect(screen.getByText('写周报')).toBeInTheDocument();
    expect(screen.getByText('买牛奶')).toBeInTheDocument();
    expect(screen.getByText(/还剩/)).toHaveTextContent('还剩 2 项未完成');

    await user.click(screen.getByLabelText('标记「写周报」为已完成'));
    expect(screen.getByText(/还剩/)).toHaveTextContent('还剩 1 项未完成');

    await user.click(screen.getByRole('button', { name: '已完成' }));
    const list = screen.getByRole('list');
    expect(within(list).getByText('写周报')).toBeInTheDocument();
    expect(within(list).queryByText('买牛奶')).not.toBeInTheDocument();
  });

  it('deletes a todo', async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.type(screen.getByLabelText('新待办事项'), '临时任务{Enter}');
    expect(screen.getByText('临时任务')).toBeInTheDocument();

    await user.click(screen.getByLabelText('删除「临时任务」'));
    expect(screen.queryByText('临时任务')).not.toBeInTheDocument();
  });

  it('persists todos to localStorage', async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.type(screen.getByLabelText('新待办事项'), '记得保存{Enter}');
    const stored = JSON.parse(localStorage.getItem('react-todolist:todos') ?? '[]');
    expect(stored[0].title).toBe('记得保存');
  });
});
