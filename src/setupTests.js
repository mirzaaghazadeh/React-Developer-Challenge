// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';
import React from 'react';

// Error Boundary to catch render errors in tests
class TestErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    // Suppress "Too many re-renders" errors in tests
    if (error.message && error.message.includes('Too many re-renders')) {
      return { hasError: true };
    }
    throw error;
  }

  componentDidCatch(error, errorInfo) {
    // Silence the error for infinite render loops
    if (error.message && error.message.includes('Too many re-renders')) {
      // Do nothing - this is expected in challenge components
    }
  }

  render() {
    if (this.state.hasError) {
      return <div>Component Error (Expected in Challenges)</div>;
    }
    return this.props.children;
  }
}

// Make ErrorBoundary available globally in tests
global.TestErrorBoundary = TestErrorBoundary;

// Mock localStorage
const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
};
global.localStorage = localStorageMock;

// Suppress console errors in tests
const originalError = console.error;
beforeAll(() => {
  console.error = (...args) => {
    if (
      typeof args[0] === 'string' &&
      (args[0].includes('Warning: ReactDOM.render') ||
       args[0].includes('Warning: useEffect') ||
       args[0].includes('Warning: Each child in a list should have a unique "key" prop') ||
       args[0].includes('Not implemented: HTMLFormElement.prototype.submit') ||
       args[0].includes('Too many re-renders') ||
       args[0].includes('The above error occurred'))
    ) {
      return;
    }
    // Also suppress Error objects with these messages
    if (args[0] instanceof Error && args[0].message && args[0].message.includes('Too many re-renders')) {
      return;
    }
    // Suppress Uncaught errors related to re-renders
    if (typeof args[0] === 'string' && args[0].includes('Uncaught') && 
        args.length > 1 && args[1] instanceof Error && 
        args[1].message && args[1].message.includes('Too many re-renders')) {
      return;
    }
    originalError.call(console, ...args);
  };
});

afterAll(() => {
  console.error = originalError;
});

