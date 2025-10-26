# React Developer Challenge - Solutions Guide

This document contains solutions for all challenges. **DO NOT SHARE WITH CANDIDATES!**

## Level 1: React Basics

### Challenge 1: Counter Bug
**Problem:** Using regular variable instead of state
```javascript
// ❌ Wrong
let count = 0;
count = count + 1;

// ✅ Correct
const [count, setCount] = useState(0);
setCount(count + 1);
```

### Challenge 2: Event Handler Issue
**Problem:** Function is called immediately instead of being passed as reference
```javascript
// ❌ Wrong
<button onClick={handleClick('Button 1')}>

// ✅ Correct
<button onClick={() => handleClick('Button 1')}>
```

### Challenge 3: List Rendering
**Problems:**
1. Wrong conditional logic
2. Missing key prop

```javascript
// ❌ Wrong
const shouldShow = !showItems;
<li>{item}</li>

// ✅ Correct
const shouldShow = showItems;
<li key={item}>{item}</li>
```

### Challenge 4: Props Handling
**Problem:** Using wrong prop names
```javascript
// ❌ Wrong
<p>Name: {props.name}</p>
<p>Email: {props.userEmail}</p>

// ✅ Correct
<p>Name: {username}</p>
<p>Email: {email}</p>
```

### Challenge 5: Form State
**Problem:** Direct state mutation
```javascript
// ❌ Wrong
formData[name] = value;
setFormData(formData);

// ✅ Correct
setFormData({
  ...formData,
  [name]: value
});
```

---

## Level 2: React Hooks

### Challenge 1: useEffect Dependencies
**Problem:** Missing dependency array or wrong dependencies
```javascript
// ❌ Wrong
useEffect(() => {
  setResult(count * multiplier);
});

// ✅ Correct
useEffect(() => {
  setResult(count * multiplier);
}, [count, multiplier]);
```

### Challenge 2: Infinite Loop
**Problem:** `data` in dependency array causes infinite updates
```javascript
// ❌ Wrong
useEffect(() => {
  fetchData();
}, [data]);

// ✅ Correct
useEffect(() => {
  fetchData();
}, []);
```

### Challenge 3: Custom Hook
**Problems:**
1. Not using lazy initialization
2. Not handling function updates
3. Not stringifying objects

```javascript
// ❌ Wrong
const [storedValue, setStoredValue] = useState(
  localStorage.getItem(key) || initialValue
);

// ✅ Correct
const [storedValue, setStoredValue] = useState(() => {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : initialValue;
  } catch (error) {
    return initialValue;
  }
});

const setValue = (value) => {
  const valueToStore = value instanceof Function ? value(storedValue) : value;
  setStoredValue(valueToStore);
  localStorage.setItem(key, JSON.stringify(valueToStore));
};
```

### Challenge 4: useCallback Dependencies
**Problem:** Missing `multiplier` in dependencies
```javascript
// ❌ Wrong
const calculate = useCallback(() => {
  return count * multiplier;
}, [count]);

// ✅ Correct
const calculate = useCallback(() => {
  return count * multiplier;
}, [count, multiplier]);
```

### Challenge 5: Memory Leak
**Problem:** Not cleaning up interval
```javascript
// ❌ Wrong
useEffect(() => {
  if (isRunning) {
    setInterval(() => {
      setSeconds(prev => prev + 1);
    }, 1000);
  }
}, [isRunning]);

// ✅ Correct
useEffect(() => {
  if (isRunning) {
    const intervalId = setInterval(() => {
      setSeconds(prev => prev + 1);
    }, 1000);
    
    return () => clearInterval(intervalId);
  }
}, [isRunning]);
```

### Challenge 6: useRef
**Problem:** Using regular variable instead of useRef
```javascript
// ❌ Wrong
let previousValue = 0;

// ✅ Correct
const previousValue = useRef(0);
useEffect(() => {
  previousValue.current = renderCount;
});
```

---

## Level 3: State Management

### Challenge 1: Context Provider
**Problems:**
1. Not memoizing context value
2. Not providing setActiveTab in context

```javascript
// ✅ Correct
const value = useMemo(() => ({
  theme,
  toggleTheme: () => setTheme(theme === 'light' ? 'dark' : 'light')
}), [theme]);
```

### Challenge 2: Reducer Logic
**Problem:** Mutating state instead of returning new object
```javascript
// ❌ Wrong
state.count += 1;
return state;

// ✅ Correct
return {
  ...state,
  count: state.count + 1,
  history: [...state.history, state.count + 1]
};
```

