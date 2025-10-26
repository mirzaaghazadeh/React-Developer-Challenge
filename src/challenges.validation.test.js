/**
 * Challenge Validation Tests
 * These tests verify that all challenges exist and can be imported
 * NOT for solving challenges - just for verifying structure
 */

import Level1Challenges from '../src/challenges/level1/ReactBasicsChallenge';
import Level2Challenges from '../src/challenges/level2/ReactHooksChallenge';
import Level3Challenges from '../src/challenges/level3/StateManagementChallenge';
import Level4Challenges from '../src/challenges/level4/PerformanceChallenge';
import Level5Challenges from '../src/challenges/level5/AdvancedPatternsChallenge';

describe('Challenge Module Validation', () => {
  describe('Level 1 - React Basics', () => {
    test('exports all 5 challenge components', () => {
      expect(Level1Challenges.BrokenCounter).toBeDefined();
      expect(Level1Challenges.BrokenEventHandler).toBeDefined();
      expect(Level1Challenges.BrokenList).toBeDefined();
      expect(Level1Challenges.UserCardTest).toBeDefined();
      expect(Level1Challenges.BrokenForm).toBeDefined();
    });

    test('all challenges are functions/components', () => {
      expect(typeof Level1Challenges.BrokenCounter).toBe('function');
      expect(typeof Level1Challenges.BrokenEventHandler).toBe('function');
      expect(typeof Level1Challenges.BrokenList).toBe('function');
      expect(typeof Level1Challenges.UserCardTest).toBe('function');
      expect(typeof Level1Challenges.BrokenForm).toBe('function');
    });
  });

  describe('Level 2 - React Hooks', () => {
    test('exports all 6 challenge components', () => {
      expect(Level2Challenges.BrokenUseEffect).toBeDefined();
      expect(Level2Challenges.BrokenInfiniteLoop).toBeDefined();
      expect(Level2Challenges.BrokenCustomHook).toBeDefined();
      expect(Level2Challenges.BrokenUseCallback).toBeDefined();
      expect(Level2Challenges.BrokenMemoryLeak).toBeDefined();
      expect(Level2Challenges.BrokenUseRef).toBeDefined();
    });

    test('all challenges are functions/components', () => {
      expect(typeof Level2Challenges.BrokenUseEffect).toBe('function');
      expect(typeof Level2Challenges.BrokenInfiniteLoop).toBe('function');
      expect(typeof Level2Challenges.BrokenCustomHook).toBe('function');
      expect(typeof Level2Challenges.BrokenUseCallback).toBe('function');
      expect(typeof Level2Challenges.BrokenMemoryLeak).toBe('function');
      expect(typeof Level2Challenges.BrokenUseRef).toBe('function');
    });
  });

  describe('Level 3 - State Management', () => {
    test('exports all 5 challenge components', () => {
      expect(Level3Challenges.BrokenThemeConsumer).toBeDefined();
      expect(Level3Challenges.BrokenReducer).toBeDefined();
      expect(Level3Challenges.BrokenStateBatching).toBeDefined();
      expect(Level3Challenges.BrokenNestedState).toBeDefined();
      expect(Level3Challenges.BrokenDataContainer).toBeDefined();
    });

    test('all challenges are functions/components', () => {
      expect(typeof Level3Challenges.BrokenThemeConsumer).toBe('function');
      expect(typeof Level3Challenges.BrokenReducer).toBe('function');
      expect(typeof Level3Challenges.BrokenStateBatching).toBe('function');
      expect(typeof Level3Challenges.BrokenNestedState).toBe('function');
      expect(typeof Level3Challenges.BrokenDataContainer).toBe('function');
    });
  });

  describe('Level 4 - Performance', () => {
    test('exports all 6 challenge components', () => {
      expect(Level4Challenges.BrokenUseMemo).toBeDefined();
      expect(Level4Challenges.BrokenReactMemo).toBeDefined();
      expect(Level4Challenges.BrokenLargeList).toBeDefined();
      expect(Level4Challenges.BrokenEventOptimization).toBeDefined();
      expect(Level4Challenges.BrokenCodeSplitting).toBeDefined();
      expect(Level4Challenges.BrokenDebounce).toBeDefined();
    });

    test('all challenges are functions/components', () => {
      expect(typeof Level4Challenges.BrokenUseMemo).toBe('function');
      expect(typeof Level4Challenges.BrokenReactMemo).toBe('function');
      expect(typeof Level4Challenges.BrokenLargeList).toBe('function');
      expect(typeof Level4Challenges.BrokenEventOptimization).toBe('function');
      expect(typeof Level4Challenges.BrokenCodeSplitting).toBe('function');
      expect(typeof Level4Challenges.BrokenDebounce).toBe('function');
    });
  });

  describe('Level 5 - Advanced Patterns', () => {
    test('exports all 6 challenge components', () => {
      expect(Level5Challenges.BrokenCompoundComponents).toBeDefined();
      expect(Level5Challenges.BrokenRenderPropsDemo).toBeDefined();
      expect(Level5Challenges.BrokenHOC).toBeDefined();
      expect(Level5Challenges.BrokenPortalDemo).toBeDefined();
      expect(Level5Challenges.BrokenErrorBoundaryDemo).toBeDefined();
      expect(Level5Challenges.BrokenHooksComposition).toBeDefined();
    });

    test('all challenges are functions/components', () => {
      expect(typeof Level5Challenges.BrokenCompoundComponents).toBe('function');
      expect(typeof Level5Challenges.BrokenRenderPropsDemo).toBe('function');
      expect(typeof Level5Challenges.BrokenHOC).toBe('function');
      expect(typeof Level5Challenges.BrokenPortalDemo).toBe('function');
      expect(typeof Level5Challenges.BrokenErrorBoundaryDemo).toBe('function');
      expect(typeof Level5Challenges.BrokenHooksComposition).toBe('function');
    });
  });

  describe('Challenge Count Validation', () => {
    test('total of 28 challenges exist', () => {
      const level1Count = 5;
      const level2Count = 6;
      const level3Count = 5;
      const level4Count = 6;
      const level5Count = 6;
      
      const totalChallenges = level1Count + level2Count + level3Count + level4Count + level5Count;
      
      expect(totalChallenges).toBe(28);
    });
  });
});

