import { useCallback, useState } from '@lynx-js/react';
import { useTodoContext } from '../TodoContext';

export const TodoInput = () => {
  const [inputText, setInputText] = useState('');
  const [isPulsing, setIsPulsing] = useState(false);
  const { addTodo } = useTodoContext();

  const handleInputChange = useCallback((event: any) => {
    setInputText(event.detail.value);
    
    // Check if Enter key was pressed
    if (event.detail.keyCode === 13 && inputText.trim()) {
      addTodo(inputText);
      setInputText('');
      animateButton();
    }
  }, [inputText, addTodo]);

  const animateButton = useCallback(() => {
    setIsPulsing(true);
    setTimeout(() => setIsPulsing(false), 400); // Match animation duration in CSS
  }, []);

  const handleAddTodo = useCallback(() => {
    if (inputText.trim()) {
      addTodo(inputText);
      setInputText('');
      animateButton();
    }
  }, [inputText, addTodo, animateButton]);

  return (
    <view className="TodoInputContainer">
      <input
        className="TodoInput"
        placeholder="Add a new task..."
        value={inputText}
        bindinput={handleInputChange}
      />
      <view 
        className={`TodoAddButton ${isPulsing ? 'TodoAddButton-pulse' : ''}`} 
        bindtap={handleAddTodo}
      >
        <text>Add</text>
      </view>
    </view>
  );
}
