# Component Structure

This document details the component hierarchy and the purpose of each component in the Todo App.

## Component Hierarchy

```
TodoApp
├── TodoProvider (Context)
│   ├── TodoInput
│   ├── TodoList
│   │   └── TodoItem (rendered for each todo)
│   └── TodoFooter
```

## Component Details

### TodoApp (`src/TodoApp.tsx`)

The root component that serves as the entry point for the application.

**Responsibilities:**
- Initializes the application
- Provides the layout structure
- Wraps all components in the TodoProvider context
- Renders the header, TodoInput, TodoList, and TodoFooter components

**Key Features:**
- Uses a simple useEffect for initialization logging
- Provides the basic layout structure for the entire application

**Example:**
```tsx
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
```

### TodoProvider (`src/TodoContext.tsx`)

The context provider that manages the application state and business logic.

**Responsibilities:**
- Manages todo items state
- Provides CRUD operations for todos
- Handles animation states
- Calculates statistics (active and completed counts)

**Key Methods:**
- `addTodo`: Creates a new todo item
- `toggleTodo`: Toggles the completed status of a todo
- `deleteTodo`: Removes a todo with animation
- `clearCompleted`: Removes all completed todos with animation

**Example:**
```tsx
export function TodoProvider({ children }: { children: React.ReactNode }) {
  const [todos, setTodos] = useState<TodoItem[]>([]);
  const [animatingIds, setAnimatingIds] = useState<string[]>([]);
  // ... implementation of methods ...
  
  return <TodoContext.Provider value={value}>{children}</TodoContext.Provider>;
}
```

### TodoInput (`src/components/TodoInput.tsx`)

Component for creating new todo items.

**Responsibilities:**
- Provides an input field for entering todo text
- Handles the "Add" button action
- Manages local input state
- Animates the add button when clicked

**Key Features:**
- Handles Enter key press for adding todos
- Provides visual feedback through button animations
- Clears input after adding a todo

**Example:**
```tsx
export function TodoInput() {
  const [inputText, setInputText] = useState('');
  const [isPulsing, setIsPulsing] = useState(false);
  const { addTodo } = useTodoContext();
  
  // ... implementation of event handlers ...
  
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
```

### TodoList (`src/components/TodoList.tsx`)

Component that displays all todo items.

**Responsibilities:**
- Renders the list of todos
- Handles interactions with individual todos
- Coordinates with context for todo operations
- Applies animations when items are removed

**Key Features:**
- Maps through todos array to render each item
- Shows an empty state message when no todos exist
- Applies animation classes based on animation state

**Example:**
```tsx
export function TodoList() {
  const { todos, toggleTodo, deleteTodo, animatingIds } = useTodoContext();

  if (todos.length === 0) {
    return (
      <view className="TodoList">
        <text className="TodoEmptyMessage">No tasks yet. Add one above!</text>
      </view>
    );
  }

  return (
    <view className="TodoList">
      {todos.map((todo) => (
        <view 
          key={todo.id} 
          className={`TodoItem ${animatingIds.includes(todo.id) ? 'TodoItem-exit' : ''}`}
        >
          {/* Todo item content */}
        </view>
      ))}
    </view>
  );
}
```

### TodoFooter (`src/components/TodoFooter.tsx`)

Component that displays statistics and provides bulk actions.

**Responsibilities:**
- Shows count of remaining todos
- Provides button to clear completed todos
- Conditionally renders clear button based on completed count

**Key Features:**
- Displays proper pluralization of "item"/"items" text
- Only shows the clear completed button when completed todos exist

**Example:**
```tsx
export function TodoFooter() {
  const { activeTodoCount, completedTodoCount, clearCompleted } = useTodoContext();

  return (
    <view className="TodoFooter">
      <text className="TodoCount">
        {activeTodoCount} {activeTodoCount === 1 ? 'item' : 'items'} left
      </text>
      
      <view 
        className="TodoClearButton" 
        style={{ visibility: completedTodoCount > 0 ? 'visible' : 'hidden' }} 
        bindtap={clearCompleted}
      >
        <text>Clear completed</text>
      </view>
    </view>
  );
}
```

## Component Interaction

The components interact primarily through the `TodoContext`. This context-based approach provides several advantages:

1. **Centralized State Management**: All components access the same state, ensuring consistency
2. **Reduced Prop Drilling**: Components can directly access the context without passing props through intermediaries
3. **Separation of Concerns**: UI components focus on presentation while context handles business logic
4. **Easier Testing**: Components can be tested in isolation by mocking the context

The interaction flow is as follows:

1. User interacts with a component (e.g., clicks "Add" in TodoInput)
2. Component calls the appropriate context method (e.g., `addTodo`)
3. Context updates the state
4. All components that consume the updated context data re-render 