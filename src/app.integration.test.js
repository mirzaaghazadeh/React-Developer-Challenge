import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import App from '../src/App';

/**
 * Integration Tests for React Developer Challenge
 * These tests ensure all features and challenges are working
 * NOT for solving challenges - just for verifying app functionality
 */

describe('App Integration Tests', () => {
  describe('Dashboard Functionality', () => {
    test('renders dashboard with title and all levels', () => {
      render(<App />);
      
      // Check main title
      expect(screen.getByText(/React Developer Challenge/i)).toBeInTheDocument();
      
      // Check all 5 levels are displayed
      expect(screen.getByText(/Level 1: React Basics/i)).toBeInTheDocument();
      expect(screen.getByText(/Level 2: React Hooks/i)).toBeInTheDocument();
      expect(screen.getByText(/Level 3: State Management/i)).toBeInTheDocument();
      expect(screen.getByText(/Level 4: Performance/i)).toBeInTheDocument();
      expect(screen.getByText(/Level 5: Advanced Patterns/i)).toBeInTheDocument();
    });

    test('displays progress tracking component', () => {
      render(<App />);
      expect(screen.getByText(/0 \/ 27/i)).toBeInTheDocument();
    });

    test('displays flag submission form', () => {
      render(<App />);
      expect(screen.getByPlaceholderText(/Enter flag here/i)).toBeInTheDocument();
      expect(screen.getByText(/Submit Flag/i)).toBeInTheDocument();
    });

    test('displays author information', () => {
      render(<App />);
      expect(screen.getByText(/Created by/i)).toBeInTheDocument();
      expect(screen.getByText(/Navid Mirzaaghazadeh/i)).toBeInTheDocument();
    });
  });

  describe('Navigation Functionality', () => {
    test('can navigate to Level 1 challenges', () => {
      render(<App />);
      
      const level1Card = screen.getByText(/Level 1: React Basics/i).closest('.level-card');
      fireEvent.click(level1Card);
      
      // Should show Level 1 header and back button
      expect(screen.getByText(/Back to Dashboard/i)).toBeInTheDocument();
      expect(screen.getByText(/Level 1: React Basics/i)).toBeInTheDocument();
    });

    test('can navigate back to dashboard from challenges', () => {
      render(<App />);
      
      // Navigate to Level 1
      const level1Card = screen.getByText(/Level 1: React Basics/i).closest('.level-card');
      fireEvent.click(level1Card);
      
      // Click back button
      const backButton = screen.getByText(/Back to Dashboard/i);
      fireEvent.click(backButton);
      
      // Should be back on dashboard
      expect(screen.getByText(/Choose Your Level/i)).toBeInTheDocument();
    });

    test('can navigate between levels using navigation buttons', () => {
      render(<App />);
      
      // Navigate to Level 1
      const level1Card = screen.getByText(/Level 1: React Basics/i).closest('.level-card');
      fireEvent.click(level1Card);
      
      // Click Next Level button
      const nextButton = screen.getByText(/Next Level →/i);
      fireEvent.click(nextButton);
      
      // Should be on Level 2
      expect(screen.getByText(/Level 2: React Hooks/i)).toBeInTheDocument();
    });
  });

  describe('Flag Submission Functionality', () => {
    test('can submit a flag', () => {
      render(<App />);
      
      const flagInput = screen.getByPlaceholderText(/Enter flag here/i);
      const submitButton = screen.getByText(/Submit Flag/i);
      
      fireEvent.change(flagInput, { target: { value: 'FLAG_1_COUNTER_a3f8b2c1' } });
      fireEvent.click(submitButton);
      
      // Flag should be added to submitted flags
      expect(screen.getByText(/FLAG_1_COUNTER_a3f8b2c1/i)).toBeInTheDocument();
    });

    test('progress updates after flag submission', () => {
      render(<App />);
      
      // Initial progress should be 0/27
      expect(screen.getByText(/0 \/ 27/i)).toBeInTheDocument();
      
      const flagInput = screen.getByPlaceholderText(/Enter flag here/i);
      const submitButton = screen.getByText(/Submit Flag/i);
      
      fireEvent.change(flagInput, { target: { value: 'FLAG_1_COUNTER_a3f8b2c1' } });
      fireEvent.click(submitButton);
      
      // Progress should update to 1/27
      expect(screen.getByText(/1 \/ 27/i)).toBeInTheDocument();
    });
  });
});

describe('Level 1 Challenges - Rendering Tests', () => {
  test('all Level 1 challenges render without crashing', () => {
    render(<App />);
    
    const level1Card = screen.getByText(/Level 1: React Basics/i).closest('.level-card');
    fireEvent.click(level1Card);
    
    // Check all challenge names are present
    expect(screen.getByText(/Counter Bug/i)).toBeInTheDocument();
    expect(screen.getByText(/Event Handler/i)).toBeInTheDocument();
    expect(screen.getByText(/List Rendering/i)).toBeInTheDocument();
    expect(screen.getByText(/Props Handling/i)).toBeInTheDocument();
    expect(screen.getByText(/Form State/i)).toBeInTheDocument();
  });

  test('Level 1 shows 5 challenges', () => {
    render(<App />);
    
    const level1Card = screen.getByText(/Level 1: React Basics/i).closest('.level-card');
    expect(level1Card).toHaveTextContent('5 Challenges');
  });
});

