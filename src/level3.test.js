import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import {
  BrokenThemeProvider,
  BrokenThemeConsumer,
  BrokenReducer,
  BrokenStateBatching,
  BrokenNestedState
} from '../src/challenges/level3/StateManagementChallenge';

describe('Level 3: State Management Challenges', () => {
  
  describe('Challenge 1: Context Provider', () => {
    test('should toggle theme', () => {
      render(
        <BrokenThemeProvider>
          <BrokenThemeConsumer />
        </BrokenThemeProvider>
      );
      
      const button = screen.getByText('Toggle Theme');
      expect(screen.getByText(/Current Theme: light/)).toBeInTheDocument();
      
      fireEvent.click(button);
      expect(screen.getByText(/Current Theme: dark/)).toBeInTheDocument();
    });

    test('should show flag after 3 toggles', () => {
      render(
        <BrokenThemeProvider>
          <BrokenThemeConsumer />
        </BrokenThemeProvider>
      );
      
      const button = screen.getByText('Toggle Theme');
      
      for (let i = 0; i < 3; i++) {
        fireEvent.click(button);
      }
      
      expect(screen.getByText(/FLAG_3_CONTEXT/)).toBeInTheDocument();
    });
  });

  describe('Challenge 2: Reducer Logic', () => {
    test('should increment count', () => {
      render(<BrokenReducer />);
      
      const incrementButton = screen.getByText('Increment');
      
      fireEvent.click(incrementButton);
      expect(screen.getByText(/Count: 1/)).toBeInTheDocument();
    });

    test('should track history', () => {
      render(<BrokenReducer />);
      
      const incrementButton = screen.getByText('Increment');
      
      fireEvent.click(incrementButton);
      fireEvent.click(incrementButton);
      
      expect(screen.getByText(/History: 1, 2/)).toBeInTheDocument();
    });

    test('should show flag when count is 5', () => {
      render(<BrokenReducer />);
      
      const incrementButton = screen.getByText('Increment');
      
      for (let i = 0; i < 5; i++) {
        fireEvent.click(incrementButton);
      }
      
      expect(screen.getByText(/FLAG_3_REDUCER/)).toBeInTheDocument();
    });
  });

  describe('Challenge 3: State Batching', () => {
    test('should update all values together', () => {
      render(<BrokenStateBatching />);
      
      const button = screen.getByText('Update All');
      
      fireEvent.click(button);
      
      expect(screen.getByText(/Count: 1/)).toBeInTheDocument();
      expect(screen.getByText(/Doubled: 2/)).toBeInTheDocument();
      expect(screen.getByText(/Tripled: 3/)).toBeInTheDocument();
    });

    test('should show flag when values are correct', () => {
      render(<BrokenStateBatching />);
      
      const button = screen.getByText('Update All');
      
      for (let i = 0; i < 5; i++) {
        fireEvent.click(button);
      }
      
      expect(screen.getByText(/FLAG_3_BATCH/)).toBeInTheDocument();
    });
  });

  describe('Challenge 4: Nested State', () => {
    test('should update nested name', () => {
      render(<BrokenNestedState />);
      
      const nameInput = screen.getAllByRole('textbox')[0];
      
      fireEvent.change(nameInput, { target: { value: 'John' } });
      
      expect(nameInput.value).toBe('John');
    });

    test('should update nested email', () => {
      render(<BrokenNestedState />);
      
      const emailInput = screen.getAllByRole('textbox')[1];
      
      fireEvent.change(emailInput, { target: { value: 'john@test.com' } });
      
      expect(emailInput.value).toBe('john@test.com');
    });

    test('should toggle notifications', () => {
      render(<BrokenNestedState />);
      
      const checkbox = screen.getByRole('checkbox');
      
      fireEvent.click(checkbox);
      
      expect(checkbox).toBeChecked();
    });

    test('should show flag when all fields are correct', () => {
      render(<BrokenNestedState />);
      
      const inputs = screen.getAllByRole('textbox');
      const checkbox = screen.getByRole('checkbox');
      
      fireEvent.change(inputs[0], { target: { value: 'John' } });
      fireEvent.change(inputs[1], { target: { value: 'john@test.com' } });
      fireEvent.click(checkbox);
      
      expect(screen.getByText(/FLAG_3_NESTED/)).toBeInTheDocument();
    });
  });
});

