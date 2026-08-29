import React from "react";

const RecentActivity = ({
  metrics = [],
}) => {
  const safeMetrics = Array.isArray(metrics)
    ? metrics
    : [];

  return (
    <div>

      <h3>Recent Activity</h3>

      {safeMetrics.length === 0 ? (
        <div className="empty-state">
          No recent activity.
        </div>
      ) : (
        safeMetrics.map((metric, index) => {

          const timestamp =
            metric?.timestamp
              ? new Date(
                  metric.timestamp
                ).toLocaleTimeString()
              : "N/A";

          const panelId =
            metric?.panel?.id ??
            metric?.panelId ??
            "N/A";

          const generation =
            Number(
              metric?.generationKwh
            ) || 0;

          const gridConsumption =
            Number(
              metric?.gridConsumptionKwh
            ) || 0;

          return (
            <div
              className="activity-item"
              key={
                metric?.id || index
              }
            >

              <div>
                {timestamp}
              </div>

              <div>
                Panel #{panelId}
              </div>

              <div>
                ⚡{" "}
                {generation.toFixed(2)}
                {" "}KWh
              </div>

              <div>
                🔌{" "}
                {gridConsumption.toFixed(2)}
                {" "}KWh
              </div>

            </div>
          );
        })
      )}

    </div>
  );
};

export default RecentActivity;