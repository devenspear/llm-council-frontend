import { useState, useEffect, useRef } from 'react';
import ReactMarkdown from 'react-markdown';
import Stage1 from './Stage1';
import Stage2 from './Stage2';
import Stage3 from './Stage3';
import './ChatInterface.css';

export default function ChatInterface({
  conversation,
  onSendMessage,
  isLoading,
}) {
  const [input, setInput] = useState('');
  const [textareaHeight, setTextareaHeight] = useState(120);
  const [isResizing, setIsResizing] = useState(false);
  const messagesEndRef = useRef(null);
  const textareaRef = useRef(null);

  // Optimized scroll - only scroll when new messages arrive, not on every render
  const prevMessageCount = useRef(0);

  useEffect(() => {
    if (conversation?.messages && conversation.messages.length > prevMessageCount.current) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
      prevMessageCount.current = conversation.messages.length;
    }
  }, [conversation?.messages]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim() && !isLoading) {
      onSendMessage(input);
      setInput('');
    }
  };

  const handleKeyDown = (e) => {
    // Submit on Enter (without Shift)
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  const handleMouseDown = (e) => {
    setIsResizing(true);
    e.preventDefault();
  };

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!isResizing) return;

      const newHeight = window.innerHeight - e.clientY - 24;
      if (newHeight >= 90 && newHeight <= 600) {
        setTextareaHeight(newHeight);
      }
    };

    const handleMouseUp = () => {
      setIsResizing(false);
    };

    if (isResizing) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isResizing]);

  if (!conversation) {
    return (
      <div className="chat-interface">
        <div className="empty-state">
          <h2>Welcome to LLM Council</h2>
          <p>Create a new conversation to get started</p>
        </div>
      </div>
    );
  }

  return (
    <div className="chat-interface">
      <div className="messages-container">
        {conversation.messages.length === 0 ? (
          <div className="empty-state">
            <h2>Start a conversation</h2>
            <p>Ask a question to consult the LLM Council</p>
          </div>
        ) : (
          conversation.messages.map((msg, index) => (
            <div key={index} className="message-group">
              {msg.role === 'user' ? (
                <div className="user-message">
                  <div className="message-label">You</div>
                  <div className="message-content">
                    <div className="markdown-content">
                      <ReactMarkdown>{msg.content}</ReactMarkdown>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="assistant-message">
                  <div className="message-label">LLM Council</div>

                  {/* Stage 1 */}
                  {msg.loading?.stage1 && !msg.stage1 && (
                    <div className="stage-loading">
                      <div className="spinner"></div>
                      <span>Running Stage 1: Collecting individual responses...</span>
                    </div>
                  )}
                  {msg.stage1 && (
                    <>
                      <div className="stage-complete">
                        <span className="checkmark">✓</span>
                        <span>Stage 1: Individual Responses Complete</span>
                      </div>
                      <Stage1 responses={msg.stage1} />
                    </>
                  )}

                  {/* Stage 2 */}
                  {msg.loading?.stage2 && !msg.stage2 && (
                    <div className="stage-loading">
                      <div className="spinner"></div>
                      <span>Running Stage 2: Peer rankings...</span>
                    </div>
                  )}
                  {msg.stage2 && (
                    <>
                      <div className="stage-complete">
                        <span className="checkmark">✓</span>
                        <span>Stage 2: Peer Rankings Complete</span>
                      </div>
                      <Stage2
                        rankings={msg.stage2}
                        labelToModel={msg.metadata?.label_to_model}
                        aggregateRankings={msg.metadata?.aggregate_rankings}
                      />
                    </>
                  )}

                  {/* Stage 3 */}
                  {msg.loading?.stage3 && !msg.stage3 && (
                    <div className="stage-loading">
                      <div className="spinner"></div>
                      <span>Running Stage 3: Final synthesis...</span>
                    </div>
                  )}
                  {msg.stage3 && (
                    <>
                      <div className="stage-complete">
                        <span className="checkmark">✓</span>
                        <span>Stage 3: Final Answer</span>
                      </div>
                      <Stage3 finalResponse={msg.stage3} />
                    </>
                  )}
                </div>
              )}
            </div>
          ))
        )}

        {isLoading && (
          <div className="loading-indicator">
            <div className="spinner"></div>
            <span>Consulting the council...</span>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      <div className="input-container">
        <div
          className={`resize-handle ${isResizing ? 'resizing' : ''}`}
          onMouseDown={handleMouseDown}
          title="Drag to resize"
        >
          <div className="resize-indicator">
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
        <form className="input-form" onSubmit={handleSubmit}>
          <div className="input-wrapper">
            <textarea
              ref={textareaRef}
              className="message-input"
              placeholder="Ask your question..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              disabled={isLoading}
              style={{ height: `${textareaHeight}px` }}
            />
            <div className="input-footer">
              <div className="input-hints">
                <span className="hint-item">
                  <kbd>⏎</kbd> Send
                </span>
                <span className="hint-item">
                  <kbd>⇧</kbd> + <kbd>⏎</kbd> New line
                </span>
                <span className="char-count">
                  {input.length} characters
                </span>
              </div>
              <button
                type="submit"
                className="send-button"
                disabled={!input.trim() || isLoading}
              >
                {isLoading ? (
                  <>
                    <div className="button-spinner"></div>
                    <span>Sending...</span>
                  </>
                ) : (
                  <>
                    <span>Send</span>
                    <span className="send-icon">→</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
