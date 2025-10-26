import { render, screen, fireEvent } from '@testing-library/react';
import App from '../src/App';

/**
 * Integration Tests for React Developer Challenge
 * These tests ensure all features and challenges are working
 * NOT for solving challenges - just for verifying app functionality
 */

// Clear localStorage before each test to ensure clean state
beforeEach(() => {
  localStorage.clear();
});

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
      expect(screen.getAllByText(/0 \/ 28/i).length).toBeGreaterThan(0);
    });

    test('displays flag submission form', () => {
      render(<App />);
      expect(screen.getByPlaceholderText(/FLAG_X_CHALLENGENAME_XXXXXXXX/i)).toBeInTheDocument();
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
      
      const level1Text = screen.getByText(/Level 1: React Basics/i);
      fireEvent.click(level1Text);
      
      // Should show Level 1 header and back button
      expect(screen.getByText(/Back to Dashboard/i)).toBeInTheDocument();
      expect(screen.getByText(/Level 1: React Basics/i)).toBeInTheDocument();
    });

    test('can navigate back to dashboard from challenges', () => {
      render(<App />);
      
      // Navigate to Level 1
      const level1Text = screen.getByText(/Level 1: React Basics/i);
      fireEvent.click(level1Text);
      
      // Click back button
      const backButton = screen.getByText(/Back to Dashboard/i);
      fireEvent.click(backButton);
      
      // Should be back on dashboard
      expect(screen.getByText(/Choose Your Level/i)).toBeInTheDocument();
    });

    test('can navigate between levels using navigation buttons', () => {
      render(<App />);
      
      // Navigate to Level 1
      const level1Text = screen.getByText(/Level 1: React Basics/i);
      fireEvent.click(level1Text);
      
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
      
      const flagInput = screen.getByPlaceholderText(/FLAG_X_CHALLENGENAME_XXXXXXXX/i);
      const submitButton = screen.getByText(/Submit Flag/i);
      
      fireEvent.change(flagInput, { target: { value: 'FLAG_1_COUNTER_a3f8b2c1' } });
      fireEvent.click(submitButton);
      
      // Flag should be added to submitted flags
      expect(screen.getByText(/FLAG_1_COUNTER_a3f8b2c1/i)).toBeInTheDocument();
    });

    test('progress updates after flag submission', () => {
      render(<App />);
      
      // Initial progress should be 0/28
      expect(screen.getAllByText(/0 \/ 28/i).length).toBeGreaterThan(0);
      
      const flagInput = screen.getByPlaceholderText(/FLAG_X_CHALLENGENAME_XXXXXXXX/i);
      const submitButton = screen.getByText(/Submit Flag/i);
      
      fireEvent.change(flagInput, { target: { value: 'FLAG_1_COUNTER_a3f8b2c1' } });
      fireEvent.click(submitButton);
      
      // Progress should update to 1/28
      expect(screen.getAllByText(/1 \/ 28/i).length).toBeGreaterThan(0);
    });
  });
});

describe('Level 1 Challenges - Rendering Tests', () => {
  test('all Level 1 challenges render without crashing', () => {
    render(<App />);
    
    const level1Text = screen.getByText(/Level 1: React Basics/i);
    fireEvent.click(level1Text);
    
    // Check all challenge names are present (use getAllByText for names that appear multiple times)
    expect(screen.getByText(/Counter Bug/i)).toBeInTheDocument();
    expect(screen.getAllByText(/Event Handler/i).length).toBeGreaterThan(0);
    expect(screen.getByText(/List Rendering/i)).toBeInTheDocument();
    expect(screen.getByText(/Props Handling/i)).toBeInTheDocument();
    expect(screen.getAllByText(/Form State/i).length).toBeGreaterThan(0);
  });

  test('Level 1 shows 5 challenges', () => {
    render(<App />);
    
    expect(screen.getAllByText(/5 Challenges/i).length).toBeGreaterThan(0);
  });
});

