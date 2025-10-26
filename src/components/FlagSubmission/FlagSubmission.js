import React, { useState } from 'react';
import './FlagSubmission.css';
import { validateFlag } from '../../utils/flagService';

function FlagSubmission({ onFlagSubmit, submittedFlags }) {
  const [flagInput, setFlagInput] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const trimmedFlag = flagInput.trim();
    
    if (!trimmedFlag) {
      setMessage('❌ Please enter a flag');
      return;
    }

    if (submittedFlags.includes(trimmedFlag)) {
      setMessage('⚠️ Flag already submitted!');
      return;
    }

    const isValid = validateFlag(trimmedFlag);
    
    if (isValid) {
      onFlagSubmit(trimmedFlag);
      setMessage('🎉 Valid flag! Keep going!');
      setFlagInput('');
      
      setTimeout(() => setMessage(''), 3000);
    } else {
      setMessage('❌ Invalid flag. Keep looking!');
    }
  };

  return (
    <div className="flag-submission">
      <h3>🚩 Submit Your Flag</h3>
      <form onSubmit={handleSubmit}>
        <div className="flag-input-container">
          <input
            type="text"
            className="flag-input"
            placeholder="FLAG_X_CHALLENGENAME_XXXXXXXX"
            value={flagInput}
            onChange={(e) => setFlagInput(e.target.value)}
          />
          <button type="submit" className="submit-button">
            Submit Flag
          </button>
        </div>
      </form>
      
      {message && (
        <div className={`message ${message.includes('🎉') ? 'success' : 'error'}`}>
          {message}
        </div>
      )}

      {submittedFlags.length > 0 && (
        <div className="submitted-flags">
          <h4>✅ Submitted Flags ({submittedFlags.length})</h4>
          <div className="flags-list">
            {submittedFlags.map((flag, index) => (
              <span key={index} className="flag-badge">
                {flag}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default FlagSubmission;

