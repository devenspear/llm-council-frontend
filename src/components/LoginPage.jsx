import { useState } from 'react';
import { useAuth } from '../AuthContext';
import { useDarkMode } from '../DarkModeContext';
import './LoginPage.css';

export default function LoginPage() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const { isDarkMode, toggleDarkMode } = useDarkMode();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    // Small delay for UX (makes it feel more secure)
    await new Promise((resolve) => setTimeout(resolve, 500));

    const success = login(password);

    if (!success) {
      setError('Incorrect password. Please try again.');
      setPassword('');
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSubmit(e);
    }
  };

  return (
    <div className="login-page">
      <button
        className="login-dark-mode-toggle"
        onClick={toggleDarkMode}
        aria-label="Toggle dark mode"
        title={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
      >
        {isDarkMode ? '☀️' : '🌙'}
      </button>

      <div className="login-container">
        <div className="login-header">
          <h1>Deven's LLM Council</h1>
          <p className="login-subtitle">Multi-Model AI Deliberation System</p>
        </div>

        <form className="login-form" onSubmit={handleSubmit}>
          <div className="login-input-group">
            <label htmlFor="password">Access Password</label>
            <input
              id="password"
              type="password"
              className="login-input"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={handleKeyDown}
              disabled={isLoading}
              autoFocus
            />
            {error && <div className="login-error">{error}</div>}
          </div>

          <button
            type="submit"
            className="login-button"
            disabled={!password.trim() || isLoading}
          >
            {isLoading ? (
              <>
                <div className="login-spinner"></div>
                <span>Authenticating...</span>
              </>
            ) : (
              <>
                <span>Enter</span>
                <span className="login-arrow">→</span>
              </>
            )}
          </button>
        </form>

        <div className="login-footer">
          <p>This is a private system. Unauthorized access is prohibited.</p>
        </div>
      </div>
    </div>
  );
}
