# Folder Structure

This document explains the organization of files and directories in the Todo App.

## Overview

The Todo App follows a simple and logical folder structure that separates components, utilities, assets, and styles. The structure is designed to be intuitive and scalable, making it easy to navigate and maintain the codebase.

## Directory Structure

```
src/
│
├── assets/                  # Static assets
│   ├── lynx-logo.png
│   ├── react-logo.png
│   └── arrow.png
│
├── components/              # Reusable UI components
│   ├── TodoInput.tsx        # Input component for adding new todos
│   ├── TodoList.tsx         # Component for displaying the list of todos
│   └── TodoFooter.tsx       # Footer with stats and actions
│
├── utils/                   # Utility functions and helpers
│   └── todoUtils.ts         # Utilities for formatting, filtering, and sorting todos
│
├── TodoContext.tsx          # Context for state management
├── TodoApp.tsx              # Main application component
├── TodoApp.css              # Styles for the todo application
├── App.tsx                  # Legacy app component
├── App.css                  # Styles for the legacy app
├── index.tsx                # Entry point
└── rspeedy-env.d.ts         # Type declarations for the Lynx environment
```

## Key Files and Their Purposes

### Entry Point

- **`index.tsx`**: The application entry point that renders the root component.

```typescript
import { root } from '@lynx-js/react'
import { TodoApp } from './TodoApp.js'
root.render(<TodoApp />)
```

### Application Components

- **`TodoApp.tsx`**: The main application component that organizes the overall layout.

```typescript
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

- **`TodoContext.tsx`**: Provides state management and business logic for the application.

```typescript
export function TodoProvider({ children }: { children: React.ReactNode }) {
  // State and methods
  return <TodoContext.Provider value={value}>{children}</TodoContext.Provider>;
}

export function useTodoContext() {
  const context = useContext(TodoContext);
  if (context === undefined) {
    throw new Error('useTodoContext must be used within a TodoProvider');
  }
  return context;
}
```

### Component Directory

The `components/` directory contains reusable UI components:

- **`TodoInput.tsx`**: Component for adding new todos.
- **`TodoList.tsx`**: Component for displaying the list of todos.
- **`TodoFooter.tsx`**: Component for displaying statistics and actions.

Each component is focused on a specific part of the UI, promoting separation of concerns and reusability.

### Utilities Directory

The `utils/` directory contains helper functions:

- **`todoUtils.ts`**: Contains utility functions for formatting dates, filtering, and sorting todos.

```typescript
export function formatDate(date: Date): string {
  // Implementation
}

export function filterTodos(todos: TodoItem[], filter: FilterType): TodoItem[] {
  // Implementation
}

export function sortTodos(todos: TodoItem[], sortBy: 'created' | 'alphabetical'): TodoItem[] {
  // Implementation
}
```

### Assets Directory

The `assets/` directory contains static resources:

- **`lynx-logo.png`**: The Lynx framework logo.
- **`react-logo.png`**: The React framework logo.
- **`arrow.png`**: An arrow image used in the UI.

### Style Files

- **`TodoApp.css`**: Contains styles for the Todo application components.
- **`App.css`**: Contains styles for the legacy application.

The CSS files use class-based styling with a clear naming convention.

### Type Declarations

- **`rspeedy-env.d.ts`**: Contains type declarations for the Lynx environment.

```typescript
/// <reference types="@lynx-js/rspeedy/client" />
```

## Organizational Principles

The folder structure follows these principles:

1. **Feature-Based Organization**: Files are organized by feature rather than by file type.
2. **Component Isolation**: Each component is in its own file with a clear responsibility.
3. **Context-Based State Management**: State management is centralized in the context file.
4. **Clear Separation of Concerns**: UI components, business logic, and utilities are separated.
5. **Flat Structure for Small Apps**: The structure is intentionally flat, which works well for small to medium-sized applications.

## Import Patterns

The application uses relative imports for local files:

```typescript
import { useTodoContext } from '../TodoContext';
import { TodoItem } from '../TodoContext';
```

And package imports for external dependencies:

```typescript
import { createContext, useCallback, useContext, useState } from '@lynx-js/react';
```

## Scalability Considerations

While the current structure works well for the size of the application, here are considerations for scaling:

1. **Feature Folders**: As the application grows, consider organizing by feature rather than component type.
2. **Atomic Design**: Consider adopting atomic design principles (atoms, molecules, organisms) for larger component libraries.
3. **State Management Splitting**: Split the context into multiple contexts if the state becomes too complex.
4. **Code Splitting**: Implement code splitting for larger applications to improve load times.

## Best Practices Demonstrated

The folder structure demonstrates several best practices:

1. **Clear Naming Conventions**: Files and directories have descriptive, consistent names.
2. **Single Responsibility Principle**: Each file has a clear, single responsibility.
3. **Logical Grouping**: Related files are grouped together.
4. **Flat Hierarchy**: Avoids deep nesting which can make navigation difficult.
5. **Isolation of Concerns**: Separates UI, business logic, and utilities. 