import { createContext, useContext, useReducer, useState } from 'react';

/**
 * Level 3: State Management & Context
 * Fix the bugs to reveal the flags!
 */

/**
 * Challenge 1: Context Provider Bug
 * Context is not providing values correctly
 */
const ThemeContext = createContext();

// Bug: Not providing a default value structure
export function BrokenThemeProvider({ children }) {
  const [theme, setTheme] = useState('light');

  // Bug: Not memoizing context value, causes unnecessary re-renders
  const value = {
    theme,
    toggleTheme: () => setTheme(theme === 'light' ? 'dark' : 'light')
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}

function BrokenThemeDisplay() {
  // Bug: Using context without checking if provider exists
  const context = useContext(ThemeContext);
  const { theme, toggleTheme } = context || { theme: 'light', toggleTheme: () => {} };

  // Flag appears when theme toggles correctly 3 times
  const [toggleCount, setToggleCount] = useState(0);

  const handleToggle = () => {
    toggleTheme();
    setToggleCount(prev => prev + 1);
  };

  const flag = toggleCount === 3 ? 'FLAG_3_CONTEXT_7e4a9c2f' : null;

  return (
    <div style={{ 
      background: theme === 'dark' ? '#333' : '#fff',
      color: theme === 'dark' ? '#fff' : '#000',
      padding: '20px'
    }}>
      <h2>Context Challenge</h2>
      <p>Current Theme: {theme}</p>
      <p>Toggle Count: {toggleCount}</p>
      <button onClick={handleToggle}>Toggle Theme</button>
      {flag && <p style={{ color: 'green' }}>🎉 {flag}</p>}
      <p style={{ fontSize: '12px', color: '#666' }}>
        Hint: The theme won't change without ThemeProvider wrapper
      </p>
    </div>
  );
}

// Bug: Not wrapping with ThemeProvider
export function BrokenThemeConsumer() {
  return <BrokenThemeDisplay />;
}

/**
 * Challenge 2: Reducer Logic Error
 * Reducer has incorrect logic
 */
const initialState = {
  count: 0,
  history: []
};

function counterReducer(state, action) {
  switch (action.type) {
    case 'INCREMENT':
      // Bug: Not creating new object, mutating state
      state.count += 1;
      state.history.push(state.count);
      return state;
    
    case 'DECREMENT':
      // Bug: Not handling negative counts
      return {
        ...state,
        count: state.count - 1,
        history: [...state.history, state.count - 1]
      };
    
    case 'RESET':
      // Bug: Not resetting history
      return {
        ...state,
        count: 0
      };
    
    default:
      return state; // Bug: Should throw error for unknown actions
  }
}

export function BrokenReducer() {
  const [state, dispatch] = useReducer(counterReducer, initialState);

  // Flag appears when count reaches 5 and history is correct
  const flag = state.count === 5 && state.history.length === 5 
    ? 'FLAG_3_REDUCER_3d8f2a6c' 
    : null;

  return (
    <div>
      <h2>Reducer Challenge</h2>
      <p>Count: {state.count}</p>
      <p>History: {state.history.join(', ')}</p>
      <button onClick={() => dispatch({ type: 'INCREMENT' })}>Increment</button>
      <button onClick={() => dispatch({ type: 'DECREMENT' })}>Decrement</button>
      <button onClick={() => dispatch({ type: 'RESET' })}>Reset</button>
      {flag && <p style={{ color: 'green' }}>🎉 {flag}</p>}
    </div>
  );
}

/**
 * Challenge 3: State Update Batching Issue
 * Multiple state updates are not batching correctly
 */
export function BrokenStateBatching() {
  const [count, setCount] = useState(0);
  const [doubled, setDoubled] = useState(0);
  const [tripled, setTripled] = useState(0);

  const updateAll = () => {
    // Bug: Using stale state values
    setCount(count + 1);
    setDoubled(count * 2);
    setTripled(count * 3);
  };

  // Flag appears when all values are correct
  const flag = count === 5 && doubled === 10 && tripled === 15 
    ? 'FLAG_3_BATCH_6c2e9a4f' 
    : null;

  return (
    <div>
      <h2>State Batching Challenge</h2>
      <p>Count: {count}</p>
      <p>Doubled: {doubled}</p>
      <p>Tripled: {tripled}</p>
      <button onClick={updateAll}>Update All</button>
      {flag && <p style={{ color: 'green' }}>🎉 {flag}</p>}
    </div>
  );
}

/**
 * Challenge 4: Complex State Updates
 * Nested state is not updating correctly
 */
export function BrokenNestedState() {
  const [user, setUser] = useState({
    profile: {
      name: '',
      email: '',
      settings: {
        notifications: false,
        theme: 'light'
      }
    }
  });

  const updateName = (name) => {
    // Bug: Shallow copy, not updating nested objects correctly
    setUser({
      ...user,
      profile: {
        name: name
      }
    });
  };

  const updateEmail = (email) => {
    // Bug: Direct mutation
    user.profile.email = email;
    setUser(user);
  };

  const toggleNotifications = () => {
    // Bug: Not spreading all nested levels
    setUser({
      ...user,
      profile: {
        ...user.profile,
        settings: {
          notifications: !user.profile.settings.notifications
        }
      }
    });
  };

  // Flag appears when all fields are filled correctly
  const flag = user.profile.name === 'John' && 
                user.profile.email === 'john@test.com' && 
                user.profile.settings.notifications === true &&
                user.profile.settings.theme === 'light'
    ? 'FLAG_3_NESTED_4a7e2c9f' 
    : null;

  return (
    <div>
      <h2>Nested State Challenge</h2>
      <div>
        <label>Name: </label>
        <input 
          type="text" 
          value={user.profile.name}
          onChange={(e) => updateName(e.target.value)}
        />
      </div>
      <div>
        <label>Email: </label>
        <input 
          type="email" 
          value={user.profile.email}
          onChange={(e) => updateEmail(e.target.value)}
        />
      </div>
      <div>
        <label>
          <input 
            type="checkbox" 
            checked={user.profile.settings.notifications}
            onChange={toggleNotifications}
          />
          Enable Notifications
        </label>
      </div>
      <pre>{JSON.stringify(user, null, 2)}</pre>
      {flag && <p style={{ color: 'green' }}>🎉 {flag}</p>}
    </div>
  );
}

/**
 * Challenge 5: Context Performance Problem
 * Context causes unnecessary re-renders
 */
const DataContext = createContext();

export function BrokenDataProvider({ children }) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 500));
    setData(['Item 1', 'Item 2', 'Item 3']);
    setLoading(false);
  };

  // Bug: Not splitting context values, causes all consumers to re-render
  const value = {
    data,
    loading,
    fetchData
  };

  return (
    <DataContext.Provider value={value}>
      {children}
    </DataContext.Provider>
  );
}

