import { Component, createContext, useContext, useState } from 'react';

/**
 * Level 5: Advanced React Patterns
 * Fix the bugs to reveal the flags!
 */

/**
 * Challenge 1: Compound Components Pattern
 * Component composition is not working correctly
 */
const TabsContext = createContext();

export function BrokenTabs({ children }) {
  // eslint-disable-next-line no-unused-vars
  const [activeTab, setActiveTab] = useState(0);

  // Bug: Not providing value object structure correctly
  return (
    <TabsContext.Provider value={activeTab}>
      <div style={{ border: '1px solid #ccc', padding: '10px' }}>
        {children}
      </div>
    </TabsContext.Provider>
  );
}

export function TabList({ children }) {
  return (
    <div style={{ display: 'flex', borderBottom: '2px solid #ddd' }}>
      {children}
    </div>
  );
}

export function Tab({ index, children }) {
  const activeTab = useContext(TabsContext);
  
  // Bug: Can't set active tab, missing setActiveTab from context
  const isActive = activeTab === index;

  return (
    <button
      style={{
        padding: '10px 20px',
        border: 'none',
        borderBottom: isActive ? '2px solid blue' : 'none',
        background: isActive ? '#f0f0f0' : 'transparent',
        cursor: 'pointer'
      }}
    >
      {children}
    </button>
  );
}

export function TabPanel({ index, children }) {
  const activeTab = useContext(TabsContext);
  
  // Bug: Wrong comparison type
  if (activeTab !== index) return null;

  return <div style={{ padding: '20px' }}>{children}</div>;
}

export function BrokenCompoundComponents() {
  return (
    <div>
      <h2>Compound Components Challenge</h2>
      <BrokenTabs>
        <TabList>
          <Tab index={0}>Tab 1</Tab>
          <Tab index={1}>Tab 2</Tab>
          <Tab index={2}>Tab 3</Tab>
        </TabList>
        <TabPanel index={0}>Content 1</TabPanel>
        <TabPanel index={1}>Content 2</TabPanel>
        <TabPanel index={2}>
          Content 3 - FLAG_5_COMPOUND_8e3c7a2f
        </TabPanel>
      </BrokenTabs>
      <p style={{ fontSize: '12px', color: '#666' }}>
        Hint: Fix the context to allow tab switching
      </p>
    </div>
  );
}

/**
 * Challenge 2: Render Props Bug
 * Render prop pattern is not working correctly
 */
export function BrokenMouseTracker({ render }) {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (event) => {
    // Bug: Using page coordinates instead of client coordinates
    setPosition({
      x: event.pageX,
      y: event.pageY
    });
  };

  return (
    <div 
      style={{ 
        width: '100%', 
        height: '200px', 
        border: '2px solid green',
        position: 'relative'
      }}
      onMouseMove={handleMouseMove}
    >
      {/* Bug: Not passing position correctly */}
      {render(position.x, position.y)}
    </div>
  );
}

export function BrokenRenderPropsDemo() {
  const [isInBox, setIsInBox] = useState(false);

  // Flag appears when mouse tracking works correctly
  const flag = isInBox ? 'FLAG_5_RENDERPROPS_4c9e2a7f' : null;

  return (
    <div>
      <h2>Render Props Challenge</h2>
      <BrokenMouseTracker 
        render={(x, y) => {
          // Bug: Position should be passed as object {x, y}, not separate params
          // Also need to handle mouse enter detection properly
          return (
            <div>
              <p>Mouse position: ({x}, {y})</p>
              {/* Users need to detect when mouse is in specific area and set state properly */}
            </div>
          );
        }}
      />
      {flag && <p style={{ color: 'green' }}>🎉 {flag}</p>}
      <p style={{ fontSize: '12px', color: '#666' }}>
        Hint: Fix how position is passed and add detection for mouse in bottom-right
      </p>
    </div>
  );
}

/**
 * Challenge 3: Higher-Order Component (HOC) Issue
 * HOC is not preserving component properties
 */
function withLoading(WrappedComponent) {
  // Bug: Not forwarding props and refs correctly
  return function WithLoadingComponent({ isLoading, ...props }) {
    if (isLoading) {
      return <div>Loading...</div>;
    }
    
    // Bug: Not spreading props
    return <WrappedComponent />;
  };
}

