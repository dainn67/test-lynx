import './TodoApp.css';
import lynxLogo from './assets/lynx-logo.png';
import { useEffect } from '@lynx-js/react';
import { TodoProvider } from './TodoContext';
import { TodoList } from './components/TodoList';
import { TodoInput } from './components/TodoInput';
import { TodoFooter } from './components/TodoFooter';

export function TodoApp() {
  useEffect(() => {
    console.info('Todo App Initialized');
  }, []);

  return (
    <TodoProvider>
      <view>
        <view className="TodoBackground" />
        <view className="TodoApp">
          <view className="TodoHeader">
            <image src={lynxLogo} className="TodoLogo" />
            <text className="TodoTitle">Todo List</text>
          </view>
          <TodoInput />
          <TodoList />
          <TodoFooter />
        </view>
      </view>
    </TodoProvider>
  );
}
