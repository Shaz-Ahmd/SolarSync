import React from 'react';

const RecentActivity = ({ metrics }) => {
  return (
    <div>
      <h3>Recent Activity</h3>

      {metrics.map((metric, index) => (
        <div className="activity-item" key={index}>
          <div>
            {new Date(metric.timestamp).toLocaleTimeString()}
          </div>

          <div>
            Panel #{metric.panel.id}
          </div>

          <div>
            ⚡ {metric.generationKwh.toFixed(2)} KWh
          </div>

          <div>
            🔌 {metric.gridConsumptionKwh.toFixed(2)} KWh
          </div>
        </div>
      ))}
    </div>
  );
};

export default RecentActivity;