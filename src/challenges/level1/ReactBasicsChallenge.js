import { useState } from 'react';

/**
 * Level 1: React Basics & Component Logic
 * Fix the bugs to reveal the flags!
 */

/**
 * Challenge 1: Counter Challenge
 */
export function BrokenCounter() {
  let count = 0; 

  const increment = () => {
    count = count + 1; 
    console.log('Count:', count);
  };

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
 * Challenge 2: Event Handler Challenge
 */
export function BrokenEventHandler() {
  const [message, setMessage] = useState('');
  const [clickedButtons, setClickedButtons] = useState(new Set());

  const handleClick = (buttonId, text) => {
    setMessage(text);
    setClickedButtons(new Set([buttonId]));
  };

  const flag = clickedButtons.size >= 3 && message === 'Button 3' ? 'FLAG_1_EVENTS_7d2c9f4e' : null;

  return (
    <div>
      <h2>Event Handler Challenge</h2>
      <button onClick={() => handleClick(1, 'Button 1')}>Button 1</button>
      <button onClick={() => handleClick(2, 'Button 2')}>Button 2</button>
      <button onClick={() => handleClick(3, 'Button 3')}>Button 3</button>
      <p>Message: {message}</p>
      <p>Buttons clicked: {clickedButtons.size}/3</p>
      {flag && <p style={{ color: 'green' }}>🎉 {flag}</p>}
    </div>
  );
}

/**
 * Challenge 3: Conditional Rendering Bug
 */
export function BrokenList() {
  const items = ['Apple', 'Banana', 'Cherry'];
  const [showItems, setShowItems] = useState(false);

  const addItem = () => {
    const local = [...items];
    local.push(`Item ${local.length + 1}`);
    items.push(local);
  };

  const flag = items.length >= 5 && showItems ? 'FLAG_1_RENDERING_e8a1b6d3' : null;

  return (
    <div>
      <h2>Conditional Rendering Challenge</h2>
      <button onClick={() => setShowItems(!showItems)}>
        Toggle Items (Currently: {showItems ? 'Shown' : 'Hidden'})
      </button>
      <button onClick={addItem}>Add Item</button>
      
      {showItems && (
        <ul>
          {items.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      )}
      
      {flag && <p style={{ color: 'green' }}>🎉 {flag}</p>}
    </div>
  );
}

/**
 * Challenge 4: User Card Challenge
 */
export function UserCard({ username, email, age }) {
  const hasAllProps = username && email && age;
  const flag = hasAllProps ? 'FLAG_1_PROPS_4c7e2a9f' : null;

  return (
    <div style={{ border: '1px solid #ccc', padding: '10px', margin: '10px' }}>
      <h3>User Card Challenge</h3>
      <p>Name: {username}</p>
      <p>Email: {email}</p>
      <p>Age: {age}</p>
      {flag && <p style={{ color: 'green' }}>🎉 {flag}</p>}
    </div>
  );
}

export function UserCardTest() {
  return (
    <UserCard 
      name="John Doe" 
      email="john@example.com" 
      age={30} 
    />
  );
}

/**
 * Challenge 5: Form State Challenge
 */
export function BrokenForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    formData[name] = value;
    setFormData(formData);
  };

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
const ReactBasicsChallenge = {
  BrokenCounter,
  BrokenEventHandler,
  BrokenList,
  UserCard,
  UserCardTest,
  BrokenForm
};

export default ReactBasicsChallenge;

