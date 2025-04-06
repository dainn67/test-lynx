import { TodoItem } from '../TodoContext';

export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(date);
}

export type FilterType = 'all' | 'active' | 'completed';

export function filterTodos(todos: TodoItem[], filter: FilterType): TodoItem[] {
  switch (filter) {
    case 'active':
      return todos.filter(todo => !todo.completed);
    case 'completed':
      return todos.filter(todo => todo.completed);
    default:
      return todos;
  }
}

export function sortTodos(todos: TodoItem[], sortBy: 'created' | 'alphabetical'): TodoItem[] {
  const sortedTodos = [...todos];
  
  if (sortBy === 'created') {
    return sortedTodos.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  } else {
    return sortedTodos.sort((a, b) => a.text.localeCompare(b.text));
  }
} 