import React, { useState } from 'react';
import './HintSystem.css';

/**
 * HintSystem Component
 * Provides progressive hints to users and tracks usage
 */
function HintSystem({ hints, challengeId, onHintUsed }) {
  const [revealedHints, setRevealedHints] = useState([]);
  const [allRevealed, setAllRevealed] = useState(false);

  const revealNextHint = () => {
    if (revealedHints.length < hints.length) {
      const nextIndex = revealedHints.length;
      setRevealedHints([...revealedHints, nextIndex]);
      
      // Track hint usage
      if (onHintUsed) {
        onHintUsed(challengeId);
      }

      if (nextIndex === hints.length - 1) {
        setAllRevealed(true);
      }
    }
  };

  return (
    <div className="hint-system">
      <div className="hint-header">
        <h4>💡 Hints Available ({revealedHints.length}/{hints.length} used)</h4>
        {!allRevealed && (
          <button 
            className="reveal-hint-btn"
            onClick={revealNextHint}
          >
            Show Next Hint
          </button>
        )}
      </div>
      
      {revealedHints.length > 0 && (
        <div className="hints-container">
          {revealedHints.map((hintIndex) => (
            <div key={hintIndex} className="hint-item">
              <span className="hint-number">Hint {hintIndex + 1}:</span>
              <span className="hint-text">{hints[hintIndex]}</span>
            </div>
          ))}
        </div>
      )}

      {revealedHints.length === 0 && (
        <p className="hint-description">
          Click "Show Next Hint" if you need help. Hints will be counted.
        </p>
      )}
    </div>
  );
}

export default HintSystem;

