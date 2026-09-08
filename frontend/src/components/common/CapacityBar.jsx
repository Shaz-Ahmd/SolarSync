import React from "react";

const CapacityBar = ({
  current = 0,
  capacity = 0,
  total = 0,
}) => {
  const safeCapacity = Number(capacity || total) || 0;
  const safeCurrent = Number(current) || 0;

  const percentage =
    safeCapacity > 0
      ? Math.min(
          Math.max(
            (safeCurrent / safeCapacity) * 100,
            0
          ),
          100
        )
      : 0;

  return (
    <div className="capacity-wrapper">
      <div className="capacity-header">
        <span>
          {safeCurrent.toFixed(1)} /{" "}
          {safeCapacity.toFixed(1)} KW
        </span>

        <span>
          {percentage.toFixed(0)}%
        </span>
      </div>

      <div className="capacity-track">
        <div
          className="capacity-fill"
          style={{
            width: `${percentage}%`,
          }}
        />
      </div>
    </div>
  );
};

export default CapacityBar;