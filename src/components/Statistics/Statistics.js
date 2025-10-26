import React from 'react';
import './Statistics.css';

/**
 * Statistics Component
 * Displays overall challenge and hint statistics
 */
function Statistics({ totalChallenges, completedChallenges, hintsUsed, totalHints, onResetProgress }) {
  const completionPercentage = Math.round((completedChallenges / totalChallenges) * 100);
  const hintUsagePercentage = totalHints > 0 ? Math.round((hintsUsed / totalHints) * 100) : 0;

  const getPerformanceLevel = () => {
    if (completedChallenges === totalChallenges && hintsUsed === 0) {
      return { 
        level: 'Expert Senior', 
        rank: 'Level 7', 
        color: '#4caf50', 
        colorSecondary: '#81c784',
        icon: '🏆' 
      };
    } else if (completedChallenges === totalChallenges && hintsUsed < totalHints * 0.3) {
      return { 
        level: 'Senior', 
        rank: 'Level 6', 
        color: '#2196f3', 
        colorSecondary: '#64b5f6',
        icon: '⭐' 
      };
    } else if (completionPercentage >= 80) {
      return { 
        level: 'Mid-Senior', 
        rank: 'Level 5', 
        color: '#00bcd4', 
        colorSecondary: '#4dd0e1',
        icon: '✨' 
      };
    } else if (completionPercentage >= 60) {
      return { 
        level: 'Mid-Level', 
        rank: 'Level 4', 
        color: '#ff9800', 
        colorSecondary: '#ffb74d',
        icon: '📚' 
      };
    } else if (completionPercentage >= 40) {
      return { 
        level: 'Junior+', 
        rank: 'Level 3', 
        color: '#9c27b0', 
        colorSecondary: '#ba68c8',
        icon: '🚀' 
      };
    } else if (completionPercentage >= 20) {
      return { 
        level: 'Junior', 
        rank: 'Level 2', 
        color: '#ff5722', 
        colorSecondary: '#ff8a65',
        icon: '🌟' 
      };
    } else {
      return { 
        level: 'Beginner', 
        rank: 'Level 1', 
        color: '#607d8b', 
        colorSecondary: '#90a4ae',
        icon: '🌱' 
      };
    }
  };

  const performance = getPerformanceLevel();

  return (
    <div className="statistics-container">
      <div className="statistics-header">
        <h3>📊 Overall Statistics</h3>
      </div>

      <div className="statistics-grid">
        <div className="stat-card">
          <div className="stat-icon">✅</div>
          <div className="stat-content">
            <div className="stat-label">Completed Challenges</div>
            <div className="stat-value">
              {completedChallenges} / {totalChallenges}
              <span className="stat-percentage">({completionPercentage}%)</span>
            </div>
            <div className="stat-progress">
              <div 
                className="stat-progress-fill" 
                style={{ width: `${completionPercentage}%`, background: performance.color }}
              ></div>
            </div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">💡</div>
          <div className="stat-content">
            <div className="stat-label">Hints Used</div>
            <div className="stat-value">
              {hintsUsed}
              {totalHints > 0 && (
                <span className="stat-percentage">({hintUsagePercentage}%)</span>
              )}
            </div>
            <div className="hint-impact">
              {hintsUsed === 0 && completedChallenges > 0 && (
                <span className="impact-good">🎯 No hints used - Excellent!</span>
              )}
              {hintsUsed > 0 && hintsUsed < 10 && (
                <span className="impact-ok">👍 Minimal hint usage</span>
              )}
              {hintsUsed >= 10 && hintsUsed < 30 && (
                <span className="impact-moderate">📖 Moderate hint usage</span>
              )}
              {hintsUsed >= 30 && (
                <span className="impact-high">💪 Keep practicing!</span>
              )}
            </div>
          </div>
        </div>

        <div 
          className="stat-card performance-card"
          style={{
            background: `linear-gradient(135deg, ${performance.color} 0%, ${performance.colorSecondary} 100%)`
          }}
        >
          <div className="stat-icon">{performance.icon}</div>
          <div className="stat-content">
            <div className="stat-label">Developer Level</div>
            <div className="stat-value performance-level">
              {performance.level}
            </div>
            <div className="performance-description">
              <strong>{performance.rank}</strong> • {completedChallenges === totalChallenges 
                ? '🎉 All challenges completed!' 
                : `${totalChallenges - completedChallenges} challenges remaining`
              }
            </div>
          </div>
        </div>
      </div>

      <div className="statistics-footer">
        <div className="scoring-info">
          <strong>Scoring Tips:</strong>
          <ul>
            <li>Complete challenges without hints for best performance</li>
            <li>Each hint used is tracked in your overall statistics</li>
            <li>Target: Complete all 27 challenges in 45 minutes</li>
            <li>💾 Your progress is automatically saved and persists across page refreshes</li>
          </ul>
        </div>
        {(completedChallenges > 0 || hintsUsed > 0) && onResetProgress && (
          <div className="reset-progress">
            <button 
              className="reset-button"
              onClick={onResetProgress}
            >
              🔄 Reset All Progress
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Statistics;

