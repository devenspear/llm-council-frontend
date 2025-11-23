import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
}

export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    // Check localStorage for existing session
    const session = localStorage.getItem('llm_council_auth');
    if (session) {
      try {
        const { authenticated, timestamp } = JSON.parse(session);
        // Session expires after 24 hours
        const isValid = authenticated && (Date.now() - timestamp < 24 * 60 * 60 * 1000);
        return isValid;
      } catch {
        return false;
      }
    }
    return false;
  });

  const login = (password) => {
    // Simple password check (client-side only for basic protection)
    // In production, you'd want server-side authentication
    const correctPassword = 'ADMINp@ss2025';

    if (password === correctPassword) {
      const session = {
        authenticated: true,
        timestamp: Date.now(),
      };
      localStorage.setItem('llm_council_auth', JSON.stringify(session));
      setIsAuthenticated(true);
      return true;
    }
    return false;
  };

  const logout = () => {
    localStorage.removeItem('llm_council_auth');
    setIsAuthenticated(false);
  };

  // Auto-logout after 24 hours
  useEffect(() => {
    if (isAuthenticated) {
      const checkSession = () => {
        const session = localStorage.getItem('llm_council_auth');
        if (session) {
          try {
            const { timestamp } = JSON.parse(session);
            if (Date.now() - timestamp >= 24 * 60 * 60 * 1000) {
              logout();
            }
          } catch {
            logout();
          }
        }
      };

      // Check every 5 minutes
      const interval = setInterval(checkSession, 5 * 60 * 1000);
      return () => clearInterval(interval);
    }
  }, [isAuthenticated]);

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
