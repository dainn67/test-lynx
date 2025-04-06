import { useCallback, useState } from '@lynx-js/react';
import { useTodoContext } from '../TodoContext';

export function TodoInput() {
  const [inputText, setInputText] = useState('');
  const { addTodo } = useTodoContext();

  const handleInputChange = useCallback((event: any) => {
    console.log('event', event);
    setInputText(event.detail.value);
  }, []);

  const handleAddTodo = useCallback(() => {
    if (inputText.trim()) {
      addTodo(inputText);
      setInputText('');
    }
  }, [inputText, addTodo]);

  return (
    <view className="TodoInputContainer">
      <input
        className="TodoInput"
        placeholder="Add a new task..."
        value={inputText}
        bindinput={handleInputChange}
      />
      <view className="TodoAddButton" bindtap={handleAddTodo}>
        <text>Add</text>
      </view>
    </view>
  );
}
