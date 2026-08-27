import React from 'react';

const StatusDonut = ({ data }) => {
  const total = data.reduce((sum, item) => sum + item.value, 0);

  if (total === 0) {
    return <div>No Ticket Data</div>;
  }

  let currentAngle = -Math.PI / 2;

  const arcs = data.map((item) => {
    const angle = (item.value / total) * Math.PI * 2;

    const startAngle = currentAngle;
    const endAngle = currentAngle + angle;

    const x1 = Math.cos(startAngle);
    const y1 = Math.sin(startAngle);

    const x2 = Math.cos(endAngle);
    const y2 = Math.sin(endAngle);

    const largeArcFlag = angle > Math.PI ? 1 : 0;

    const path = `
      M ${x1} ${y1}
      A 1 1 0 ${largeArcFlag} 1 ${x2} ${y2}
    `;

    currentAngle = endAngle;

    return {
      ...item,
      path
    };
  });

  return (
    <div>
      <svg
        viewBox="-1 -1 2 2"
        width="200"
        height="200"
      >
        {arcs.map((arc, index) => (
          <path
            key={index}
            d={arc.path}
            fill="none"
            stroke={arc.color}
            strokeWidth="0.25"
          />
        ))}
      </svg>

      <div className="donut-legend">
        {data.map((item, index) => (
          <div key={index}>
            <span>{item.label}: {item.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StatusDonut;