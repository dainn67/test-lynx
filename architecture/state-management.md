# State Management

This document explains the state management approach used in the Todo App, which is based on React's Context API.

## Overview

The Todo App uses React's Context API for state management, providing a centralized store for the application state without the need for third-party libraries like Redux. The state management is implemented in the `TodoContext.tsx` file, which defines both the data structure and the operations that can be performed on that data.

## TodoContext Structure

### Data Model

The central data type in the application is the `TodoItem`:

```typescript
export interface TodoItem {
  id: string;
  text: string;
  completed: boolean;
  createdAt: Date;
}
```

The context itself exposes the following interface:

```typescript
interface TodoContextType {
  todos: TodoItem[];               // List of all todo items
  addTodo: (text: string) => void; // Add a new todo
  toggleTodo: (id: string) => void; // Toggle a todo's completed status
  deleteTodo: (id: string) => void; // Delete a todo
  clearCompleted: () => void;      // Remove all completed todos
  activeTodoCount: number;         // Count of active todos
  completedTodoCount: number;      // Count of completed todos
  animatingIds: string[];          // IDs of todos currently animating
}
```

### State Variables

The TodoProvider maintains several pieces of state:

1. **`todos`**: An array of TodoItem objects representing all tasks
2. **`animatingIds`**: An array of todo IDs that are currently being animated (for smooth removal)
3. **`timeoutRefs`**: References to timeout IDs for managing animation cleanup

```typescript
const [todos, setTodos] = useState<TodoItem[]>([]);
const [animatingIds, setAnimatingIds] = useState<string[]>([]);
const timeoutRefs = useRef<Record<string, NodeJS.Timeout>>({});
```

## State Operations

The context provides several operations to modify the state:

### Adding Todos

```typescript
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
```

Key features:
- Validates input to ensure non-empty todos
- Generates unique IDs using timestamp
- Immutably updates state using the functional form of `setState`

### Toggling Todo Status

```typescript
const toggleTodo = useCallback((id: string) => {
  setTodos((prevTodos) =>
    prevTodos.map((todo) =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    )
  );
}, []);
```

Key features:
- Uses immutable update pattern via map
- Preserves all other todo properties when updating

### Deleting Todos

```typescript
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
```

Key features:
- Coordinates deletion with animations
- Uses setTimeout to delay actual removal until animation completes
- Manages cleanup to prevent memory leaks

### Clearing Completed Todos

```typescript
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
```

Key features:
- Batch processes all completed todos
- Coordinates with animation system for smooth visual transitions
- Ensures all animations start simultaneously

### Derived State

The context calculates derived state values that are provided to components:

```typescript
const activeTodoCount = todos.filter((todo) => !todo.completed).length;
const completedTodoCount = todos.length - activeTodoCount;
```

These derived values are computed each time the component renders, ensuring they stay in sync with the primary state.

## Context Provider

The TodoProvider component wraps the application and provides the state and operations to all child components:

```typescript
export function TodoProvider({ children }: { children: React.ReactNode }) {
  // State and methods defined here
  
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
```

## Context Consumer Hook

For convenient access to the context, a custom hook is provided:

```typescript
export function useTodoContext() {
  const context = useContext(TodoContext);
  if (context === undefined) {
    throw new Error('useTodoContext must be used within a TodoProvider');
  }
  return context;
}
```

Key features:
- Provides a type-safe way to access the context
- Includes error handling to catch usage outside of a provider
- Simplifies component code by abstracting context access

## Optimizations

Several optimizations are employed in the state management:

1. **`useCallback`** for Memoization: All state operation functions are wrapped in `useCallback` to prevent unnecessary re-renders
2. **Function Updates**: State updates use the functional form (e.g., `setPrevState => ...`) to ensure updates are based on the latest state
3. **Cleanup on Unmount**: A cleanup function is provided in `useEffect` to clear any pending timeouts
4. **Immutable Updates**: All state updates follow immutable patterns to optimize React's reconciliation

## Benefits of This Approach

1. **Simplified State Management**: No need for external libraries
2. **Centralized Logic**: All todo-related operations are in one place
3. **Type Safety**: TypeScript ensures correct usage of the context
4. **Performance**: Optimizations ensure efficient updates and renders
5. **Animation Coordination**: State management is tightly integrated with the animation system

## Potential Future Enhancements

1. **Persistence**: Add local storage integration to persist todos between sessions
2. **Undo/Redo**: Implement history tracking for undo/redo functionality
3. **Performance Optimization**: Add memoization for larger lists using React.memo
4. **State Splitting**: Split context into smaller contexts if the application grows 