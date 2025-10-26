import React from 'react';
import './Progress.css';

function Progress({ completed, total, submittedFlags }) {
  const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;

  return (
    <div className="progress-container">
      <div className="progress-header">
        <h3>Your Progress</h3>
        <span className="progress-stats">
          {completed} / {total} Challenges Completed
        </span>
      </div>
      <div className="progress-bar">
        <div 
          className="progress-fill" 
          style={{ width: `${percentage}%` }}
        >
          {percentage > 10 && `${percentage}%`}
        </div>
      </div>
      {percentage === 100 && (
        <div className="completion-message">
          🎉 Congratulations! You've completed all challenges! 🎉
        </div>
      )}
    </div>
  );
}

export default Progress;

