import { useTodoContext } from '../TodoContext';
import { useCallback } from '@lynx-js/react';

export const TodoList = () => {
  const { todos, toggleTodo, deleteTodo, animatingIds } = useTodoContext();

  const handleDeleteTodo = useCallback((id: string) => {
    // First add to animating state (in context)
    // Then actual deletion will happen after animation in the context
    deleteTodo(id);
  }, [deleteTodo]);

  if (todos.length === 0) {
    return (
      <view className="TodoList">
        <text className="TodoEmptyMessage">No tasks yet. Add one above!</text>
      </view>
    );
  }

  return (
    <view className="TodoList">
      {todos.map((todo) => (
        <view 
          key={todo.id} 
          className={`TodoItem ${animatingIds.includes(todo.id) ? 'TodoItem-exit' : ''}`}
        >
          <view
            className={`TodoCheckbox ${todo.completed ? 'TodoCheckbox--checked' : ''}`}
            bindtap={() => toggleTodo(todo.id)}
          >
            {todo.completed && <text className="TodoCheckmark">✓</text>}
          </view>
          <text
            className={`TodoText ${todo.completed ? 'TodoText--completed' : ''}`}
          >
            {todo.text}
          </text>
          <view
            className="TodoDeleteButton"
            bindtap={() => handleDeleteTodo(todo.id)}
          >
            <text>×</text>
          </view>
        </view>
      ))}
    </view>
  );
}
