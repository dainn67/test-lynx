# Data Flow

This document explains how data flows through the Todo App, from user interactions to state updates and UI rendering.

## Overview

The Todo App follows a unidirectional data flow pattern, where:

1. User interactions trigger events
2. Events invoke context methods
3. Context methods update the state
4. Updated state flows back to components
5. Components re-render with the new state

This pattern ensures predictable behavior and makes the application easier to debug and maintain.

## Data Flow Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│                                                                 │
│                          TodoContext                            │
│                                                                 │
│  ┌───────────┐     ┌────────────┐     ┌────────────────────┐   │
│  │           │     │            │     │                    │   │
│  │   State   │     │  Methods   │     │  Derived Values    │   │
│  │           │     │            │     │                    │   │
│  │  - todos  │     │ - addTodo  │     │ - activeTodoCount  │   │
│  │  - animatingIds │ - toggleTodo │     │ - completedTodoCount │   │
│  │           │     │ - deleteTodo │     │                    │   │
│  │           │     │ - clearCompleted │ │                    │   │
│  └───────────┘     └────────────┘     └────────────────────┘   │
│           ▲                 ▲                    │              │
└─────────────────────────────────────────────────────────────────┘
            │                 │                    │
            │                 │                    │
            │                 │                    ▼
┌───────────────┐    ┌─────────────────┐   ┌─────────────────────┐
│               │    │                 │   │                     │
│   TodoInput   │    │    TodoList     │   │     TodoFooter      │
│               │    │                 │   │                     │
│ User enters   │    │ User toggles or │   │ User clicks         │
│ task & clicks │    │ deletes todos   │   │ "Clear completed"   │
│ "Add" button  │    │                 │   │                     │
└───────────────┘    └─────────────────┘   └─────────────────────┘
```

## Data Flow Steps in Detail

### 1. Initial State

When the application first loads, the TodoProvider initializes the state:

```typescript
const [todos, setTodos] = useState<TodoItem[]>([]);
const [animatingIds, setAnimatingIds] = useState<string[]>([]);
```

### 2. Components Consume Context

Each component uses the `useTodoContext` hook to access the state and methods:

```typescript
// In TodoList.tsx
const { todos, toggleTodo, deleteTodo, animatingIds } = useTodoContext();

// In TodoInput.tsx
const { addTodo } = useTodoContext();

// In TodoFooter.tsx
const { activeTodoCount, completedTodoCount, clearCompleted } = useTodoContext();
```

### 3. User Interaction Triggers Events

#### Adding a Todo

1. User enters text in the input field
2. User clicks the "Add" button or presses Enter
3. The `handleAddTodo` function is called
4. The function checks if the input is valid
5. If valid, it calls the `addTodo` method from context
6. It also clears the input field and triggers the button animation

```typescript
// In TodoInput.tsx
const handleAddTodo = useCallback(() => {
  if (inputText.trim()) {
    addTodo(inputText);
    setInputText('');
    animateButton();
  }
}, [inputText, addTodo, animateButton]);
```

#### Toggling a Todo

1. User clicks the checkbox on a todo item
2. The `toggleTodo` function is called with the todo's ID
3. The function updates the todo's completed status in the context

```typescript
// In TodoList.tsx
<view
  className={`TodoCheckbox ${todo.completed ? 'TodoCheckbox--checked' : ''}`}
  bindtap={() => toggleTodo(todo.id)}
>
  {todo.completed && <text className="TodoCheckmark">✓</text>}
</view>
```

#### Deleting a Todo

1. User clicks the delete button on a todo item
2. The `handleDeleteTodo` function is called with the todo's ID
3. The function calls the `deleteTodo` method from context
4. The deletion process includes animation coordination

```typescript
// In TodoList.tsx
const handleDeleteTodo = useCallback((id: string) => {
  deleteTodo(id);
}, [deleteTodo]);
```

#### Clearing Completed Todos

1. User clicks the "Clear completed" button
2. The `handleClearCompleted` function is called
3. The function calls the `clearCompleted` method from context

```typescript
// In TodoFooter.tsx
const handleClearCompleted = useCallback(() => {
  clearCompleted();
}, [clearCompleted]);
```

### 4. Context Methods Update State

#### Adding a Todo

```typescript
// In TodoContext.tsx
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

#### Toggling a Todo

```typescript
// In TodoContext.tsx
const toggleTodo = useCallback((id: string) => {
  setTodos((prevTodos) =>
    prevTodos.map((todo) =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    )
  );
}, []);
```

#### Deleting a Todo

```typescript
// In TodoContext.tsx
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

#### Clearing Completed Todos

```typescript
// In TodoContext.tsx
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

### 5. Derived State Calculation

The context also calculates derived state values based on the primary state:

```typescript
// In TodoContext.tsx
const activeTodoCount = todos.filter((todo) => !todo.completed).length;
const completedTodoCount = todos.length - activeTodoCount;
```

### 6. Re-rendering with Updated State

After the state updates, React's reconciliation process determines which components need to re-render:

- Components that consume changed values from the context will re-render
- Components that don't consume changed values won't re-render
- The `useTodoContext` hook ensures components only re-render when relevant parts of the context change

## Animation Data Flow

The app includes a special data flow for animations:

1. When a todo is deleted or completed todos are cleared, IDs are added to the `animatingIds` array
2. The TodoList component applies the exit animation class based on whether a todo's ID is in the `animatingIds` array
3. After a timeout matching the animation duration, the actual state change occurs (removing the todo)
4. The ID is then removed from the `animatingIds` array

This coordination ensures smooth animations before actual state changes.

## Performance Considerations

Several optimizations are made to ensure efficient data flow:

1. **Use of `useCallback`**: All event handlers and context methods are memoized with `useCallback` to prevent unnecessary re-renders
2. **Function Form of `setState`**: State updates use the function form (`prevState => newState`) to ensure they're based on the latest state
3. **Cleanup**: Animation timeouts are properly cleaned up to prevent memory leaks

## Data Flow Benefits

This unidirectional data flow pattern provides several benefits:

1. **Predictability**: The flow of data is clear and consistent
2. **Debugging**: It's easier to track where state changes occur
3. **Separation of Concerns**: UI components focus on rendering while context handles business logic
4. **Reusability**: Components can be reused in different parts of the application
5. **Testability**: Components and context can be tested in isolation

## Future Data Flow Enhancements

Potential improvements to the data flow include:

1. **Data Persistence**: Adding local storage integration to persist data between sessions
2. **Optimistic Updates**: Implementing optimistic UI updates for better perceived performance
3. **Immutable Data Structures**: Using immutable data libraries for more efficient state management
4. **Middleware Pattern**: Adding middleware for cross-cutting concerns like logging or analytics 