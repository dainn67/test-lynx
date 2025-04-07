import { createContext, useCallback, useContext, useState, useRef, useEffect } from '@lynx-js/react';

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
  animatingIds: string[];
}

const TodoContext = createContext<TodoContextType | undefined>(undefined);

export function TodoProvider({ children }: { children: React.ReactNode }) {
  const [todos, setTodos] = useState<TodoItem[]>([]);
  const [animatingIds, setAnimatingIds] = useState<string[]>([]);
  const timeoutRefs = useRef<Record<string, NodeJS.Timeout>>({});

  // Clean up timeouts on unmount
  useEffect(() => {
    return () => {
      Object.values(timeoutRefs.current).forEach(clearTimeout);
    };
  }, []);

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
    // Add to animating ids
    setAnimatingIds((prev) => [...prev, id]);
    
    // Set a timeout to remove the todo after animation completes
    const timeoutId = setTimeout(() => {
      setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
      setAnimatingIds((prev) => prev.filter((itemId) => itemId !== id));
    }, 300); // Match animation duration in CSS
    
    timeoutRefs.current[id] = timeoutId;
  }, []);

  const clearCompleted = useCallback(() => {
    // Get all completed todos for animation
    const completedIds = todos
      .filter((todo) => todo.completed)
      .map((todo) => todo.id);
    
    // Add all to animating state
    setAnimatingIds((prev) => [...prev, ...completedIds]);
    
    // Set a single timeout to remove all completed after animation
    setTimeout(() => {
      setTodos((prevTodos) => prevTodos.filter((todo) => !todo.completed));
      setAnimatingIds([]);
    }, 300);
  }, [todos]);

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
    animatingIds,
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