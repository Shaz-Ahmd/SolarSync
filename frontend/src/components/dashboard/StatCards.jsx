import React from "react";

const StatCards = ({ stats = {} }) => {
  const dailyGeneration =
    Number(stats?.dailyGeneration ?? stats?.dailyGenerationKwh ?? 0);

  const gridConsumption =
    Number(stats?.gridConsumption ?? stats?.gridConsumptionKwh ?? 0);

  const systemEfficiency =
    Number(stats?.systemEfficiency ?? stats?.efficiency ?? 0);

  const activePanels =
    Number(stats?.activePanels ?? 0);

  const openTickets =
    Number(stats?.openTickets ?? 0);

  return (
    <div className="stat-cards">

      <div className="stat-card">
        <div className="stat-title">
          Daily Generation (KWh)
        </div>

        <div className="stat-value">
          {dailyGeneration.toFixed(2)}
        </div>
      </div>


      <div className="stat-card">
        <div className="stat-title">
          Grid Consumption (KWh)
        </div>

        <div className="stat-value">
          {gridConsumption.toFixed(2)}
        </div>
      </div>


      <div className="stat-card">
        <div className="stat-title">
          System Efficiency
        </div>

        <div className="stat-value">
          {systemEfficiency.toFixed(1)}%
        </div>
      </div>


      <div className="stat-card">
        <div className="stat-title">
          Active Panels
        </div>

        <div className="stat-value">
          {activePanels}
        </div>
      </div>


      <div className="stat-card">
        <div className="stat-title">
          Open Tickets
        </div>

        <div className="stat-value">
          {openTickets}
        </div>
      </div>

    </div>
  );
};

export default StatCards;