### Challenge 3: State Batching
**Problem:** Using stale state values
```javascript
// ❌ Wrong
setCount(count + 1);
setDoubled(count * 2);

// ✅ Correct
setCount(prevCount => {
  const newCount = prevCount + 1;
  setDoubled(newCount * 2);
  setTripled(newCount * 3);
  return newCount;
});
```

### Challenge 4: Nested State
**Problem:** Not spreading all nested levels
```javascript
// ❌ Wrong
setUser({
  ...user,
  profile: {
    name: name
  }
});

// ✅ Correct
setUser({
  ...user,
  profile: {
    ...user.profile,
    name: name
  }
});
```

### Challenge 5: Context Performance
**Problem:** Not splitting context values, use React.memo
```javascript
// ✅ Correct approach: Split into multiple contexts
const DataStateContext = createContext();
const DataActionsContext = createContext();

// Or memoize context value
const value = useMemo(() => ({ data, loading, fetchData }), [data, loading]);
```

---

## Level 4: Performance

### Challenge 1: useMemo
**Problem:** Not memoizing expensive calculation
```javascript
// ❌ Wrong
const calculated = expensiveCalculation(count);

// ✅ Correct
const calculated = useMemo(() => expensiveCalculation(count), [count]);
```

### Challenge 2: React.memo
**Problems:**
1. Not wrapping component with React.memo
2. Recreating onClick function

```javascript
// ✅ Correct
const ExpensiveChild = memo(({ data, onClick }) => {
  // ...
});

// In parent:
const handleChildClick = useCallback(() => {
  console.log('Child clicked');
}, []);
```

### Challenge 3: Large List
**Problem:** Filtering on every render
```javascript
// ❌ Wrong
const filteredItems = items.filter(item => ...);

// ✅ Correct
const filteredItems = useMemo(() => 
  items.filter(item => item.name.toLowerCase().includes(filterText.toLowerCase())),
  [items, filterText]
);
```

### Challenge 4: Event Optimization
**Problem:** Not using useCallback for event handlers
```javascript
// ✅ Correct
const handleRemove = useCallback((id) => {
  setItems(prevItems => prevItems.filter(item => item.id !== id));
}, []);

const handleUpdate = useCallback((id) => {
  setItems(prevItems => prevItems.map(item => 
    item.id === id ? { ...item, name: `${item.name} (updated)` } : item
  ));
  setUpdateCount(prev => prev + 1);
}, []);
```

### Challenge 5: Code Splitting
**Problem:** Not using React.lazy and Suspense
```javascript
// ❌ Wrong
import HeavyComponent from './HeavyComponent';

// ✅ Correct
const HeavyComponent = lazy(() => import('./HeavyComponent'));

// In render:
<Suspense fallback={<div>Loading...</div>}>
  {showHeavy && <HeavyComponent />}
</Suspense>
```

### Challenge 6: Debouncing
**Problem:** No debouncing on search input
```javascript
// ✅ Correct
useEffect(() => {
  const timeoutId = setTimeout(() => {
    // Perform search
    console.log('Searching for:', searchTerm);
    setSearchCount(prev => prev + 1);
    const results = searchTerm ? [`Result for "${searchTerm}"`] : [];
    setSearchResults(results);
  }, 500);

  return () => clearTimeout(timeoutId);
}, [searchTerm]);
```

---

## Level 5: Advanced Patterns

### Challenge 1: Compound Components
**Problem:** Context not providing setActiveTab
```javascript
// ✅ Correct
<TabsContext.Provider value={{ activeTab, setActiveTab }}>

// In Tab component:
const { activeTab, setActiveTab } = useContext(TabsContext);
<button onClick={() => setActiveTab(index)}>
```

### Challenge 2: Render Props
**Problem:** Not passing position as object
```javascript
// ✅ Correct
{render({ x: position.x, y: position.y })}

// Or:
{render(position)}
```

### Challenge 3: HOC
**Problem:** Not forwarding props
```javascript
// ✅ Correct
return function WithLoadingComponent({ isLoading, ...props }) {
  if (isLoading) return <div>Loading...</div>;
  return <WrappedComponent {...props} />;
};

// Set display name
WithLoadingComponent.displayName = `WithLoading(${getDisplayName(WrappedComponent)})`;
```

