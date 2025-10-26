import { useState } from 'react';

/**
 * Level 1: React Basics & Component Logic
 * Fix the bugs to reveal the flags!
 */

/**
 * Challenge 1: useState Hook Bug
 * The counter is not incrementing properly
 */
export function BrokenCounter() {
  let count = 0; // Bug: Should use useState

  const increment = () => {
    count = count + 1; // Bug: Direct mutation won't trigger re-render
    console.log('Count:', count);
  };

  // Flag will appear when counter works correctly
  const flag = count === 5 ? 'FLAG_1_COUNTER_a3f8b2c1' : null;

  return (
    <div>
      <h2>Counter Challenge</h2>
      <p>Count: {count}</p>
      <button onClick={increment}>Increment</button>
      {flag && <p style={{ color: 'green' }}>🎉 {flag}</p>}
    </div>
  );
}

/**
 * Challenge 2: Event Handler Issue
 * Button click is not working as expected
 */
export function BrokenEventHandler() {
  const [message, setMessage] = useState('');
  const [clickCount, setClickCount] = useState(0);

  const handleClick = (text) => {
    setMessage(text);
    setClickCount(count => count + 1);
  };

  // Flag appears when all three buttons work correctly
  const flag = message === 'All buttons work!' && clickCount >= 3 ? 'FLAG_1_EVENTS_7d2c9f4e' : null;

  return (
    <div>
      <h2>Event Handler Challenge</h2>
      {/* Bug: Not passing event handlers correctly */}
      <button onClick={handleClick}>Button 1</button>
      <button onClick={handleClick}>Button 2</button>
      <button onClick={handleClick}>Button 3 (All buttons work!)</button>
      <p>Message: {message}</p>
      <p>Clicks: {clickCount}</p>
      {flag && <p style={{ color: 'green' }}>🎉 {flag}</p>}
      <p style={{ fontSize: '12px', color: '#666' }}>
        Hint: Buttons should show different messages, not all the same
      </p>
    </div>
  );
}

/**
 * Challenge 3: Conditional Rendering Bug
 * Items are not rendering correctly
 */
export function BrokenList() {
  const [items, setItems] = useState(['Apple', 'Banana', 'Cherry']);
  const [showItems, setShowItems] = useState(false);

  const addItem = () => {
    setItems([...items, `Item ${items.length + 1}`]);
  };

  // Bug: Wrong conditional logic
  const shouldShow = !showItems;

  // Flag appears when list renders correctly with 5+ items
  const flag = items.length >= 5 && showItems ? 'FLAG_1_RENDERING_e8a1b6d3' : null;

  return (
    <div>
      <h2>Conditional Rendering Challenge</h2>
      <button onClick={() => setShowItems(!showItems)}>
        Toggle Items (Currently: {showItems ? 'Shown' : 'Hidden'})
      </button>
      <button onClick={addItem}>Add Item</button>
      
      {/* Bug: Using wrong variable */}
      {shouldShow && (
        <ul>
          {items.map((item) => (
            // Bug: Missing key prop
            <li>{item}</li>
          ))}
        </ul>
      )}
      
      {flag && <p style={{ color: 'green' }}>🎉 {flag}</p>}
    </div>
  );
}

/**
 * Challenge 4: Props Destructuring Bug
 * Component is not receiving props correctly
 */
export function UserCard(props) {
  // Bug: Incorrect destructuring
  const { username, email, age } = props;

  // Flag appears when all props are displayed correctly
  const hasAllProps = username && email && age;
  const flag = hasAllProps ? 'FLAG_1_PROPS_4c7e2a9f' : null;

  return (
    <div style={{ border: '1px solid #ccc', padding: '10px', margin: '10px' }}>
      <h3>User Card Challenge</h3>
      {/* Bug: Using wrong prop names */}
      <p>Name: {props.name}</p>
      <p>Email: {props.userEmail}</p>
      <p>Age: {props.userAge}</p>
      {flag && <p style={{ color: 'green' }}>🎉 {flag}</p>}
    </div>
  );
}

// Test component for UserCard
export function UserCardTest() {
  return (
    <UserCard 
      username="John Doe" 
      email="john@example.com" 
      age={30} 
    />
  );
}

/**
 * Challenge 5: State Update Bug
 * Form input is not updating correctly
 */
export function BrokenForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    // Bug: Direct mutation of state
    formData[name] = value;
    setFormData(formData);
  };

  // Flag appears when form is filled correctly
  const isFormComplete = formData.name && formData.email && formData.message.length > 10;
  const flag = isFormComplete ? 'FLAG_1_FORM_9b3f6d2e' : null;

  return (
    <div>
      <h2>Form State Challenge</h2>
      <form onSubmit={(e) => e.preventDefault()}>
        <div>
          <label>Name: </label>
          <input 
            type="text" 
            name="name" 
            value={formData.name}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Email: </label>
          <input 
            type="email" 
            name="email" 
            value={formData.email}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Message: </label>
          <textarea 
            name="message" 
            value={formData.message}
            onChange={handleInputChange}
          />
        </div>
      </form>
      <p>Name: {formData.name}</p>
      <p>Email: {formData.email}</p>
      <p>Message length: {formData.message.length}</p>
      {flag && <p style={{ color: 'green' }}>🎉 {flag}</p>}
    </div>
  );
}

// Export all challenges
export default {
  BrokenCounter,
  BrokenEventHandler,
  BrokenList,
  UserCard,
  UserCardTest,
  BrokenForm
};

