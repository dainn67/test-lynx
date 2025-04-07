import { useCallback } from '@lynx-js/react';
import { useTodoContext } from '../TodoContext';

export const TodoFooter = () => {
  const { activeTodoCount, completedTodoCount, clearCompleted } = useTodoContext();

  const handleClearCompleted = useCallback(() => {
    clearCompleted();
  }, [clearCompleted]);

  return (
    <view className="TodoFooter">
      <text className="TodoCount">
        {activeTodoCount} {activeTodoCount === 1 ? 'item' : 'items'} left
      </text>
      
      <view className="TodoClearButton" style={{ visibility: completedTodoCount > 0 ? 'visible' : 'hidden' }} bindtap={handleClearCompleted}>
        <text>Clear completed</text>
      </view>
    </view>
  );
} 