### Challenge 4: Portal
**Problem:** Not using createPortal
```javascript
// ✅ Correct
import { createPortal } from 'react-dom';

if (!portalRoot) {
  console.error('Modal root not found');
  return null;
}

return createPortal(
  <div>{/* modal content */}</div>,
  portalRoot
);
```

### Challenge 5: Error Boundary
**Problem:** Missing getDerivedStateFromError
```javascript
// ✅ Correct
static getDerivedStateFromError(error) {
  return { hasError: true, error: error.message };
}

componentDidCatch(error, errorInfo) {
  console.log('Error caught:', error, errorInfo);
}
```

### Challenge 6: Hooks Composition
**Problem:** useToggle not returning toggle function
```javascript
// ❌ Wrong
return [value, setValue];

// ✅ Correct
const toggle = useCallback(() => {
  setValue(prev => !prev);
}, []);

return [value, toggle];
```

---

## Flag Summary

### Level 1
- FLAG_1_COUNTER_a3f8b2c1
- FLAG_1_EVENTS_7d2c9f4e
- FLAG_1_RENDERING_e8a1b6d3
- FLAG_1_PROPS_4c7e2a9f
- FLAG_1_FORM_9b3f6d2e

### Level 2
- FLAG_2_EFFECT_5d8a2c7f
- FLAG_2_LOOP_3f7b9e4a
- FLAG_2_HOOK_8e2d5a3c
- FLAG_2_CALLBACK_6a9c4f2e
- FLAG_2_MEMORY_2c8f5d3a
- FLAG_2_REF_9d4b7e2a

### Level 3
- FLAG_3_CONTEXT_7e4a9c2f
- FLAG_3_REDUCER_3d8f2a6c
- FLAG_3_BATCH_6c2e9a4f
- FLAG_3_NESTED_4a7e2c9f
- FLAG_3_PERF_9e3c7a2d

### Level 4
- FLAG_4_MEMO_5c8e2a7f
- FLAG_4_REACTMEMO_3d7a9c2f
- FLAG_4_LISTPERF_8e4a2c9f
- FLAG_4_CALLBACK_6c3e9a2f
- FLAG_4_LAZYLOAD_7d4b2e8a
- FLAG_4_DEBOUNCE_2e8c5a7f

### Level 5
- FLAG_5_COMPOUND_8e3c7a2f
- FLAG_5_RENDERPROPS_4c9e2a7f
- FLAG_5_HOC_6d3e9a2c
- FLAG_5_PORTAL_7e4a2c9f
- FLAG_5_ERRORBOUNDARY_3d8c5a2f
- FLAG_5_HOOKCOMP_9e2c7a4f

---

## Evaluation Criteria

### Time-based Scoring
- **45 minutes or less**: Senior level
- **60-90 minutes**: Mid-senior level
- **90-120 minutes**: Mid level
- **120+ minutes**: Junior-mid level

### Completion-based Scoring
- **100% (all 27 flags)**: Expert
- **80-99% (21-26 flags)**: Senior
- **60-79% (16-20 flags)**: Mid-Senior
- **40-59% (11-15 flags)**: Mid
- **< 40%**: Junior

### Quality Assessment
Evaluate the candidate on:
1. Code quality and best practices
2. Understanding of React concepts
3. Problem-solving approach
4. Debugging skills
5. Performance awareness
6. Knowledge of advanced patterns

---

## Common Mistakes to Watch For

1. **Not reading error messages**: Many candidates ignore console warnings
2. **Skipping React DevTools**: Not using debugging tools
3. **Overthinking simple bugs**: Looking for complex solutions to simple problems
4. **Ignoring test files**: Not running tests to verify solutions
5. **Not understanding dependencies**: Especially in useEffect and useCallback
6. **Mutation instead of immutability**: Direct state mutations
7. **Performance anti-patterns**: Not understanding when to optimize
8. **Context overuse**: Using context for everything instead of props

---

## Post-Challenge Discussion Topics

Use these to assess deeper understanding:

1. **React 18 Features**: Concurrent rendering, automatic batching, transitions
2. **Server Components**: When and why to use them
3. **State Management**: When to use Context vs Redux vs Zustand
4. **Performance**: Critical rendering path, code splitting strategies
5. **Testing**: Unit vs integration vs E2E testing strategies
6. **TypeScript**: Type safety benefits in React
7. **Accessibility**: ARIA labels, keyboard navigation
8. **Security**: XSS prevention, sanitization

