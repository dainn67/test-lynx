# Animations

This document details the animation implementation in the Todo App, explaining how animations are coordinated between CSS and JavaScript.

## Animation Overview

The Todo App features several types of animations to enhance the user experience:

1. **Todo Item Entry Animation**: Fade-in and slide-down effect when new todos are added
2. **Todo Item Exit Animation**: Fade-out and slide-up effect when todos are removed
3. **Add Button Animations**: 
   - Hover effects (scale up, shadow, color change)
   - Active state (scale down, shadow adjustment)
   - Pulse effect when clicked
   - Text scaling animation

## Animation Implementation Approach

The animations in the Todo App are implemented using a combination of:

1. **CSS for styling and keyframes definitions**
2. **React state to track animation states**
3. **JavaScript for coordination and timing**

This approach provides a smooth user experience while maintaining clean separation between presentation and logic.

## CSS Animation Definitions

The animations are defined in the `TodoApp.css` file using CSS keyframes and transitions.

### Todo Item Animations

```css
/* Animation keyframes */
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

.TodoItem {
  display: flex;
  align-items: center;
  padding: 16px 0;
  border-bottom: 1px solid #eee;
  animation: fadeIn 0.3s ease-out;
  transition: opacity 0.3s ease, transform 0.3s ease;
}

.TodoItem-exit {
  animation: fadeOut 0.3s ease-out;
}
```

### Add Button Animations

```css
.TodoAddButton {
  /* Base styling */
  transition: all 0.2s ease;
  position: relative;
  overflow: hidden;
}

.TodoAddButton:hover {
  background-color: #3a5bc7;
  transform: translateY(-2px) scale(1.03);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.TodoAddButton:active {
  background-color: #2a4bb7;
  transform: translateY(1px) scale(0.97);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
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

.TodoAddButton-pulse {
  animation: pulse 0.4s ease-in-out;
}

/* Add button text animation */
.TodoAddButton text {
  transition: transform 0.2s ease;
}

.TodoAddButton:hover text {
  transform: scale(1.1);
}

.TodoAddButton:active text {
  transform: scale(0.95);
}
```

## JavaScript Animation Coordination

The animations are coordinated through React state and context. Here's how different animations are managed:

### Todo Item Entry

New todos automatically receive the entry animation through the CSS class:

```css
.TodoItem {
  animation: fadeIn 0.3s ease-out;
}
```

No additional JavaScript is needed since the animation applies to all new elements with the `.TodoItem` class.

### Todo Item Exit

Exit animations are more complex since we need to wait for the animation to complete before removing the element from the DOM. This is handled in the `TodoContext`:

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

The component uses this state to apply the exit animation class:

```tsx
// In TodoList.tsx
<view 
  key={todo.id} 
  className={`TodoItem ${animatingIds.includes(todo.id) ? 'TodoItem-exit' : ''}`}
>
  {/* Todo item content */}
</view>
```

### Add Button Animation

The add button animation is managed in the TodoInput component:

```typescript
// In TodoInput.tsx
const [isPulsing, setIsPulsing] = useState(false);

const animateButton = useCallback(() => {
  setIsPulsing(true);
  setTimeout(() => setIsPulsing(false), 400); // Match animation duration in CSS
}, []);

const handleAddTodo = useCallback(() => {
  if (inputText.trim()) {
    addTodo(inputText);
    setInputText('');
    animateButton();
  }
}, [inputText, addTodo, animateButton]);
```

The component applies the animation class based on state:

```tsx
<view 
  className={`TodoAddButton ${isPulsing ? 'TodoAddButton-pulse' : ''}`} 
  bindtap={handleAddTodo}
>
  <text>Add</text>
</view>
```

## Animation Cleanup

To prevent memory leaks, the application properly cleans up animation timeouts:

```typescript
// In TodoContext.tsx
useEffect(() => {
  return () => {
    Object.values(timeoutRefs.current).forEach(clearTimeout);
  };
}, []);
```

## Batch Animation Processing

For operations that affect multiple items (like clearing completed todos), the animations are batch processed:

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

## Animation Design Principles

The animations in the Todo App follow several key principles:

1. **Subtlety**: Animations are subtle and enhance rather than distract from the user experience
2. **Consistency**: Similar actions have similar animations (e.g., all removals fade out)
3. **Performance**: Animations use CSS properties that are optimized for performance (transform, opacity)
4. **Feedback**: Animations provide visual feedback for user actions
5. **Timing**: Animation durations are consistent and appropriate (300-400ms)

## Browser Compatibility

The animations use standard CSS properties that are widely supported in modern browsers. The application doesn't rely on experimental features, ensuring consistent behavior across platforms.

## Animation Accessibility

For users who prefer reduced motion, the application could be enhanced with a media query:

```css
@media (prefers-reduced-motion: reduce) {
  .TodoItem, .TodoAddButton-pulse, .TodoAddButton {
    animation: none !important;
    transition: none !important;
  }
}
```

This feature is recommended for future implementation.

## Future Animation Enhancements

Potential enhancements to the animation system include:

1. **Staggered Animations**: Add staggered animations for lists of items
2. **Gesture-Based Animations**: Add swipe-to-delete with gesture tracking
3. **Reduced Motion Support**: Add support for the prefers-reduced-motion media query
4. **More Interactive Feedback**: Add success/error animations for operations
5. **Animation Customization**: Allow users to choose animation styles or turn them off 