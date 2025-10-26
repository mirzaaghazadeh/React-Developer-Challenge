import { useState, useMemo, memo, useCallback, lazy, Suspense } from 'react';
import HeavyComponent from './HeavyComponent';

/**
 * Level 4: Performance Optimization
 * Fix the bugs to reveal the flags!
 */

/**
 * Challenge 1: useMemo Misuse
 * Expensive calculation is not being memoized correctly
 */
export function BrokenUseMemo() {
  const [count, setCount] = useState(0);
  const [input, setInput] = useState('');

  // Expensive calculation
  const expensiveCalculation = (num) => {
    console.log('Calculating...');
    let result = 0;
    for (let i = 0; i < 1000000; i++) {
      result += num;
    }
    return result;
  };

  // Bug: Not using useMemo, recalculates on every render
  const calculated = expensiveCalculation(count);

  // Flag appears when memoization is correct and count is 5
  const flag = count === 5 && calculated === 5000000 
    ? 'FLAG_4_MEMO_5c8e2a7f' 
    : null;

  return (
    <div>
      <h2>useMemo Challenge</h2>
      <p>Count: {count}</p>
      <p>Calculated: {calculated}</p>
      <input 
        type="text" 
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Type here (should not trigger calculation)"
      />
      <button onClick={() => setCount(count + 1)}>Increment</button>
      {flag && <p style={{ color: 'green' }}>🎉 {flag}</p>}
      <p style={{ fontSize: '12px', color: '#666' }}>
        Hint: Check console for "Calculating..." logs
      </p>
    </div>
  );
}

/**
 * Challenge 2: React.memo Implementation
 * Child component re-renders unnecessarily
 */
// Bug: Not using React.memo
function ExpensiveChild({ data, onClick }) {
  console.log('ExpensiveChild rendered');
  
  return (
    <div style={{ border: '1px solid blue', padding: '10px', margin: '10px' }}>
      <h3>Expensive Child Component</h3>
      <p>Data: {data}</p>
      <button onClick={onClick}>Click Me</button>
    </div>
  );
}

export function BrokenReactMemo() {
  const [count, setCount] = useState(0);
  const [childData, setChildData] = useState('Initial');

  // Bug: onClick is recreated on every render
  const handleChildClick = () => {
    console.log('Child clicked');
  };

  // Flag appears when child doesn't re-render unnecessarily
  const flag = count === 5 ? 'FLAG_4_REACTMEMO_3d7a9c2f' : null;

  return (
    <div>
      <h2>React.memo Challenge</h2>
      <p>Parent Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment Parent</button>
      <button onClick={() => setChildData('Updated')}>Update Child Data</button>
      <ExpensiveChild data={childData} onClick={handleChildClick} />
      {flag && <p style={{ color: 'green' }}>🎉 {flag}</p>}
      <p style={{ fontSize: '12px', color: '#666' }}>
        Hint: Child should only re-render when its props change
      </p>
    </div>
  );
}

/**
 * Challenge 3: Large List Rendering
 * Large list is not virtualized, causing performance issues
 */
export function BrokenLargeList() {
  const [filterText, setFilterText] = useState('');

  // Generate large dataset
  const items = [];
  for (let i = 0; i < 10000; i++) {
    items.push({ id: i, name: `Item ${i}`, value: Math.random() });
  }

  // Bug: Filtering on every render without memoization
  const filteredItems = items.filter(item => 
    item.name.toLowerCase().includes(filterText.toLowerCase())
  );

  // Bug: Rendering all items at once
  // Should use virtualization or pagination

  // Flag appears when list is optimized and filtered correctly
  const flag = filteredItems.length < 100 && filterText.length > 0 
    ? 'FLAG_4_LISTPERF_8e4a2c9f' 
    : null;

  return (
    <div>
      <h2>Large List Challenge</h2>
      <input 
        type="text" 
        value={filterText}
        onChange={(e) => setFilterText(e.target.value)}
        placeholder="Filter items (type '1' to see ~1000 items)"
      />
      <p>Showing {filteredItems.length} items</p>
      <div style={{ maxHeight: '400px', overflow: 'auto' }}>
        {filteredItems.map(item => (
          <div key={item.id} style={{ padding: '5px', borderBottom: '1px solid #eee' }}>
            {item.name} - {item.value.toFixed(2)}
          </div>
        ))}
      </div>
      {flag && <p style={{ color: 'green' }}>🎉 {flag}</p>}
      <p style={{ fontSize: '12px', color: '#666' }}>
        Hint: Memoize the filtering operation
      </p>
    </div>
  );
}

