# API Documentation

This document provides detailed documentation for the utility functions and data types used in the Todo App.

## TodoItem Interface

The core data type in the application is the `TodoItem` interface defined in `TodoContext.tsx`:

```typescript
export interface TodoItem {
  /**
   * Unique identifier for the todo item, generated using timestamp
   */
  id: string;
  
  /**
   * Text content of the todo item
   */
  text: string;
  
  /**
   * Boolean flag indicating whether the todo is completed
   */
  completed: boolean;
  
  /**
   * Date when the todo was created
   */
  createdAt: Date;
}
```

## TodoContext API

The `TodoContext` provides the following interface:

```typescript
interface TodoContextType {
  /**
   * Array of all todo items
   */
  todos: TodoItem[];
  
  /**
   * Adds a new todo item with the given text
   * @param text - The text content for the new todo
   */
  addTodo: (text: string) => void;
  
  /**
   * Toggles the completed status of a todo item
   * @param id - The ID of the todo to toggle
   */
  toggleTodo: (id: string) => void;
  
  /**
   * Deletes a todo item with animation
   * @param id - The ID of the todo to delete
   */
  deleteTodo: (id: string) => void;
  
  /**
   * Clears all completed todos with animation
   */
  clearCompleted: () => void;
  
  /**
   * Count of active (uncompleted) todos
   */
  activeTodoCount: number;
  
  /**
   * Count of completed todos
   */
  completedTodoCount: number;
  
  /**
   * IDs of todos that are currently animating
   */
  animatingIds: string[];
}
```

### TodoContext Hooks

```typescript
/**
 * Custom hook to access the TodoContext
 * @returns The TodoContext value
 * @throws Error if used outside of TodoProvider
 */
export function useTodoContext(): TodoContextType;
```

## Utility Functions

The application provides several utility functions in `utils/todoUtils.ts`:

### Date Formatting

```typescript
/**
 * Formats a Date object to a readable string
 * @param date - The Date object to format
 * @returns Formatted date string (e.g., "Apr 7, 10:30 AM")
 */
export function formatDate(date: Date): string;
```

Example usage:
```typescript
const todo = { 
  id: '1', 
  text: 'Learn React', 
  completed: false, 
  createdAt: new Date()
};
const formattedDate = formatDate(todo.createdAt);
// Result: "Apr 7, 10:30 AM"
```

### Todo Filtering

```typescript
/**
 * Filter type for filtering todos
 */
export type FilterType = 'all' | 'active' | 'completed';

/**
 * Filters todos based on their completed status
 * @param todos - Array of todos to filter
 * @param filter - The filter to apply
 * @returns Filtered array of todos
 */
export function filterTodos(todos: TodoItem[], filter: FilterType): TodoItem[];
```

Example usage:
```typescript
const todos = [
  { id: '1', text: 'Learn React', completed: false, createdAt: new Date() },
  { id: '2', text: 'Build Todo App', completed: true, createdAt: new Date() }
];

const activeTodos = filterTodos(todos, 'active');
// Result: [{ id: '1', text: 'Learn React', completed: false, createdAt: Date }]

const completedTodos = filterTodos(todos, 'completed');
// Result: [{ id: '2', text: 'Build Todo App', completed: true, createdAt: Date }]

const allTodos = filterTodos(todos, 'all');
// Result: [same as todos array]
```

### Todo Sorting

```typescript
/**
 * Sorts todos based on creation date or alphabetically
 * @param todos - Array of todos to sort
 * @param sortBy - Sorting criteria ('created' or 'alphabetical')
 * @returns Sorted array of todos
 */
export function sortTodos(todos: TodoItem[], sortBy: 'created' | 'alphabetical'): TodoItem[];
```

Example usage:
```typescript
const todos = [
  { id: '1', text: 'Learn React', completed: false, createdAt: new Date(2023, 3, 1) },
  { id: '2', text: 'Build Todo App', completed: true, createdAt: new Date(2023, 3, 2) }
];

const sortedByDate = sortTodos(todos, 'created');
// Result: [newest first] most recent creation date first

const sortedAlphabetically = sortTodos(todos, 'alphabetical');
// Result: [sorted by text] alphabetical order by text
```

## Animation Helpers

While not explicitly exported as utility functions, the Todo App implements several animation patterns that can be reused:

### Delayed Removal Pattern

```typescript
/**
 * Pattern for removing items with animation
 * @param id - ID of the item to remove
 * @param animatingIds - State array of currently animating IDs
 * @param setAnimatingIds - State setter for animating IDs
 * @param items - Array of items
 * @param setItems - State setter for items
 * @param duration - Animation duration in milliseconds
 */
function delayedRemovalPattern(
  id: string,
  animatingIds: string[],
  setAnimatingIds: React.Dispatch<React.SetStateAction<string[]>>,
  items: any[],
  setItems: React.Dispatch<React.SetStateAction<any[]>>,
  duration: number
): void {
  // Add to animating ids
  setAnimatingIds(prev => [...prev, id]);
  
  // Set a timeout to remove after animation completes
  setTimeout(() => {
    setItems(prevItems => prevItems.filter(item => item.id !== id));
    setAnimatingIds(prev => prev.filter(itemId => itemId !== id));
  }, duration);
}
```

## Error Handling

The application implements simple error handling in the context hook:

```typescript
/**
 * Ensures the TodoContext is used within a TodoProvider
 * @throws Error if context is undefined
 */
export function useTodoContext() {
  const context = useContext(TodoContext);
  if (context === undefined) {
    throw new Error('useTodoContext must be used within a TodoProvider');
  }
  return context;
}
```

## Performance Optimization Patterns

The application uses several patterns to optimize performance:

### useCallback for Event Handlers

```typescript
/**
 * Pattern for memoizing event handlers
 */
const handleEvent = useCallback(() => {
  // Event handling logic
}, [dependencies]);
```

### Function Form of setState

```typescript
/**
 * Pattern for updating state based on previous state
 */
setItems(prevItems => [...prevItems, newItem]);
```

### Cleanup for Side Effects

```typescript
/**
 * Pattern for cleaning up side effects
 */
useEffect(() => {
  // Setup code
  
  return () => {
    // Cleanup code
  };
}, [dependencies]);
```

## Integration Points

The utility functions and context API are integrated into the components through:

1. **Context Consumption**: Components use the `useTodoContext` hook to access state and methods
2. **Event Handling**: Components define event handlers that call context methods
3. **Conditional Rendering**: Components use context values for conditional rendering

## Error Handling Recommendations

When working with the APIs, follow these error handling recommendations:

1. **Validate Input**: Validate inputs before passing them to utility functions
2. **Handle Empty States**: Check for empty arrays before filtering or sorting
3. **Use try/catch**: Wrap context hook usage in try/catch blocks when necessary
4. **Default Values**: Provide default values for optional parameters

## Future API Enhancements

Potential enhancements to the API include:

1. **Persistence API**: Functions for saving and loading todos from storage
2. **Advanced Filtering**: More sophisticated filtering options
3. **Undo/Redo API**: API for undo and redo functionality
4. **Search API**: Functions for searching todos by text
5. **Batch Operations**: API for performing operations on multiple todos at once 