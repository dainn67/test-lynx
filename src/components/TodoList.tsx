import { useTodoContext } from '../TodoContext';

export function TodoList() {
  const { todos, toggleTodo, deleteTodo } = useTodoContext();

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
        <view key={todo.id} className="TodoItem">
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
            bindtap={() => deleteTodo(todo.id)}
          >
            <text>×</text>
          </view>
        </view>
      ))}
    </view>
  );
}