describe('Level 2 Challenges - Rendering Tests', () => {
  test('all Level 2 challenges render without crashing', () => {
    render(<App />);
    
    const level2Text = screen.getByText(/Level 2: React Hooks/i);
    fireEvent.click(level2Text);
    
    // Check challenge names are present (use getAllByText for names that appear multiple times)
    expect(screen.getAllByText(/useEffect Deps/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/Infinite Loop/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/Custom Hook/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/useCallback/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/Memory Leak/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/useRef/i).length).toBeGreaterThan(0);
  });

  test('Level 2 shows 6 challenges', () => {
    render(<App />);
    
    expect(screen.getAllByText(/6 Challenges/i).length).toBeGreaterThan(0);
  });
});

describe('Level 3 Challenges - Rendering Tests', () => {
  test('all Level 3 challenges render without crashing', () => {
    render(<App />);
    
    const level3Text = screen.getByText(/Level 3: State Management/i);
    fireEvent.click(level3Text);
    
    // Check challenge names are present (use getAllByText for names that appear multiple times)
    expect(screen.getAllByText(/Context Provider/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/Reducer Logic/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/State Batching/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/Nested State/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/Context Perf/i).length).toBeGreaterThan(0);
  });

  test('Level 3 shows 5 challenges', () => {
    render(<App />);
    
    expect(screen.getAllByText(/5 Challenges/i).length).toBeGreaterThan(0);
  });
});

describe('Level 4 Challenges - Rendering Tests', () => {
  test('all Level 4 challenges render without crashing', () => {
    render(<App />);
    
    const level4Text = screen.getByText(/Level 4: Performance/i);
    fireEvent.click(level4Text);
    
    // Check challenge names are present (use getAllByText for names that appear multiple times)
    expect(screen.getAllByText(/useMemo/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/React.memo/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/Large List/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/Event Optimization/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/Code Splitting/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/Debouncing/i).length).toBeGreaterThan(0);
  });

  test('Level 4 shows 6 challenges', () => {
    render(<App />);
    
    expect(screen.getAllByText(/6 Challenges/i).length).toBeGreaterThan(0);
  });
});

describe('Level 5 Challenges - Rendering Tests', () => {
  test('all Level 5 challenges render without crashing', () => {
    render(<App />);
    
    const level5Text = screen.getByText(/Level 5: Advanced Patterns/i);
    fireEvent.click(level5Text);
    
    // Check challenge names are present (use getAllByText for names that appear multiple times)
    expect(screen.getAllByText(/Compound Components/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/Render Props/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/HOC/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/Portal/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/Error Boundary/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/Hooks Composition/i).length).toBeGreaterThan(0);
  });

  test('Level 5 shows 6 challenges', () => {
    render(<App />);
    
    expect(screen.getAllByText(/6 Challenges/i).length).toBeGreaterThan(0);
  });
});

describe('Challenge Completion Tracking', () => {
  test('challenges show pending status initially', () => {
    render(<App />);
    
    const level1Text = screen.getByText(/Level 1: React Basics/i);
    fireEvent.click(level1Text);
    
    // Should show pending badges
    const pendingBadges = screen.getAllByText(/Pending/i);
    expect(pendingBadges.length).toBeGreaterThan(0);
  });

  test('completed challenges are tracked per level', () => {
    render(<App />);
    
    // Submit a Level 1 flag
    const flagInput = screen.getByPlaceholderText(/FLAG_X_CHALLENGENAME_XXXXXXXX/i);
    const submitButton = screen.getByText(/Submit Flag/i);
    
    fireEvent.change(flagInput, { target: { value: 'FLAG_1_COUNTER_a3f8b2c1' } });
    fireEvent.click(submitButton);
    
    // Check Level 1 completion count updated
    expect(screen.getByText(/1\/5 Completed/i)).toBeInTheDocument();
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
    render(<App />);
    // Check for progress text which indicates progress bar is present
    expect(screen.getAllByText(/0 \/ 28/i).length).toBeGreaterThan(0);
  });

  test('challenge cards are interactive', () => {
    render(<App />);
    
    const level1Text = screen.getByText(/Level 1: React Basics/i);
    
    // Should be clickable
    fireEvent.click(level1Text);
    expect(screen.getByText(/Back to Dashboard/i)).toBeInTheDocument();
  });
});

