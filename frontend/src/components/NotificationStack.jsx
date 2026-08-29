import React from "react";

const NotificationStack = ({
  notifications = [],
}) => {
  if (!Array.isArray(notifications)) {
    return null;
  }

  return (
    <div className="notification-stack">

      {notifications.map((note, index) => (
        <div
          key={note.id || index}
          className={`notification-item-${
            note.type || "info"
          }`}
        >
          {note.message}
        </div>
      ))}

    </div>
  );
};

export default NotificationStack;