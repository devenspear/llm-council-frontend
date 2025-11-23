import { useState, useEffect } from 'react';
import { useDarkMode } from '../DarkModeContext';
import { useAuth } from '../AuthContext';
import CreditsDisplay from './CreditsDisplay';
import './Sidebar.css';

export default function Sidebar({
  conversations,
  currentConversationId,
  onSelectConversation,
  onNewConversation,
}) {
  const { isDarkMode, toggleDarkMode } = useDarkMode();
  const { logout } = useAuth();

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <h1 className="sidebar-brand">Deven's LLM Council</h1>
        <button className="new-conversation-btn" onClick={onNewConversation}>
          + New Conversation
        </button>
      </div>

      <div className="conversation-list">
        {conversations.length === 0 ? (
          <div className="no-conversations">No conversations yet</div>
        ) : (
          conversations.map((conv) => (
            <div
              key={conv.id}
              className={`conversation-item ${
                conv.id === currentConversationId ? 'active' : ''
              }`}
              onClick={() => onSelectConversation(conv.id)}
            >
              <div className="conversation-title">
                {conv.title || 'New Conversation'}
              </div>
              <div className="conversation-meta">
                {conv.message_count} messages
              </div>
            </div>
          ))
        )}
      </div>

      <div className="sidebar-footer">
        <CreditsDisplay />

        <div className="sidebar-footer-actions">
          <button
            className="dark-mode-toggle"
            onClick={toggleDarkMode}
            aria-label="Toggle dark mode"
            title={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {isDarkMode ? '☀️' : '🌙'}
          </button>

          <button
            className="logout-btn"
            onClick={logout}
            title="Logout"
          >
            🚪 Logout
          </button>
        </div>
      </div>
    </div>
  );
}