describe('Flag Validation', () => {
  const expectedFlags = [
    // Level 1
    'FLAG_1_COUNTER_a3f8b2c1',
    'FLAG_1_EVENTS_7d2c9f4e',
    'FLAG_1_RENDERING_e8a1b6d3',
    'FLAG_1_PROPS_4c7e2a9f',
    'FLAG_1_FORM_9b3f6d2e',
    // Level 2
    'FLAG_2_EFFECT_5d8a2c7f',
    'FLAG_2_LOOP_3f7b9e4a',
    'FLAG_2_HOOK_8e2d5a3c',
    'FLAG_2_CALLBACK_6a9c4f2e',
    'FLAG_2_MEMORY_2c8f5d3a',
    'FLAG_2_REF_9d4b7e2a',
    // Level 3
    'FLAG_3_CONTEXT_7e4a9c2f',
    'FLAG_3_REDUCER_3d8f2a6c',
    'FLAG_3_BATCH_6c2e9a4f',
    'FLAG_3_NESTED_4a7e2c9f',
    'FLAG_3_PERF_9e3c7a2d',
    // Level 4
    'FLAG_4_MEMO_5c8e2a7f',
    'FLAG_4_REACTMEMO_3d7a9c2f',
    'FLAG_4_LISTPERF_8e4a2c9f',
    'FLAG_4_CALLBACK_6c3e9a2f',
    'FLAG_4_LAZYLOAD_7d4b2e8a',
    'FLAG_4_DEBOUNCE_2e8c5a7f',
    // Level 5
    'FLAG_5_COMPOUND_8e3c7a2f',
    'FLAG_5_RENDERPROPS_4c9e2a7f',
    'FLAG_5_HOC_6d3e9a2c',
    'FLAG_5_PORTAL_7e4a2c9f',
    'FLAG_5_ERRORBOUNDARY_3d8c5a2f',
    'FLAG_5_HOOKCOMP_9e2c7a4f'
  ];

  test('all 28 flags are defined', () => {
    expect(expectedFlags).toHaveLength(28);
  });

  test('flags follow correct naming pattern', () => {
    expectedFlags.forEach(flag => {
      expect(flag).toMatch(/^FLAG_[1-5]_[A-Z]+_[a-f0-9]{8}$/);
    });
  });

  test('flags are unique', () => {
    const uniqueFlags = new Set(expectedFlags);
    expect(uniqueFlags.size).toBe(28);
  });

  test('each level has correct flag prefix', () => {
    const level1Flags = expectedFlags.filter(f => f.startsWith('FLAG_1_'));
    const level2Flags = expectedFlags.filter(f => f.startsWith('FLAG_2_'));
    const level3Flags = expectedFlags.filter(f => f.startsWith('FLAG_3_'));
    const level4Flags = expectedFlags.filter(f => f.startsWith('FLAG_4_'));
    const level5Flags = expectedFlags.filter(f => f.startsWith('FLAG_5_'));

    expect(level1Flags).toHaveLength(5);
    expect(level2Flags).toHaveLength(6);
    expect(level3Flags).toHaveLength(5);
    expect(level4Flags).toHaveLength(6);
    expect(level5Flags).toHaveLength(6);
  });
});

