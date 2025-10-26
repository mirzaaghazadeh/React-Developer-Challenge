/**
 * React Developer Challenge
 * 
 * Created by Navid Mirzaaghazadeh
 * GitHub: https://github.com/mirzaaghazadeh
 * 
 * A comprehensive challenge system to test React developers' skills
 */

import React, { useState, useEffect } from 'react';
import './App.css';
import ChallengeLayout from './components/ChallengeLayout/ChallengeLayout';
import FlagSubmission from './components/FlagSubmission/FlagSubmission';
import Progress from './components/Progress/Progress';
import HintSystem from './components/HintSystem/HintSystem';
import Statistics from './components/Statistics/Statistics';
import { challengeHints, getTotalHints } from './utils/challengeHints';

// Import all challenges
import Level1Challenges from './challenges/level1/ReactBasicsChallenge';
import Level2Challenges from './challenges/level2/ReactHooksChallenge';
import Level3Challenges from './challenges/level3/StateManagementChallenge';
import Level4Challenges from './challenges/level4/PerformanceChallenge';
import Level5Challenges from './challenges/level5/AdvancedPatternsChallenge';

// LocalStorage keys
const STORAGE_KEYS = {
  SUBMITTED_FLAGS: 'react-challenge-submitted-flags',
  HINTS_USED: 'react-challenge-hints-used'
};

