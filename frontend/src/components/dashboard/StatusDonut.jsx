import React from "react";

const StatusDonut = ({ data = [] }) => {
  const safeData = Array.isArray(data)
    ? data
        .map((item) => ({
          ...item,
          value: Number(item?.value) || 0,
        }))
        .filter((item) => item.value > 0)
    : [];

  const total = safeData.reduce(
    (sum, item) => sum + item.value,
    0
  );

  if (total === 0) {
    return (
      <div className="status-donut">
        <h3>Ticket Status</h3>

        <div className="no-ticket-data">
          No Ticket Data
        </div>
      </div>
    );
  }

  /*
   * Special case:
   * If only one ticket status has a value,
   * draw a complete circle instead of an SVG arc.
   */
  if (safeData.length === 1) {
    const item = safeData[0];

    return (
      <div className="status-donut">

        <h3>Ticket Status</h3>

        <div className="donut-container">

          <svg
            viewBox="0 0 100 100"
            width="200"
            height="200"
            className="donut-chart"
          >
            <circle
              cx="50"
              cy="50"
              r="40"
              fill="none"
              stroke={item.color || "#999"}
              strokeWidth="14"
            />
          </svg>

          <div className="donut-total">

            <strong>
              {total}
            </strong>

            <span>
              Total Tickets
            </span>

          </div>

        </div>

        <div className="donut-legend">

          <div className="donut-legend-item">

            <span
              className="legend-color"
              style={{
                backgroundColor:
                  item.color || "#999",
              }}
            />

            <span className="legend-label">
              {item.label}
            </span>

            <span className="legend-value">
              {item.value}
            </span>

          </div>

        </div>

      </div>
    );
  }

  /*
   * Normal case:
   * Multiple ticket statuses exist.
   */
  let currentAngle = -Math.PI / 2;

  const arcs = safeData.map((item) => {
    const angle =
      (item.value / total) *
      Math.PI *
      2;

    const startAngle = currentAngle;

    const endAngle =
      currentAngle + angle;

    const x1 =
      Math.cos(startAngle);

    const y1 =
      Math.sin(startAngle);

    const x2 =
      Math.cos(endAngle);

    const y2 =
      Math.sin(endAngle);

    const largeArcFlag =
      angle > Math.PI ? 1 : 0;

    const path = `
      M ${x1} ${y1}
      A 1 1 0 ${largeArcFlag} 1 ${x2} ${y2}
    `;

    currentAngle = endAngle;

    return {
      ...item,
      path,
    };
  });

  return (
    <div className="status-donut">

      <h3>Ticket Status</h3>

      <div className="donut-container">

        <svg
          viewBox="-1 -1 2 2"
          width="200"
          height="200"
          className="donut-chart"
        >

          {arcs.map((arc, index) => (
            <path
              key={index}
              d={arc.path}
              fill="none"
              stroke={
                arc.color || "#999"
              }
              strokeWidth="0.25"
              strokeLinecap="butt"
            />
          ))}

        </svg>

        <div className="donut-total">

          <strong>
            {total}
          </strong>

          <span>
            Total Tickets
          </span>

        </div>

      </div>

      <div className="donut-legend">

        {safeData.map((item, index) => (
          <div
            key={index}
            className="donut-legend-item"
          >

            <span
              className="legend-color"
              style={{
                backgroundColor:
                  item.color || "#999",
              }}
            />

            <span className="legend-label">
              {item.label}
            </span>

            <span className="legend-value">
              {item.value}
            </span>

          </div>
        ))}

      </div>

    </div>
  );
};

export default StatusDonut;