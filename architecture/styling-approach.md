# Styling Approach

This document explains the styling methodology used in the Todo App, detailing the CSS structure, naming conventions, and responsive design approach.

## Overview

The Todo App uses a traditional CSS approach with class-based styling. Styles are organized in a single CSS file (`TodoApp.css`) that contains all the necessary styles for the Todo components. The styling approach emphasizes clarity, maintainability, and a clean visual design.

## CSS Structure

The CSS is structured into logical sections that correspond to different components and UI elements:

```css
/* Base styles */
/* Header styles */
/* Input container styles */
/* Todo list styles */
/* Animation keyframes */
/* Footer styles */
```

This organization makes it easy to locate and modify styles for specific parts of the application.

## Naming Conventions

The application follows a clear naming convention for CSS classes:

1. **Component-First Naming**: Classes are prefixed with the component name (e.g., `TodoItem`, `TodoFooter`)
2. **BEM-Like Modifiers**: The double-dash (`--`) notation is used for state variations (e.g., `TodoCheckbox--checked`)
3. **Descriptive Names**: Class names clearly describe the purpose of the element (e.g., `TodoClearButton`, `TodoEmptyMessage`)

Examples:

```css
.TodoList { /* Styles for the list container */ }
.TodoItem { /* Styles for each item */ }
.TodoCheckbox { /* Styles for the checkbox */ }
.TodoCheckbox--checked { /* Styles for the checked state */ }
```

This naming approach makes the CSS more readable and helps prevent naming collisions.

## Layout Techniques

The application uses several modern CSS layout techniques:

### Flexbox

Flexbox is used extensively for creating flexible layouts:

```css
.TodoApp {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100vh;
  padding: calc(24px + env(safe-area-inset-top)) calc(24px + env(safe-area-inset-right)) calc(24px + env(safe-area-inset-bottom)) calc(24px + env(safe-area-inset-left));
}

.TodoHeader {
  display: flex;
  align-items: center;
  margin-bottom: 24px;
  flex-shrink: 0;
}

.TodoFooter {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  flex-shrink: 0;
}
```

### Responsive Design

The application uses a flexible layout that adapts to different screen sizes:

```css
.TodoApp {
  width: 100%;
  height: 100vh;
}

.TodoList {
  flex: 1;
  min-height: 0; /* Important for proper flex scrolling */
}
```

The app also uses environmental variables for safe area insets, ensuring compatibility with devices that have notches or rounded corners:

```css
.TodoApp {
  padding: calc(24px + env(safe-area-inset-top)) calc(24px + env(safe-area-inset-right)) calc(24px + env(safe-area-inset-bottom)) calc(24px + env(safe-area-inset-left));
}
```

## Visual Design Elements

The application employs several visual design techniques to create a polished UI:

### Colors

The app uses a simple but effective color palette:

- Primary blue (`#4a6ee0`) for actions and highlighted elements
- White backgrounds for contrast
- Gray shades for text and subtle elements
- Gradient background (`linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)`)

### Shadows and Depth

Box shadows create a sense of depth and hierarchy:

```css
.TodoInputContainer {
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.TodoList {
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.TodoFooter {
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.TodoAddButton:hover {
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}
```

### Spacing and Sizing

The app uses consistent spacing and sizing:

- Standard padding for containers (16px)
- Consistent margins between components (24px)
- Appropriate sizing for interactive elements (buttons at 48px height for good touch targets)

### Typography

Typography is kept simple and readable:

```css
.TodoTitle {
  font-size: 28px;
  font-weight: bold;
  color: #333;
}

.TodoText {
  font-size: 16px;
  color: #333;
}

.TodoCount {
  font-size: 14px;
  color: #666;
}
```

## Animations and Transitions

The application uses CSS animations and transitions to enhance the user experience:

### Keyframe Animations

```css
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes fadeOut {
  from {
    opacity: 1;
    transform: translateY(0);
  }
  to {
    opacity: 0;
    transform: translateY(-20px);
  }
}

@keyframes pulse {
  0% {
    transform: scale(1);
    box-shadow: 0 0 0 0 rgba(74, 110, 224, 0.4);
  }
  50% {
    transform: scale(1.05);
    box-shadow: 0 0 0 10px rgba(74, 110, 224, 0);
  }
  100% {
    transform: scale(1);
    box-shadow: 0 0 0 0 rgba(74, 110, 224, 0);
  }
}
```

### Transitions

```css
.TodoAddButton {
  transition: all 0.2s ease;
}

.TodoAddButton text {
  transition: transform 0.2s ease;
}

.TodoItem {
  transition: opacity 0.3s ease, transform 0.3s ease;
}
```

## Interaction States

The application handles different interaction states:

### Hover States

```css
.TodoAddButton:hover {
  background-color: #3a5bc7;
  transform: translateY(-2px) scale(1.03);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.TodoClearButton:hover {
  background-color: rgba(74, 110, 224, 0.1);
}
```

### Active States

```css
.TodoAddButton:active {
  background-color: #2a4bb7;
  transform: translateY(1px) scale(0.97);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}
```

### Completed States

```css
.TodoCheckbox--checked {
  background-color: #4a6ee0;
  border-color: #4a6ee0;
}

.TodoText--completed {
  text-decoration: line-through;
  color: #999;
}
```

## Conditional Styling

The application uses conditional styling to show/hide elements based on state:

```jsx
<view 
  className={`TodoCheckbox ${todo.completed ? 'TodoCheckbox--checked' : ''}`}
  bindtap={() => toggleTodo(todo.id)}
>
  {todo.completed && <text className="TodoCheckmark">✓</text>}
</view>

<view 
  className="TodoClearButton" 
  style={{ visibility: completedTodoCount > 0 ? 'visible' : 'hidden' }} 
  bindtap={handleClearCompleted}
>
  <text>Clear completed</text>
</view>
```

## Best Practices

The styling approach in the Todo App follows several best practices:

1. **Separation of Concerns**: CSS is kept separate from component logic
2. **Consistent Naming**: Clear and consistent naming conventions
3. **Modular Styling**: Styles are organized by component
4. **Performance Optimization**: Use of efficient CSS properties for animations
5. **Responsive Design**: Flexible layouts that adapt to different screen sizes
6. **Visual Hierarchy**: Clear visual hierarchy through spacing, sizing, and shadows
7. **Interactive Feedback**: Visual feedback for user interactions

## Potential Enhancements

Future styling enhancements could include:

1. **CSS Modules**: Implement CSS Modules for better style encapsulation
2. **CSS Variables**: Use CSS custom properties for more maintainable theming
3. **Dark Mode**: Add support for light/dark mode with a theme toggle
4. **Accessibility Improvements**: Enhanced focus states and keyboard navigation
5. **Media Queries**: More explicit breakpoints for different device sizes
6. **Animation Preferences**: Respect user preferences for reduced motion 