function DataDisplay({ data, title }) {
  return (
    <div style={{ border: '1px solid blue', padding: '10px' }}>
      <h3>{title}</h3>
      <ul>
        {data && data.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </div>
  );
}

// Bug: Display name not set for debugging
const DataDisplayWithLoading = withLoading(DataDisplay);

export function BrokenHOC() {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([]);

  const loadData = () => {
    setIsLoading(true);
    setTimeout(() => {
      setData(['Item 1', 'Item 2', 'Item 3']);
      setIsLoading(false);
    }, 1000);
  };

  // Flag appears when HOC works correctly
  const flag = !isLoading && data.length === 3 ? 'FLAG_5_HOC_6d3e9a2c' : null;

  return (
    <div>
      <h2>HOC Challenge</h2>
      <button onClick={loadData}>Load Data</button>
      <DataDisplayWithLoading 
        isLoading={isLoading}
        data={data}
        title="My Data"
      />
      {flag && <p style={{ color: 'green' }}>🎉 {flag}</p>}
    </div>
  );
}

/**
 * Challenge 4: Portal Implementation Bug
 * Portal is not rendering correctly
 */
export function BrokenModal({ isOpen, onClose, children }) {
  if (!isOpen) return null;

  // Bug: Not checking if portal root exists
  // eslint-disable-next-line no-unused-vars
  const portalRoot = document.getElementById('modal-root');

  return (
    // Bug: Not using createPortal correctly
    <div 
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1000
      }}
      onClick={onClose}
    >
      <div 
        style={{
          background: 'white',
          padding: '20px',
          borderRadius: '8px',
          minWidth: '300px'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
}

export function BrokenPortalDemo() {
  const [isOpen, setIsOpen] = useState(false);
  const [clickCount, setClickCount] = useState(0);

  const handleOpen = () => {
    setIsOpen(true);
    setClickCount(prev => prev + 1);
  };

  // Flag appears when modal works correctly
  const flag = clickCount >= 2 ? 'FLAG_5_PORTAL_7e4a2c9f' : null;

  return (
    <div>
      <h2>Portal Challenge</h2>
      <button onClick={handleOpen}>Open Modal</button>
      <p>Modal opened {clickCount} times</p>
      <BrokenModal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <h3>Modal Content</h3>
        <p>This should render in a portal!</p>
      </BrokenModal>
      {flag && <p style={{ color: 'green' }}>🎉 {flag}</p>}
      <p style={{ fontSize: '12px', color: '#666' }}>
        Hint: Check if modal-root div exists and use createPortal
      </p>
    </div>
  );
}

/**
 * Challenge 5: Error Boundary Fix
 * Error boundary is not catching errors correctly
 */
export class BrokenErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  // Bug: Missing static method name
  componentDidCatch(error, errorInfo) {
    console.log('Error caught:', error, errorInfo);
    this.setState({ hasError: true, error: error.message });
  }

  // Bug: Not implementing getDerivedStateFromError
  
  render() {
    if (this.state.hasError) {
      return (
        <div style={{ border: '2px solid red', padding: '20px', margin: '10px' }}>
          <h3>Something went wrong!</h3>
          <p>{this.state.error}</p>
          <p style={{ color: 'green' }}>FLAG_5_ERRORBOUNDARY_3d8c5a2f</p>
          <button onClick={() => this.setState({ hasError: false, error: null })}>
            Reset
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

function BuggyComponent({ shouldThrow }) {
  if (shouldThrow) {
    throw new Error('Intentional error for testing!');
  }
  return <div>Component is working fine</div>;
}

export function BrokenErrorBoundaryDemo() {
  const [shouldThrow, setShouldThrow] = useState(false);

  return (
    <div>
      <h2>Error Boundary Challenge</h2>
      <button onClick={() => setShouldThrow(true)}>
        Trigger Error
      </button>
      <button onClick={() => setShouldThrow(false)}>
        Reset Component
      </button>
      <BrokenErrorBoundary>
        <BuggyComponent shouldThrow={shouldThrow} />
      </BrokenErrorBoundary>
      <p style={{ fontSize: '12px', color: '#666' }}>
        Hint: Implement getDerivedStateFromError
      </p>
    </div>
  );
}

/**
 * Challenge 6: Custom Hooks Composition
 * Multiple custom hooks are not working together correctly
 */
function useToggle(initialValue = false) {
  const [value, setValue] = useState(initialValue);
  
  // Bug: Not returning toggle function
  return [value, setValue];
}

function useCounter(initialValue = 0) {
  const [count, setCount] = useState(initialValue);
  
  const increment = () => setCount(prev => prev + 1);
  const decrement = () => setCount(prev => prev - 1);
  // Bug: Missing reset function
  
  return { count, increment, decrement };
}

export function BrokenHooksComposition() {
  const [isVisible, toggleVisible] = useToggle(false);
  const { count, increment, decrement } = useCounter(0);

  // Flag appears when hooks work together correctly
  const flag = isVisible && count === 5 
    ? 'FLAG_5_HOOKCOMP_9e2c7a4f' 
    : null;

  return (
    <div>
      <h2>Hooks Composition Challenge</h2>
      <button onClick={toggleVisible}>
        Toggle Visibility
      </button>
      
      {isVisible && (
        <div style={{ border: '1px solid green', padding: '10px', margin: '10px' }}>
          <p>Count: {count}</p>
          <button onClick={increment}>+</button>
          <button onClick={decrement}>-</button>
        </div>
      )}
      
      {flag && <p style={{ color: 'green' }}>🎉 {flag}</p>}
      <p style={{ fontSize: '12px', color: '#666' }}>
        Hint: Fix the useToggle hook to return a toggle function
      </p>
    </div>
  );
}

const AdvancedPatternsChallenge = {
  BrokenTabs,
  TabList,
  Tab,
  TabPanel,
  BrokenCompoundComponents,
  BrokenMouseTracker,
  BrokenRenderPropsDemo,
  BrokenHOC,
  BrokenModal,
  BrokenPortalDemo,
  BrokenErrorBoundary,
  BrokenErrorBoundaryDemo,
  BrokenHooksComposition
};

export default AdvancedPatternsChallenge;