/**
 * Challenge 4: Event Handler Optimization
 * Event handlers are recreated on every render
 */
function ListItem({ item, onRemove, onUpdate }) {
  console.log(`ListItem ${item.id} rendered`);
  
  return (
    <div style={{ padding: '5px', borderBottom: '1px solid #ccc' }}>
      <span>{item.name}</span>
      <button onClick={() => onUpdate(item.id)}>Update</button>
      <button onClick={() => onRemove(item.id)}>Remove</button>
    </div>
  );
}

export function BrokenEventOptimization() {
  const [items, setItems] = useState([
    { id: 1, name: 'Item 1' },
    { id: 2, name: 'Item 2' },
    { id: 3, name: 'Item 3' }
  ]);
  const [updateCount, setUpdateCount] = useState(0);

  // Bug: Not using useCallback, recreates on every render
  const handleRemove = (id) => {
    setItems(items.filter(item => item.id !== id));
  };

  // Bug: Not using useCallback
  const handleUpdate = (id) => {
    setItems(items.map(item => 
      item.id === id ? { ...item, name: `${item.name} (updated)` } : item
    ));
    setUpdateCount(prev => prev + 1);
  };

  // Flag appears when callbacks are optimized
  const flag = updateCount === 3 ? 'FLAG_4_CALLBACK_6c3e9a2f' : null;

  return (
    <div>
      <h2>Event Handler Optimization Challenge</h2>
      <p>Update Count: {updateCount}</p>
      <div>
        {items.map(item => (
          <ListItem 
            key={item.id}
            item={item}
            onRemove={handleRemove}
            onUpdate={handleUpdate}
          />
        ))}
      </div>
      {flag && <p style={{ color: 'green' }}>🎉 {flag}</p>}
      <p style={{ fontSize: '12px', color: '#666' }}>
        Hint: Use useCallback to memoize event handlers
      </p>
    </div>
  );
}

/**
 * Challenge 5: Code Splitting Bug
 * Lazy loading is not implemented correctly
 */
// Bug: Component is imported eagerly, not lazily

export function BrokenCodeSplitting() {
  const [showHeavy, setShowHeavy] = useState(false);
  const [loadCount, setLoadCount] = useState(0);

  const handleLoad = () => {
    setShowHeavy(true);
    setLoadCount(prev => prev + 1);
  };

  // Flag appears when lazy loading is correct
  const flag = showHeavy && loadCount === 1 ? 'FLAG_4_LAZYLOAD_7d4b2e8a' : null;

  return (
    <div>
      <h2>Code Splitting Challenge</h2>
      <button onClick={handleLoad}>Load Heavy Component</button>
      
      {/* Bug: Not using Suspense with lazy loading */}
      {showHeavy && <HeavyComponent />}
      
      {flag && <p style={{ color: 'green' }}>🎉 {flag}</p>}
      <p style={{ fontSize: '12px', color: '#666' }}>
        Hint: Use React.lazy and Suspense for code splitting
      </p>
    </div>
  );
}

/**
 * Challenge 6: Debouncing Search Input
 * Search input triggers too many updates
 */
export function BrokenDebounce() {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [searchCount, setSearchCount] = useState(0);

  // Bug: Searching on every keystroke without debouncing
  const handleSearch = (term) => {
    setSearchTerm(term);
    
    // Simulate API call
    console.log('Searching for:', term);
    setSearchCount(prev => prev + 1);
    
    // Mock results
    const results = term ? [`Result for "${term}"`] : [];
    setSearchResults(results);
  };

  // Flag appears when search is debounced properly
  const flag = searchTerm.length > 5 && searchCount < 3 
    ? 'FLAG_4_DEBOUNCE_2e8c5a7f' 
    : null;

  return (
    <div>
      <h2>Debounce Challenge</h2>
      <input 
        type="text" 
        value={searchTerm}
        onChange={(e) => handleSearch(e.target.value)}
        placeholder="Search (type 'testing')"
      />
      <p>Search Count: {searchCount}</p>
      <ul>
        {searchResults.map((result, index) => (
          <li key={index}>{result}</li>
        ))}
      </ul>
      {flag && <p style={{ color: 'green' }}>🎉 {flag}</p>}
      <p style={{ fontSize: '12px', color: '#666' }}>
        Hint: Implement debouncing to reduce search calls
      </p>
    </div>
  );
}

export default {
  BrokenUseMemo,
  BrokenReactMemo,
  BrokenLargeList,
  BrokenEventOptimization,
  BrokenCodeSplitting,
  BrokenDebounce
};

