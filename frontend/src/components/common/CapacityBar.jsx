import React from 'react';

const CapacityBar = ({ current, total }) => {
  const percentage = Math.min(
    (current / total) * 100,
    100
  );

  const color =
    percentage > 90
      ? '#ef4444'
      : percentage > 70
      ? '#f59e0b'
      : '#22c55e';

  return (
    <div className="capacity-container">
      <div>
        <span>
          {current.toFixed(1)} / {total.toFixed(1)} KW
        </span>

        <span>
          {percentage.toFixed(0)}%
        </span>
      </div>

      <div
        className="capacity-fill"
        style={{
          width: `${percentage}%`,
          backgroundColor: color
        }}
      />
    </div>
  );
};

export default CapacityBar;