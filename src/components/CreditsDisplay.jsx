import { useState, useEffect } from 'react';
import { api } from '../api';
import './CreditsDisplay.css';

export default function CreditsDisplay() {
  const [credits, setCredits] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchCredits = async () => {
    try {
      setError(null);
      const data = await api.getCredits();
      setCredits(data);
      setLoading(false);
    } catch (err) {
      console.error('Failed to fetch credits:', err);
      setError(err.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    // Fetch immediately
    fetchCredits();

    // Refresh every 30 seconds
    const interval = setInterval(fetchCredits, 30000);

    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <div className="credits-display">
        <div className="credits-loading">
          <div className="credits-spinner"></div>
          <span>Loading...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="credits-display">
        <div className="credits-error">
          <span className="credits-icon">⚠️</span>
          <span className="credits-error-text">Credits unavailable</span>
        </div>
      </div>
    );
  }

  // Extract usage and limit from the data
  const usage = credits?.usage || 0;
  const limit = credits?.limit;
  const label = credits?.label || 'API Key';

  // Calculate percentage if limit exists
  const percentage = limit ? (usage / limit) * 100 : null;
  const remaining = limit ? limit - usage : null;

  return (
    <div className="credits-display">
      <div className="credits-header">
        <span className="credits-icon">💳</span>
        <span className="credits-title">OpenRouter</span>
      </div>

      <div className="credits-info">
        <div className="credits-row">
          <span className="credits-label">Used:</span>
          <span className="credits-value">${usage.toFixed(2)}</span>
        </div>

        {limit && (
          <>
            <div className="credits-row">
              <span className="credits-label">Limit:</span>
              <span className="credits-value">${limit.toFixed(2)}</span>
            </div>

            <div className="credits-row">
              <span className="credits-label">Remaining:</span>
              <span className="credits-value credits-remaining">
                ${remaining.toFixed(2)}
              </span>
            </div>

            {percentage !== null && (
              <div className="credits-progress-container">
                <div className="credits-progress-bar">
                  <div
                    className="credits-progress-fill"
                    style={{
                      width: `${Math.min(percentage, 100)}%`,
                      backgroundColor: percentage > 90 ? '#e63946' : percentage > 70 ? '#f77f00' : '#4a90e2'
                    }}
                  ></div>
                </div>
                <span className="credits-percentage">{percentage.toFixed(1)}% used</span>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
