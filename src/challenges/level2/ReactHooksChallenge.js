import { useState, useEffect, useCallback, useRef } from 'react';

/**
 * Level 2: React Hooks & Side Effects
 * Fix the bugs to reveal the flags!
 */

/**
 * Challenge 1: useEffect Dependency Array Bug
 * Effect is not running when it should
 */
export function BrokenUseEffect() {
  const [count, setCount] = useState(0);
  const [multiplier, setMultiplier] = useState(1);
  const [result, setResult] = useState(0);

  useEffect(() => {
    // Calculate result
    setResult(count * multiplier);
    console.log('Effect ran:', count, multiplier);
  }); // Bug: Missing dependency array - causes infinite loop or runs too often

  // Flag appears when effect runs correctly 10 times with count=10
  const flag = count === 10 && result === 20 ? 'FLAG_2_EFFECT_5d8a2c7f' : null;

  return (
    <div>
      <h2>useEffect Dependency Challenge</h2>
      <p>Count: {count}</p>
      <p>Multiplier: {multiplier}</p>
      <p>Result: {result}</p>
      <button onClick={() => setCount(count + 1)}>Increment Count</button>
      <button onClick={() => setMultiplier(2)}>Set Multiplier to 2</button>
      {flag && <p style={{ color: 'green' }}>🎉 {flag}</p>}
    </div>
  );
}

/**
 * Challenge 2: Infinite Loop Fix
 * This component causes an infinite render loop
 */
export function BrokenInfiniteLoop() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  // Bug: This causes infinite loop
  useEffect(() => {
    // Simulate API call
    const fetchData = async () => {
      setLoading(true);
      // Simulate delay
      await new Promise(resolve => setTimeout(resolve, 100));
      
      const newData = ['Item 1', 'Item 2', 'Item 3'];
      setData(newData);
      setLoading(false);
    };

    fetchData();
  }, [data]); // Bug: data in dependency array causes infinite loop

  // Flag appears when data is loaded without infinite loop
  const flag = !loading && data.length === 3 ? 'FLAG_2_LOOP_3f7b9e4a' : null;

  return (
    <div>
      <h2>Infinite Loop Challenge</h2>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {data.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      )}
      {flag && <p style={{ color: 'green' }}>🎉 {flag}</p>}
    </div>
  );
}

/**
 * Challenge 3: Custom Hook Implementation Bug
 * Custom hook is not working correctly
 */
function useLocalStorage(key, initialValue) {
  // Bug: Not using lazy initialization
  const [storedValue, setStoredValue] = useState(
    localStorage.getItem(key) || initialValue
  );

  const setValue = (value) => {
    // Bug: Not handling function updates
    setStoredValue(value);
    localStorage.setItem(key, value); // Bug: Should stringify for objects
  };

  return [storedValue, setValue];
}

export function BrokenCustomHook() {
  const [name, setName] = useLocalStorage('user-name', '');
  const [count, setCount] = useLocalStorage('user-count', 0);

  // Flag appears when custom hook persists data correctly
  const flag = name === 'TestUser' && count >= 5 ? 'FLAG_2_HOOK_8e2d5a3c' : null;

  return (
    <div>
      <h2>Custom Hook Challenge</h2>
      <input 
        type="text" 
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Enter name"
      />
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
      <button onClick={() => {
        setName('');
        setCount(0);
      }}>Reset</button>
      {flag && <p style={{ color: 'green' }}>🎉 {flag}</p>}
    </div>
  );
}

/**
 * Challenge 4: useCallback Missing Dependency
 * Callback is not updating with new values
 */
export function BrokenUseCallback() {
  const [count, setCount] = useState(0);
  const [multiplier, setMultiplier] = useState(1);

  // Bug: Missing dependency in useCallback
  const calculate = useCallback(() => {
    return count * multiplier;
  }, [count]); // Bug: Missing multiplier in dependencies

  const result = calculate();

  // Flag appears when calculation is correct with multiplier
  const flag = count === 5 && multiplier === 3 && result === 15 
    ? 'FLAG_2_CALLBACK_6a9c4f2e' 
    : null;

  return (
    <div>
      <h2>useCallback Challenge</h2>
      <p>Count: {count}</p>
      <p>Multiplier: {multiplier}</p>
      <p>Result: {result}</p>
      <button onClick={() => setCount(count + 1)}>Increment Count</button>
      <button onClick={() => setMultiplier(multiplier + 1)}>Increment Multiplier</button>
      {flag && <p style={{ color: 'green' }}>🎉 {flag}</p>}
    </div>
  );
}

/**
 * Challenge 5: Memory Leak Prevention
 * Component has a memory leak with setInterval
 */
export function BrokenMemoryLeak() {
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    if (isRunning) {
      // Bug: Not cleaning up interval
      setInterval(() => {
        setSeconds(prev => prev + 1);
      }, 1000);
    }
    // Bug: Missing cleanup function
  }, [isRunning]);

  // Flag appears when timer reaches 10 without memory leak
  const flag = seconds === 10 ? 'FLAG_2_MEMORY_2c8f5d3a' : null;

  return (
    <div>
      <h2>Memory Leak Challenge</h2>
      <p>Timer: {seconds} seconds</p>
      <button onClick={() => setIsRunning(!isRunning)}>
        {isRunning ? 'Stop' : 'Start'}
      </button>
      <button onClick={() => setSeconds(0)}>Reset</button>
      {flag && <p style={{ color: 'green' }}>🎉 {flag}</p>}
      <p style={{ fontSize: '12px', color: '#666' }}>
        Hint: Check the browser console for warnings
      </p>
    </div>
  );
}

/**
 * Challenge 6: useRef Bug
 * Ref is not persisting value correctly
 */
export function BrokenUseRef() {
  const [renderCount, setRenderCount] = useState(0);
  let previousValue = 0; // Bug: Should use useRef

  useEffect(() => {
    previousValue = renderCount; // Bug: Won't persist across renders
  });

  // Flag appears when ref correctly tracks previous value
  const flag = renderCount === 5 && previousValue === 4 
    ? 'FLAG_2_REF_9d4b7e2a' 
    : null;

  return (
    <div>
      <h2>useRef Challenge</h2>
      <p>Current Render Count: {renderCount}</p>
      <p>Previous Render Count: {previousValue}</p>
      <button onClick={() => setRenderCount(renderCount + 1)}>
        Increment (renders: {renderCount})
      </button>
      {flag && <p style={{ color: 'green' }}>🎉 {flag}</p>}
    </div>
  );
}

export default {
  BrokenUseEffect,
  BrokenInfiniteLoop,
  BrokenCustomHook,
  BrokenUseCallback,
  BrokenMemoryLeak,
  BrokenUseRef
};

