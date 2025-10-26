/**
 * Mock heavy component for lazy loading challenge
 */
export default function HeavyComponent() {
  return (
    <div style={{ 
      border: '2px solid purple', 
      padding: '20px', 
      margin: '10px',
      backgroundColor: '#f0f0f0'
    }}>
      <h3>Heavy Component Loaded!</h3>
      <p>This component should be lazy loaded</p>
      <p>Imagine this contains a large library or complex visualization</p>
    </div>
  );
}

