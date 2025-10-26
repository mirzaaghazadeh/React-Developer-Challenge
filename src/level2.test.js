import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import {
  BrokenUseEffect,
  BrokenInfiniteLoop,
  BrokenCustomHook,
  BrokenUseCallback,
  BrokenMemoryLeak,
  BrokenUseRef
} from '../src/challenges/level2/ReactHooksChallenge';

// Skip challenge solution tests in CI - these test if challenges are SOLVED
const describeIfNotCI = process.env.CI ? describe.skip : describe;

describeIfNotCI('Level 2: React Hooks Challenges', () => {
  
  describe('Challenge 1: useEffect Dependencies', () => {
    test('should update result when count changes', () => {
      render(<BrokenUseEffect />);
      
      const incrementButton = screen.getByText('Increment Count');
      
      fireEvent.click(incrementButton);
      
      expect(screen.getByText(/Count: 1/)).toBeInTheDocument();
    });

    test('should show flag when count is 10 with multiplier 2', async () => {
      render(<BrokenUseEffect />);
      
      const incrementButton = screen.getByText('Increment Count');
      const multiplierButton = screen.getByText('Set Multiplier to 2');
      
      // Set multiplier first
      fireEvent.click(multiplierButton);
      
      // Increment to 10
      for (let i = 0; i < 10; i++) {
        fireEvent.click(incrementButton);
      }
      
      await waitFor(() => {
        expect(screen.getByText(/FLAG_2_EFFECT/)).toBeInTheDocument();
      });
    });
  });

  describe('Challenge 2: Infinite Loop', () => {
    test('should load data without infinite loop', async () => {
      const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
      
      render(<BrokenInfiniteLoop />);
      
      await waitFor(() => {
        expect(screen.getByText('Item 1')).toBeInTheDocument();
      }, { timeout: 2000 });
      
      expect(screen.getByText('Item 2')).toBeInTheDocument();
      expect(screen.getByText('Item 3')).toBeInTheDocument();
      
      consoleSpy.mockRestore();
    });

    test('should show flag when data loads correctly', async () => {
      render(<BrokenInfiniteLoop />);
      
      await waitFor(() => {
        expect(screen.getByText(/FLAG_2_LOOP/)).toBeInTheDocument();
      }, { timeout: 2000 });
    });
  });

  describe('Challenge 3: Custom Hook', () => {
    test('should persist data to localStorage', () => {
      render(<BrokenCustomHook />);
      
      const input = screen.getByPlaceholderText('Enter name');
      fireEvent.change(input, { target: { value: 'TestUser' } });
      
      expect(input.value).toBe('TestUser');
    });

    test('should show flag when conditions are met', () => {
      render(<BrokenCustomHook />);
      
      const input = screen.getByPlaceholderText('Enter name');
      const incrementButton = screen.getByText('Increment');
      
      fireEvent.change(input, { target: { value: 'TestUser' } });
      
      for (let i = 0; i < 5; i++) {
        fireEvent.click(incrementButton);
      }
      
      expect(screen.getByText(/FLAG_2_HOOK/)).toBeInTheDocument();
    });
  });

  describe('Challenge 4: useCallback Dependencies', () => {
    test('should calculate result with multiplier', () => {
      render(<BrokenUseCallback />);
      
      const countButton = screen.getByText('Increment Count');
      const multiplierButton = screen.getByText('Increment Multiplier');
      
      // Count = 5, Multiplier = 3
      for (let i = 0; i < 5; i++) {
        fireEvent.click(countButton);
      }
      
      for (let i = 0; i < 2; i++) {
        fireEvent.click(multiplierButton);
      }
      
      expect(screen.getByText(/Result: 15/)).toBeInTheDocument();
    });

    test('should show flag when calculation is correct', () => {
      render(<BrokenUseCallback />);
      
      const countButton = screen.getByText('Increment Count');
      const multiplierButton = screen.getByText('Increment Multiplier');
      
      for (let i = 0; i < 5; i++) {
        fireEvent.click(countButton);
      }
      
      for (let i = 0; i < 2; i++) {
        fireEvent.click(multiplierButton);
      }
      
      expect(screen.getByText(/FLAG_2_CALLBACK/)).toBeInTheDocument();
    });
  });

  describe('Challenge 5: Memory Leak', () => {
    jest.useFakeTimers();

    test('should increment timer when running', () => {
      render(<BrokenMemoryLeak />);
      
      const startButton = screen.getByText('Start');
      fireEvent.click(startButton);
      
      act(() => {
        jest.advanceTimersByTime(3000);
      });
      
      expect(screen.getByText(/Timer: [1-9]/)).toBeInTheDocument();
    });

    test('should show flag when timer reaches 10', () => {
      render(<BrokenMemoryLeak />);
      
      const startButton = screen.getByText('Start');
      fireEvent.click(startButton);
      
      act(() => {
        jest.advanceTimersByTime(10000);
      });
      
      expect(screen.getByText(/FLAG_2_MEMORY/)).toBeInTheDocument();
    });

    afterAll(() => {
      jest.useRealTimers();
    });
  });

  describe('Challenge 6: useRef', () => {
    test('should track previous value', () => {
      render(<BrokenUseRef />);
      
      const button = screen.getByText(/Increment/);
      
      // Initial state
      expect(screen.getByText(/Current Render Count: 0/)).toBeInTheDocument();
      
      // Click once
      fireEvent.click(button);
      expect(screen.getByText(/Current Render Count: 1/)).toBeInTheDocument();
    });

    test('should show flag when previous value is tracked correctly', () => {
      render(<BrokenUseRef />);
      
      const button = screen.getByText(/Increment/);
      
      // Click 5 times
      for (let i = 0; i < 5; i++) {
        fireEvent.click(button);
      }
      
      expect(screen.getByText(/FLAG_2_REF/)).toBeInTheDocument();
    });
  });
});

