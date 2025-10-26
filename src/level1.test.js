import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import {
  BrokenCounter,
  BrokenEventHandler,
  BrokenList,
  UserCard,
  BrokenForm
} from '../src/challenges/level1/ReactBasicsChallenge';

describe('Level 1: React Basics Challenges', () => {
  
  describe('Challenge 1: Counter Bug', () => {
    test('should increment counter correctly', () => {
      render(<BrokenCounter />);
      const button = screen.getByText('Increment');
      
      // Initially count should be 0
      expect(screen.getByText(/Count: 0/)).toBeInTheDocument();
      
      // Click 5 times
      for (let i = 0; i < 5; i++) {
        fireEvent.click(button);
      }
      
      // Should show count 5
      expect(screen.getByText(/Count: 5/)).toBeInTheDocument();
    });

    test('should show flag when counter reaches 5', () => {
      render(<BrokenCounter />);
      const button = screen.getByText('Increment');
      
      // Click 5 times
      for (let i = 0; i < 5; i++) {
        fireEvent.click(button);
      }
      
      // Flag should appear
      expect(screen.getByText(/FLAG_1_COUNTER/)).toBeInTheDocument();
    });
  });

  describe('Challenge 2: Event Handler Issue', () => {
    test('should update message on button click', () => {
      render(<BrokenEventHandler />);
      
      const button1 = screen.getByText('Button 1');
      fireEvent.click(button1);
      
      expect(screen.getByText(/Message: Button 1/)).toBeInTheDocument();
    });

    test('should show flag when third button is clicked', () => {
      render(<BrokenEventHandler />);
      
      const button3 = screen.getByText('Button 3');
      fireEvent.click(button3);
      
      expect(screen.getByText(/FLAG_1_EVENTS/)).toBeInTheDocument();
    });
  });

  describe('Challenge 3: List Rendering', () => {
    test('should toggle list visibility', () => {
      render(<BrokenList />);
      
      const toggleButton = screen.getByText(/Toggle Items/);
      fireEvent.click(toggleButton);
      
      // List should be visible
      expect(screen.getByText('Apple')).toBeInTheDocument();
    });

    test('should add items to list', () => {
      render(<BrokenList />);
      
      const toggleButton = screen.getByText(/Toggle Items/);
      const addButton = screen.getByText('Add Item');
      
      // Show items
      fireEvent.click(toggleButton);
      
      // Add 2 items
      fireEvent.click(addButton);
      fireEvent.click(addButton);
      
      // Should have 5 items total
      expect(screen.getByText('Item 4')).toBeInTheDocument();
      expect(screen.getByText('Item 5')).toBeInTheDocument();
    });

    test('should show flag when list has 5+ items visible', () => {
      render(<BrokenList />);
      
      const toggleButton = screen.getByText(/Toggle Items/);
      const addButton = screen.getByText('Add Item');
      
      // Show items
      fireEvent.click(toggleButton);
      
      // Add 2 items to reach 5
      fireEvent.click(addButton);
      fireEvent.click(addButton);
      
      expect(screen.getByText(/FLAG_1_RENDERING/)).toBeInTheDocument();
    });
  });

  describe('Challenge 4: Props Handling', () => {
    test('should display all props correctly', () => {
      render(
        <UserCard 
          username="John Doe" 
          email="john@example.com" 
          age={30} 
        />
      );
      
      expect(screen.getByText(/Name: John Doe/)).toBeInTheDocument();
      expect(screen.getByText(/Email: john@example.com/)).toBeInTheDocument();
      expect(screen.getByText(/Age: 30/)).toBeInTheDocument();
    });

    test('should show flag when all props are displayed', () => {
      render(
        <UserCard 
          username="John Doe" 
          email="john@example.com" 
          age={30} 
        />
      );
      
      expect(screen.getByText(/FLAG_1_PROPS/)).toBeInTheDocument();
    });
  });

  describe('Challenge 5: Form State', () => {
    test('should update form fields', () => {
      render(<BrokenForm />);
      
      const nameInput = screen.getByPlaceholderText(/name/i) || screen.getAllByRole('textbox')[0];
      const emailInput = screen.getByPlaceholderText(/email/i) || screen.getAllByRole('textbox')[1];
      
      fireEvent.change(nameInput, { target: { value: 'Test User' } });
      fireEvent.change(emailInput, { target: { value: 'test@test.com' } });
      
      expect(screen.getByText(/Name: Test User/)).toBeInTheDocument();
      expect(screen.getByText(/Email: test@test.com/)).toBeInTheDocument();
    });

    test('should show flag when form is complete', () => {
      render(<BrokenForm />);
      
      const inputs = screen.getAllByRole('textbox');
      const textarea = screen.getByRole('textbox', { name: /message/i }) || inputs[2];
      
      fireEvent.change(inputs[0], { target: { name: 'name', value: 'Test User' } });
      fireEvent.change(inputs[1], { target: { name: 'email', value: 'test@test.com' } });
      fireEvent.change(textarea, { target: { name: 'message', value: 'This is a test message' } });
      
      expect(screen.getByText(/FLAG_1_FORM/)).toBeInTheDocument();
    });
  });
});

