import { useState, useEffect } from 'react';
import { api } from '../api';
import './ModelSelector.css';

// Helper to get short model name
const getModelShortName = (modelId) => {
  const parts = modelId.split('/');
  const name = parts[parts.length - 1];

  // Map to friendlier names
  const nameMap = {
    'gpt-5.1': 'GPT-5.1',
    'gemini-3-pro-preview': 'Gemini 3',
    'claude-sonnet-4.5': 'Claude 4.5',
    'grok-4': 'Grok 4'
  };

  return nameMap[name] || name;
};

export default function ModelSelector({ selectedModels, onModelToggle }) {
  const [availableModels, setAvailableModels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    const fetchModels = async () => {
      try {
        const data = await api.getModels();
        setAvailableModels(data.council_models || []);
        setLoading(false);
      } catch (err) {
        console.error('Failed to fetch models:', err);
        setLoading(false);
      }
    };

    fetchModels();
  }, []);

  if (loading) {
    return (
      <div className="model-selector">
        <div className="model-selector-loading">...</div>
      </div>
    );
  }

  const selectedCount = selectedModels.length;
  const totalCount = availableModels.length;

  return (
    <div className="model-selector">
      <button
        className="model-selector-toggle"
        onClick={() => setIsExpanded(!isExpanded)}
        title="Select which models to use"
      >
        <span className="model-icon">🤖</span>
        <span className="model-count">{selectedCount}/{totalCount}</span>
      </button>

      {isExpanded && (
        <div className="model-selector-dropdown">
          <div className="model-selector-header">
            <span>Select Models</span>
            <button
              className="model-selector-close"
              onClick={() => setIsExpanded(false)}
            >
              ×
            </button>
          </div>

          <div className="model-selector-list">
            {availableModels.map((model) => {
              const isSelected = selectedModels.includes(model);

              return (
                <label
                  key={model}
                  className={`model-option ${isSelected ? 'selected' : ''}`}
                >
                  <input
                    type="checkbox"
                    checked={isSelected}
                    onChange={() => onModelToggle(model)}
                  />
                  <span className="model-checkbox">
                    {isSelected ? '✓' : ''}
                  </span>
                  <span className="model-name">{getModelShortName(model)}</span>
                </label>
              );
            })}
          </div>

          <div className="model-selector-footer">
            <button
              className="model-select-all"
              onClick={() => {
                availableModels.forEach(model => {
                  if (!selectedModels.includes(model)) {
                    onModelToggle(model);
                  }
                });
              }}
            >
              Select All
            </button>
            <button
              className="model-deselect-all"
              onClick={() => {
                selectedModels.forEach(model => onModelToggle(model));
              }}
            >
              Clear All
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
