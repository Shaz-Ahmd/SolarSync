import React from 'react';

const EmptyState = ({
  message,
  actionText,
  onAction
}) => {
  return (
    <div className="empty-state">
      <div className="empty-icon">
        📭
      </div>

      <p>
        {message || 'No records found in the system.'}
      </p>

      {onAction && (
        <button
          className="btn-primary"
          onClick={onAction}
        >
          {actionText || 'Add New'}
        </button>
      )}
    </div>
  );
};

export default EmptyState;