describe('Level 2 Challenges - Rendering Tests', () => {
  test('all Level 2 challenges render without crashing', () => {
    render(<App />);
    
    const level2Card = screen.getByText(/Level 2: React Hooks/i).closest('.level-card');
    fireEvent.click(level2Card);
    
    // Check challenge names are present
    expect(screen.getByText(/useEffect Deps/i)).toBeInTheDocument();
    expect(screen.getByText(/Infinite Loop/i)).toBeInTheDocument();
    expect(screen.getByText(/Custom Hook/i)).toBeInTheDocument();
    expect(screen.getByText(/useCallback/i)).toBeInTheDocument();
    expect(screen.getByText(/Memory Leak/i)).toBeInTheDocument();
    expect(screen.getByText(/useRef/i)).toBeInTheDocument();
  });

  test('Level 2 shows 6 challenges', () => {
    render(<App />);
    
    const level2Card = screen.getByText(/Level 2: React Hooks/i).closest('.level-card');
    expect(level2Card).toHaveTextContent('6 Challenges');
  });
});

describe('Level 3 Challenges - Rendering Tests', () => {
  test('all Level 3 challenges render without crashing', () => {
    render(<App />);
    
    const level3Card = screen.getByText(/Level 3: State Management/i).closest('.level-card');
    fireEvent.click(level3Card);
    
    // Check challenge names are present
    expect(screen.getByText(/Context Provider/i)).toBeInTheDocument();
    expect(screen.getByText(/Reducer Logic/i)).toBeInTheDocument();
    expect(screen.getByText(/State Batching/i)).toBeInTheDocument();
    expect(screen.getByText(/Nested State/i)).toBeInTheDocument();
    expect(screen.getByText(/Context Perf/i)).toBeInTheDocument();
  });

  test('Level 3 shows 5 challenges', () => {
    render(<App />);
    
    const level3Card = screen.getByText(/Level 3: State Management/i).closest('.level-card');
    expect(level3Card).toHaveTextContent('5 Challenges');
  });
});

describe('Level 4 Challenges - Rendering Tests', () => {
  test('all Level 4 challenges render without crashing', () => {
    render(<App />);
    
    const level4Card = screen.getByText(/Level 4: Performance/i).closest('.level-card');
    fireEvent.click(level4Card);
    
    // Check challenge names are present
    expect(screen.getByText(/useMemo/i)).toBeInTheDocument();
    expect(screen.getByText(/React.memo/i)).toBeInTheDocument();
    expect(screen.getByText(/Large List/i)).toBeInTheDocument();
    expect(screen.getByText(/Event Optimization/i)).toBeInTheDocument();
    expect(screen.getByText(/Code Splitting/i)).toBeInTheDocument();
    expect(screen.getByText(/Debouncing/i)).toBeInTheDocument();
  });

  test('Level 4 shows 6 challenges', () => {
    render(<App />);
    
    const level4Card = screen.getByText(/Level 4: Performance/i).closest('.level-card');
    expect(level4Card).toHaveTextContent('6 Challenges');
  });
});

describe('Level 5 Challenges - Rendering Tests', () => {
  test('all Level 5 challenges render without crashing', () => {
    render(<App />);
    
    const level5Card = screen.getByText(/Level 5: Advanced Patterns/i).closest('.level-card');
    fireEvent.click(level5Card);
    
    // Check challenge names are present
    expect(screen.getByText(/Compound Components/i)).toBeInTheDocument();
    expect(screen.getByText(/Render Props/i)).toBeInTheDocument();
    expect(screen.getByText(/HOC/i)).toBeInTheDocument();
    expect(screen.getByText(/Portal/i)).toBeInTheDocument();
    expect(screen.getByText(/Error Boundary/i)).toBeInTheDocument();
    expect(screen.getByText(/Hooks Composition/i)).toBeInTheDocument();
  });

  test('Level 5 shows 6 challenges', () => {
    render(<App />);
    
    const level5Card = screen.getByText(/Level 5: Advanced Patterns/i).closest('.level-card');
    expect(level5Card).toHaveTextContent('6 Challenges');
  });
});

describe('Challenge Completion Tracking', () => {
  test('challenges show pending status initially', () => {
    render(<App />);
    
    const level1Card = screen.getByText(/Level 1: React Basics/i).closest('.level-card');
    fireEvent.click(level1Card);
    
    // Should show pending badges
    const pendingBadges = screen.getAllByText(/Pending/i);
    expect(pendingBadges.length).toBeGreaterThan(0);
  });

  test('completed challenges are tracked per level', () => {
    render(<App />);
    
    // Submit a Level 1 flag
    const flagInput = screen.getByPlaceholderText(/Enter flag here/i);
    const submitButton = screen.getByText(/Submit Flag/i);
    
    fireEvent.change(flagInput, { target: { value: 'FLAG_1_COUNTER_a3f8b2c1' } });
    fireEvent.click(submitButton);
    
    // Check Level 1 completion count updated
    const level1Card = screen.getByText(/Level 1: React Basics/i).closest('.level-card');
    expect(level1Card).toHaveTextContent('1/5 Completed');
  });
});

describe('Responsive Design and UI Elements', () => {
  test('displays all UI components on dashboard', () => {
    render(<App />);
    
    // Check for main UI elements
    expect(screen.getByText(/Choose Your Level/i)).toBeInTheDocument();
    expect(screen.getByText(/Target Time: 45 minutes/i)).toBeInTheDocument();
  });

  test('displays progress bar', () => {
    const { container } = render(<App />);
    const progressBar = container.querySelector('.progress-bar');
    expect(progressBar).toBeInTheDocument();
  });

  test('challenge cards are interactive', () => {
    render(<App />);
    
    const level1Card = screen.getByText(/Level 1: React Basics/i).closest('.level-card');
    expect(level1Card).toHaveClass('level-card');
    
    // Should be clickable
    fireEvent.click(level1Card);
    expect(screen.getByText(/Back to Dashboard/i)).toBeInTheDocument();
  });
});

