import React from "react";

const CapacityBar = ({
  current = 0,
  total = 0,
}) => {
  const safeCurrent = Number(current) || 0;
  const safeTotal = Number(total) || 0;

  const percentage =
    safeTotal > 0
      ? Math.min(
          (safeCurrent / safeTotal) * 100,
          100
        )
      : 0;

  const color =
    percentage > 90
      ? "#ef4444"
      : percentage > 70
      ? "#f59e0b"
      : "#22c55e";

  return (
    <div className="capacity-container">

      <div>
        <span>
          {safeCurrent.toFixed(1)} /{" "}
          {safeTotal.toFixed(1)} KW
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
            backgroundColor: color,
          }}
        />
      </div>

    </div>
  );
};

export default CapacityBar;