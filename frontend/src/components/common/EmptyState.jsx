import React from "react";

const EmptyState = ({
  message = "No records found in the system.",
  actionText = "Add New",
  onAction,
}) => {
  return (
    <div className="empty-state">

      <div className="empty-icon">
        📭
      </div>

      <p>{message}</p>

      {onAction && (
        <button
          className="btn-primary"
          onClick={onAction}
        >
          {actionText}
        </button>
      )}

    </div>
  );
};

export default EmptyState;