export function BrokenDataDisplay() {
  const { data } = useContext(DataContext);
  console.log('DataDisplay rendered'); // Bug: Renders on every context change

  return (
    <div>
      <h3>Data List</h3>
      <ul>
        {data.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </div>
  );
}

export function BrokenDataLoader() {
  const { loading, fetchData } = useContext(DataContext);
  console.log('DataLoader rendered'); // Bug: Renders when data changes

  return (
    <div>
      <button onClick={fetchData} disabled={loading}>
        {loading ? 'Loading...' : 'Load Data'}
      </button>
    </div>
  );
}

export function BrokenDataContainer() {
  const [renderCount, setRenderCount] = useState(0);

  // Flag appears when data is loaded with minimal re-renders
  const flag = renderCount < 5 ? 'FLAG_3_PERF_9e3c7a2d' : 'Too many re-renders!';

  return (
    <BrokenDataProvider>
      <div>
        <h2>Context Performance Challenge</h2>
        <p>Render Count: {renderCount}</p>
        <button onClick={() => setRenderCount(prev => prev + 1)}>
          Force Re-render
        </button>
        <BrokenDataLoader />
        <BrokenDataDisplay />
        {flag && <p style={{ color: renderCount < 5 ? 'green' : 'red' }}>
          {renderCount < 5 ? '🎉' : '❌'} {flag}
        </p>}
      </div>
    </BrokenDataProvider>
  );
}

export default {
  BrokenThemeProvider,
  BrokenThemeConsumer,
  BrokenReducer,
  BrokenStateBatching,
  BrokenNestedState,
  BrokenDataProvider,
  BrokenDataDisplay,
  BrokenDataLoader,
  BrokenDataContainer
};

