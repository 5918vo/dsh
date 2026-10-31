import type { Filter } from '../todos';

const FILTERS: { value: Filter; label: string }[] = [
  { value: 'all', label: '全部' },
  { value: 'active', label: '未完成' },
  { value: 'completed', label: '已完成' },
];

interface FiltersProps {
  current: Filter;
  onChange: (filter: Filter) => void;
}

export function Filters({ current, onChange }: FiltersProps) {
  return (
    <div className="filters" role="group" aria-label="筛选待办事项">
      {FILTERS.map((filter) => (
        <button
          key={filter.value}
          type="button"
          className={`filters__button${current === filter.value ? ' filters__button--active' : ''}`}
          aria-pressed={current === filter.value}
          onClick={() => onChange(filter.value)}
        >
          {filter.label}
        </button>
      ))}
    </div>
  );
}
