import React from 'react';

const NotificationStack = ({ notifications = [] }) => {
  return (
    <div className="notification-stack">
      {notifications.map((note, index) => (
        <div
          key={index}
          className={`notification-item-${note.type}`}
        >
          {note.message}
        </div>
      ))}
    </div>
  );
};

export default NotificationStack;