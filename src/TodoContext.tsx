import { createContext, useCallback, useContext, useState } from '@lynx-js/react';

export interface TodoItem {
  id: string;
  text: string;
  completed: boolean;
  createdAt: Date;
}

interface TodoContextType {
  todos: TodoItem[];
  addTodo: (text: string) => void;
  toggleTodo: (id: string) => void;
  deleteTodo: (id: string) => void;
  clearCompleted: () => void;
  activeTodoCount: number;
  completedTodoCount: number;
}

const TodoContext = createContext<TodoContextType | undefined>(undefined);

export function TodoProvider({ children }: { children: React.ReactNode }) {
  const [todos, setTodos] = useState<TodoItem[]>([]);

  const addTodo = useCallback((text: string) => {
    if (text.trim()) {
      const newTodo: TodoItem = {
        id: Date.now().toString(),
        text: text.trim(),
        completed: false,
        createdAt: new Date(),
      };
      setTodos((prevTodos) => [...prevTodos, newTodo]);
    }
  }, []);

  const toggleTodo = useCallback((id: string) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  }, []);

  const deleteTodo = useCallback((id: string) => {
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
  }, []);

  const clearCompleted = useCallback(() => {
    setTodos((prevTodos) => prevTodos.filter((todo) => !todo.completed));
  }, []);

  const activeTodoCount = todos.filter((todo) => !todo.completed).length;
  const completedTodoCount = todos.length - activeTodoCount;

  const value = {
    todos,
    addTodo,
    toggleTodo,
    deleteTodo,
    clearCompleted,
    activeTodoCount,
    completedTodoCount,
  };

  return <TodoContext.Provider value={value}>{children}</TodoContext.Provider>;
}

export function useTodoContext() {
  const context = useContext(TodoContext);
  if (context === undefined) {
    throw new Error('useTodoContext must be used within a TodoProvider');
  }
  return context;
} 