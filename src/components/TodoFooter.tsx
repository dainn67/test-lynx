import { useCallback } from '@lynx-js/react';
import { useTodoContext } from '../TodoContext';

export function TodoFooter() {
  const { activeTodoCount, completedTodoCount, clearCompleted } = useTodoContext();

  const handleClearCompleted = useCallback(() => {
    clearCompleted();
  }, [clearCompleted]);

  return (
    <view className="TodoFooter">
      <text className="TodoCount">
        {activeTodoCount} {activeTodoCount === 1 ? 'item' : 'items'} left
      </text>
      
      {completedTodoCount > 0 && (
        <view className="TodoClearButton" bindtap={handleClearCompleted}>
          <text>Clear completed</text>
        </view>
      )}
    </view>
  );
} 