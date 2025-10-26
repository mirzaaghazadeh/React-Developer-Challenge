import React from 'react';
import './ChallengeLayout.css';

function ChallengeLayout({ title, children, isCompleted, flag }) {
  return (
    <div className="challenge-wrapper">
      <div className="challenge-header">
        <h2 className="challenge-title">{title}</h2>
        <div className="challenge-status">
          <span className={`status-badge ${isCompleted ? 'completed' : 'pending'}`}>
            {isCompleted ? '✓ Completed' : '⏳ Pending'}
          </span>
          {isCompleted && (
            <span className="flag-display" title={flag}>
              🚩 {flag}
            </span>
          )}
        </div>
      </div>
      <div className="challenge-content">
        {children}
      </div>
    </div>
  );
}

export default ChallengeLayout;