function App() {
  const [currentLevel, setCurrentLevel] = useState(0);
  const [submittedFlags, setSubmittedFlags] = useState(() => {
    // Load from localStorage on initial render
    const saved = localStorage.getItem(STORAGE_KEYS.SUBMITTED_FLAGS);
    return saved ? JSON.parse(saved) : [];
  });
  const [showDashboard, setShowDashboard] = useState(true);
  const [hintsUsed, setHintsUsed] = useState(() => {
    // Load from localStorage on initial render
    const saved = localStorage.getItem(STORAGE_KEYS.HINTS_USED);
    return saved ? parseInt(saved, 10) : 0;
  });

  // Save submitted flags to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.SUBMITTED_FLAGS, JSON.stringify(submittedFlags));
  }, [submittedFlags]);

  // Save hints used to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.HINTS_USED, hintsUsed.toString());
  }, [hintsUsed]);

  const levels = [
    {
      id: 1,
      name: 'Level 1: React Basics',
      description: 'Fix basic React component issues',
      challenges: [
        { name: 'Counter Bug', component: Level1Challenges.BrokenCounter, flag: 'FLAG_1_COUNTER_a3f8b2c1', hintId: 'level1-counter' },
        { name: 'Event Handler', component: Level1Challenges.BrokenEventHandler, flag: 'FLAG_1_EVENTS_7d2c9f4e', hintId: 'level1-events' },
        { name: 'List Rendering', component: Level1Challenges.BrokenList, flag: 'FLAG_1_RENDERING_e8a1b6d3', hintId: 'level1-list' },
        { name: 'Props Handling', component: Level1Challenges.UserCardTest, flag: 'FLAG_1_PROPS_4c7e2a9f', hintId: 'level1-props' },
        { name: 'Form State', component: Level1Challenges.BrokenForm, flag: 'FLAG_1_FORM_9b3f6d2e', hintId: 'level1-form' }
      ]
    },
    {
      id: 2,
      name: 'Level 2: React Hooks',
      description: 'Fix useEffect, useCallback, and custom hooks',
      challenges: [
        { name: 'useEffect Deps', component: Level2Challenges.BrokenUseEffect, flag: 'FLAG_2_EFFECT_5d8a2c7f', hintId: 'level2-effect' },
        { name: 'Infinite Loop', component: Level2Challenges.BrokenInfiniteLoop, flag: 'FLAG_2_LOOP_3f7b9e4a', hintId: 'level2-loop' },
        { name: 'Custom Hook', component: Level2Challenges.BrokenCustomHook, flag: 'FLAG_2_HOOK_8e2d5a3c', hintId: 'level2-custom' },
        { name: 'useCallback', component: Level2Challenges.BrokenUseCallback, flag: 'FLAG_2_CALLBACK_6a9c4f2e', hintId: 'level2-callback' },
        { name: 'Memory Leak', component: Level2Challenges.BrokenMemoryLeak, flag: 'FLAG_2_MEMORY_2c8f5d3a', hintId: 'level2-memory' },
        { name: 'useRef', component: Level2Challenges.BrokenUseRef, flag: 'FLAG_2_REF_9d4b7e2a', hintId: 'level2-ref' }
      ]
    },
    {
      id: 3,
      name: 'Level 3: State Management',
      description: 'Fix Context API, Reducers, and complex state',
      challenges: [
        { name: 'Context Provider', component: Level3Challenges.BrokenThemeConsumer, flag: 'FLAG_3_CONTEXT_7e4a9c2f', hintId: 'level3-context' },
        { name: 'Reducer Logic', component: Level3Challenges.BrokenReducer, flag: 'FLAG_3_REDUCER_3d8f2a6c', hintId: 'level3-reducer' },
        { name: 'State Batching', component: Level3Challenges.BrokenStateBatching, flag: 'FLAG_3_BATCH_6c2e9a4f', hintId: 'level3-batching' },
        { name: 'Nested State', component: Level3Challenges.BrokenNestedState, flag: 'FLAG_3_NESTED_4a7e2c9f', hintId: 'level3-nested' },
        { name: 'Context Perf', component: Level3Challenges.BrokenDataContainer, flag: 'FLAG_3_PERF_9e3c7a2d', hintId: 'level3-performance' }
      ]
    },
    {
      id: 4,
      name: 'Level 4: Performance',
      description: 'Optimize React performance issues',
      challenges: [
        { name: 'useMemo', component: Level4Challenges.BrokenUseMemo, flag: 'FLAG_4_MEMO_5c8e2a7f', hintId: 'level4-memo' },
        { name: 'React.memo', component: Level4Challenges.BrokenReactMemo, flag: 'FLAG_4_REACTMEMO_3d7a9c2f', hintId: 'level4-reactmemo' },
        { name: 'Large List', component: Level4Challenges.BrokenLargeList, flag: 'FLAG_4_LISTPERF_8e4a2c9f', hintId: 'level4-list' },
        { name: 'Event Optimization', component: Level4Challenges.BrokenEventOptimization, flag: 'FLAG_4_CALLBACK_6c3e9a2f', hintId: 'level4-callback' },
        { name: 'Code Splitting', component: Level4Challenges.BrokenCodeSplitting, flag: 'FLAG_4_LAZYLOAD_7d4b2e8a', hintId: 'level4-splitting' },
        { name: 'Debouncing', component: Level4Challenges.BrokenDebounce, flag: 'FLAG_4_DEBOUNCE_2e8c5a7f', hintId: 'level4-debounce' }
      ]
    },
    {
      id: 5,
      name: 'Level 5: Advanced Patterns',
      description: 'Master advanced React patterns',
      challenges: [
        { name: 'Compound Components', component: Level5Challenges.BrokenCompoundComponents, flag: 'FLAG_5_COMPOUND_8e3c7a2f', hintId: 'level5-compound' },
        { name: 'Render Props', component: Level5Challenges.BrokenRenderPropsDemo, flag: 'FLAG_5_RENDERPROPS_4c9e2a7f', hintId: 'level5-render' },
        { name: 'HOC', component: Level5Challenges.BrokenHOC, flag: 'FLAG_5_HOC_6d3e9a2c', hintId: 'level5-hoc' },
        { name: 'Portal', component: Level5Challenges.BrokenPortalDemo, flag: 'FLAG_5_PORTAL_7e4a2c9f', hintId: 'level5-portal' },
        { name: 'Error Boundary', component: Level5Challenges.BrokenErrorBoundaryDemo, flag: 'FLAG_5_ERRORBOUNDARY_3d8c5a2f', hintId: 'level5-boundary' },
        { name: 'Hooks Composition', component: Level5Challenges.BrokenHooksComposition, flag: 'FLAG_5_HOOKCOMP_9e2c7a4f', hintId: 'level5-composition' }
      ]
    }
  ];

  const handleHintUsed = () => {
    setHintsUsed(hintsUsed + 1);
  };

  const handleFlagSubmit = (flag) => {
    if (!submittedFlags.includes(flag)) {
      setSubmittedFlags([...submittedFlags, flag]);
    }
  };

  const handleLevelSelect = (levelIndex) => {
    setCurrentLevel(levelIndex);
    setShowDashboard(false);
  };

  const handleResetProgress = () => {
    if (window.confirm('Are you sure you want to reset all progress? This will clear all submitted flags and hint usage.')) {
      setSubmittedFlags([]);
      setHintsUsed(0);
      localStorage.removeItem(STORAGE_KEYS.SUBMITTED_FLAGS);
      localStorage.removeItem(STORAGE_KEYS.HINTS_USED);
    }
  };

  const totalChallenges = levels.reduce((sum, level) => sum + level.challenges.length, 0);
  const completedChallenges = submittedFlags.length;

  if (showDashboard) {
    return (
      <div className="App">
        <header className="App-header">
          <h1>🚀 React Developer Challenge</h1>
          <p className="tagline">Test Your React Skills - Find the Bugs, Capture the Flags!</p>
          
        </header>

        <Progress 
          completed={completedChallenges}
          total={totalChallenges}
          submittedFlags={submittedFlags}
        />

        <Statistics 
          totalChallenges={totalChallenges}
          completedChallenges={completedChallenges}
          hintsUsed={hintsUsed}
          totalHints={getTotalHints()}
          onResetProgress={handleResetProgress}
        />

        <div className="dashboard">
          <h2>Choose Your Level</h2>
          <div className="levels-grid">
            {levels.map((level, index) => (
              <div 
                key={level.id} 
                className="level-card"
                onClick={() => handleLevelSelect(index)}
              >
                <h3>{level.name}</h3>
                <p>{level.description}</p>
                <div className="level-stats">
                  <span className="challenge-count">
                    {level.challenges.length} Challenges
                  </span>
                  <span className="completion">
                    {level.challenges.filter(c => submittedFlags.includes(c.flag)).length}/
                    {level.challenges.length} Completed
                  </span>
                </div>
              </div>
            ))}
          </div>

          <FlagSubmission 
            onFlagSubmit={handleFlagSubmit}
            submittedFlags={submittedFlags}
          />
        </div>

        <footer className="App-footer">
          <p>💡 Tip: Open the browser console to see debug information</p>
          <p>⏱️ Target Time: 45 minutes</p>
          <div className="author-info">
            <p>Created by <a href="https://github.com/mirzaaghazadeh" target="_blank" rel="noopener noreferrer"><strong>Navid Mirzaaghazadeh</strong></a></p>
          </div>
        </footer>
      </div>
    );
  }

  const currentLevelData = levels[currentLevel];

  return (
    <div className="App">
      <header className="App-header">
        <button 
          className="back-button"
          onClick={() => setShowDashboard(true)}
        >
          ← Back to Dashboard
        </button>
        <h1>{currentLevelData.name}</h1>
        <p>{currentLevelData.description}</p>
      </header>

      <Progress 
        completed={completedChallenges}
        total={totalChallenges}
        submittedFlags={submittedFlags}
      />

      <Statistics 
        totalChallenges={totalChallenges}
        completedChallenges={completedChallenges}
        hintsUsed={hintsUsed}
        totalHints={getTotalHints()}
        onResetProgress={handleResetProgress}
      />

      <div className="challenges-container">
        {currentLevelData.challenges.map((challenge, index) => {
          const isCompleted = submittedFlags.includes(challenge.flag);
          const hints = challengeHints[challenge.hintId] || [];
          
          return (
            <ChallengeLayout
              key={index}
              title={challenge.name}
              isCompleted={isCompleted}
              flag={challenge.flag}
            >
              <challenge.component />
              {hints.length > 0 && !isCompleted && (
                <HintSystem 
                  hints={hints}
                  challengeId={challenge.hintId}
                  onHintUsed={handleHintUsed}
                />
              )}
            </ChallengeLayout>
          );
        })}
      </div>

      <FlagSubmission 
        onFlagSubmit={handleFlagSubmit}
        submittedFlags={submittedFlags}
      />

      <div className="navigation-buttons">
        {currentLevel > 0 && (
          <button onClick={() => setCurrentLevel(currentLevel - 1)}>
            ← Previous Level
          </button>
        )}
        {currentLevel < levels.length - 1 && (
          <button onClick={() => setCurrentLevel(currentLevel + 1)}>
            Next Level →
          </button>
        )}
      </div>

      <footer className="App-footer">
        <div className="author-info">
          <p>Created by <a href="https://github.com/mirzaaghazadeh" target="_blank" rel="noopener noreferrer"><strong>Navid Mirzaaghazadeh</strong></a></p>
        </div>
      </footer>
    </div>
  );
}

export default App;

