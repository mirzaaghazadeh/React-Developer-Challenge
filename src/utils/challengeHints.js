/**
 * Hints for each challenge
 * Provide progressive hints without giving away the full solution
 */

export const challengeHints = {
  // Level 1: React Basics
  'level1-counter': [
    '📁 File: src/challenges/level1/ReactBasicsChallenge.js | Look at how the count variable is declared on line 13',
    '📁 File: src/challenges/level1/ReactBasicsChallenge.js | React components need to re-render when data changes - regular variables won\'t trigger this',
    '📁 File: src/challenges/level1/ReactBasicsChallenge.js | Consider using useState hook instead of a regular variable (import it from React)'
  ],
  
  'level1-events': [
    '📁 File: src/challenges/level1/ReactBasicsChallenge.js | The buttons (lines 54-56) all do the same thing',
    '📁 File: src/challenges/level1/ReactBasicsChallenge.js | Check how to pass different text to each button click',
    '📁 File: src/challenges/level1/ReactBasicsChallenge.js | Use arrow functions: onClick={() => handleClick("Button 1")}'
  ],
  
  'level1-list': [
    '📁 File: src/challenges/level1/ReactBasicsChallenge.js | Check the conditional logic for shouldShow on line 73',
    '📁 File: src/challenges/level1/ReactBasicsChallenge.js | Look at the list items (line 91) - they need unique keys',
    '📁 File: src/challenges/level1/ReactBasicsChallenge.js | Each <li> child in a list should have a unique "key" prop'
  ],
  
  'level1-props': [
    '📁 File: src/challenges/level1/ReactBasicsChallenge.js | The destructured prop names (line 107) don\'t match what\'s being used in JSX',
    '📁 File: src/challenges/level1/ReactBasicsChallenge.js | Check the prop names in the JSX (lines 117-119) vs what\'s destructured',
    '📁 File: src/challenges/level1/ReactBasicsChallenge.js | Props should use the same names: username, email, age (not name, userEmail, userAge)'
  ],
  
  'level1-form': [
    '📁 File: src/challenges/level1/ReactBasicsChallenge.js | State should not be mutated directly (lines 150-151)',
    '📁 File: src/challenges/level1/ReactBasicsChallenge.js | Look at how formData is being updated in handleInputChange',
    '📁 File: src/challenges/level1/ReactBasicsChallenge.js | Use spread operator: setFormData({ ...formData, [name]: value })'
  ],

  // Level 2: React Hooks
  'level2-effect': [
    '📁 File: src/challenges/level2/ReactHooksChallenge.js | useEffect on line 17 is missing dependencies',
    '📁 File: src/challenges/level2/ReactHooksChallenge.js | Check what variables (count, multiplier) are used inside useEffect',
    '📁 File: src/challenges/level2/ReactHooksChallenge.js | Add [count, multiplier] to the dependency array on line 19'
  ],
  
  'level2-loop': [
    '📁 File: src/challenges/level2/ReactHooksChallenge.js | Setting state inside useEffect (line 47) can cause infinite loops',
    '📁 File: src/challenges/level2/ReactHooksChallenge.js | Check if there\'s a proper condition before setRandomNumber',
    '📁 File: src/challenges/level2/ReactHooksChallenge.js | Add a condition like: if (randomNumber === 0) before setState'
  ],
  
  'level2-custom': [
    '📁 File: src/challenges/level2/ReactHooksChallenge.js | Custom hooks should use the "use" prefix (line 69)',
    '📁 File: src/challenges/level2/ReactHooksChallenge.js | The hook is named fetchData but should be useFetchData',
    '📁 File: src/challenges/level2/ReactHooksChallenge.js | Return both loading state and data as an object'
  ],
  
  'level2-callback': [
    '📁 File: src/challenges/level2/ReactHooksChallenge.js | useCallback on line 140 is missing a dependency',
    '📁 File: src/challenges/level2/ReactHooksChallenge.js | Check what variables (multiplier) are used in the callback function',
    '📁 File: src/challenges/level2/ReactHooksChallenge.js | Include multiplier in the dependency array: [count, multiplier]'
  ],
  
  'level2-memory': [
    '📁 File: src/challenges/level2/ReactHooksChallenge.js | Event listeners added in useEffect (line 171) need to be cleaned up',
    '📁 File: src/challenges/level2/ReactHooksChallenge.js | useEffect can return a cleanup function',
    '📁 File: src/challenges/level2/ReactHooksChallenge.js | Return a function that calls window.removeEventListener'
  ],
  
  'level2-ref': [
    '📁 File: src/challenges/level2/ReactHooksChallenge.js | previousValue needs to persist between renders (line 208)',
    '📁 File: src/challenges/level2/ReactHooksChallenge.js | Regular variables reset on each render - import useRef',
    '📁 File: src/challenges/level2/ReactHooksChallenge.js | Use const previousValue = useRef(count) and access with .current'
  ],

  // Level 3: State Management
  'level3-context': [
    '📁 File: src/challenges/level3/StateManagementChallenge.js | The component needs Context Provider wrapping (around line 30)',
    '📁 File: src/challenges/level3/StateManagementChallenge.js | Check where ThemeProvider should be placed in the return statement',
    '📁 File: src/challenges/level3/StateManagementChallenge.js | Wrap BrokenThemeDisplay with <ThemeProvider>'
  ],
  
  'level3-reducer': [
    '📁 File: src/challenges/level3/StateManagementChallenge.js | Check the reducer\'s ADD_TODO action (around line 66)',
    '📁 File: src/challenges/level3/StateManagementChallenge.js | State should be immutable - don\'t use state.push()',
    '📁 File: src/challenges/level3/StateManagementChallenge.js | Return a new array: return [...state, action.payload]'
  ],
  
  'level3-batching': [
    '📁 File: src/challenges/level3/StateManagementChallenge.js | Multiple setState calls (lines 149-151) may batch differently',
    '📁 File: src/challenges/level3/StateManagementChallenge.js | Check how count is being updated - using current value',
    '📁 File: src/challenges/level3/StateManagementChallenge.js | Use functional updates: setCount(prev => prev + 1)'
  ],
  
  'level3-nested': [
    '📁 File: src/challenges/level3/StateManagementChallenge.js | Nested objects need to be updated immutably (line 197)',
    '📁 File: src/challenges/level3/StateManagementChallenge.js | Check how user.profile.name is being modified',
    '📁 File: src/challenges/level3/StateManagementChallenge.js | Spread both: setUser({ ...user, profile: { ...user.profile, name: newName } })'
  ],
  
  'level3-performance': [
    '📁 File: src/challenges/level3/StateManagementChallenge.js | Context value is recreated on every render (around line 260)',
    '📁 File: src/challenges/level3/StateManagementChallenge.js | This causes all consumers to re-render unnecessarily',
    '📁 File: src/challenges/level3/StateManagementChallenge.js | Memoize the context value with useMemo: useMemo(() => ({ data, setData }), [data])'
  ],

  // Level 4: Performance
  'level4-memo': [
    '📁 File: src/challenges/level4/PerformanceChallenge.js | Expensive calculations should be memoized (line 27)',
    '📁 File: src/challenges/level4/PerformanceChallenge.js | The calculation runs on every render (including when input changes)',
    '📁 File: src/challenges/level4/PerformanceChallenge.js | Wrap with useMemo: const calculated = useMemo(() => expensiveCalculation(count), [count])'
  ],
  
  'level4-reactmemo': [
    '📁 File: src/challenges/level4/PerformanceChallenge.js | The ExpensiveChild component (line 59) re-renders unnecessarily',
    '📁 File: src/challenges/level4/PerformanceChallenge.js | Wrap the component with React.memo after the function definition',
    '📁 File: src/challenges/level4/PerformanceChallenge.js | Also memoize handleChildClick (line 76) with useCallback'
  ],
  
  'level4-list': [
    '📁 File: src/challenges/level4/PerformanceChallenge.js | Filtering happens on every render (lines 112-114)',
    '📁 File: src/challenges/level4/PerformanceChallenge.js | Large arrays (10000 items) should be memoized',
    '📁 File: src/challenges/level4/PerformanceChallenge.js | Use useMemo: const filteredItems = useMemo(() => items.filter(...), [filterText])'
  ],
  
  'level4-callback': [
    '📁 File: src/challenges/level4/PerformanceChallenge.js | Event handlers are recreated on every render (lines 174, 179)',
    '📁 File: src/challenges/level4/PerformanceChallenge.js | Use useCallback to memoize functions',
    '📁 File: src/challenges/level4/PerformanceChallenge.js | Wrap both handleRemove and handleUpdate with useCallback'
  ],
  
  'level4-splitting': [
    '📁 File: src/challenges/level4/PerformanceChallenge.js | The HeavyComponent is imported eagerly (line 2)',
    '📁 File: src/challenges/level4/PerformanceChallenge.js | Use React.lazy: const HeavyComponent = lazy(() => import(...))',
    '📁 File: src/challenges/level4/PerformanceChallenge.js | Wrap with <Suspense fallback={<div>Loading...</div>}> in JSX'
  ],
  
  'level4-debounce': [
    '📁 File: src/challenges/level4/PerformanceChallenge.js | Search executes on every keystroke (line 256)',
    '📁 File: src/challenges/level4/PerformanceChallenge.js | Implement debouncing with useEffect and setTimeout',
    '📁 File: src/challenges/level4/PerformanceChallenge.js | Use cleanup function to clear timeout on each change'
  ],

  // Level 5: Advanced Patterns
  'level5-compound': [
    '📁 File: src/challenges/level5/AdvancedPatternsChallenge.js | Context is not being passed to children (around line 30)',
    '📁 File: src/challenges/level5/AdvancedPatternsChallenge.js | Create a TabContext and use createContext',
    '📁 File: src/challenges/level5/AdvancedPatternsChallenge.js | Use <TabContext.Provider value={{ activeTab, setActiveTab }}>'
  ],
  
  'level5-render': [
    '📁 File: src/challenges/level5/AdvancedPatternsChallenge.js | Check what the render prop should receive (line 96)',
    '📁 File: src/challenges/level5/AdvancedPatternsChallenge.js | Mouse position (position state) needs to be passed',
    '📁 File: src/challenges/level5/AdvancedPatternsChallenge.js | Pass an object: {this.props.render({ x: position.x, y: position.y })}'
  ],
  
  'level5-hoc': [
    '📁 File: src/challenges/level5/AdvancedPatternsChallenge.js | HOC needs to pass all props through (line 141)',
    '📁 File: src/challenges/level5/AdvancedPatternsChallenge.js | Check the props being passed to Component - only timestamp',
    '📁 File: src/challenges/level5/AdvancedPatternsChallenge.js | Spread all props: <Component {...props} timestamp={timestamp} />'
  ],
  
  'level5-portal': [
    '📁 File: src/challenges/level5/AdvancedPatternsChallenge.js | Portal needs a DOM element to render into (line 215)',
    '📁 File: src/challenges/level5/AdvancedPatternsChallenge.js | Check if portalRoot is being used - it\'s defined but not used',
    '📁 File: src/challenges/level5/AdvancedPatternsChallenge.js | Use createPortal(children, portalRoot) instead of just returning children'
  ],
  
  'level5-boundary': [
    '📁 File: src/challenges/level5/AdvancedPatternsChallenge.js | Error boundary needs error state (around line 260)',
    '📁 File: src/challenges/level5/AdvancedPatternsChallenge.js | Implement static getDerivedStateFromError(error) method',
    '📁 File: src/challenges/level5/AdvancedPatternsChallenge.js | Return new state with hasError: true in the static method'
  ],
  
  'level5-composition': [
    '📁 File: src/challenges/level5/AdvancedPatternsChallenge.js | Check the dependency array of useEffect (line 339)',
    '📁 File: src/challenges/level5/AdvancedPatternsChallenge.js | Multiple API calls may indicate missing dependencies',
    '📁 File: src/challenges/level5/AdvancedPatternsChallenge.js | Include searchTerm in dependencies: useEffect(..., [searchTerm])'
  ]
};

// Total hints available
export const getTotalHints = () => {
  return Object.values(challengeHints).reduce((total, hints) => total + hints.length, 0);
};

// Get hints for a specific challenge
export const getHintsForChallenge = (challengeId) => {
  return challengeHints[challengeId] || [];
};

